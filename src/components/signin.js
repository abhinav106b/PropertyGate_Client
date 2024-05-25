import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostRequest } from '../global/post';
import axios from 'axios';
import { Button } from 'reactstrap';

function SignIn() {
    const navigate = useNavigate();

    const formSubmit = (data) => {
        console.log(data);
        PostRequest("users/login",data)
        .then((succ)=>{
            console.log(succ.data);
            localStorage.setItem('token',succ.data?.token);
            navigate('/',{replace:true});
        })
        .catch((err)=>{
            alert("Wrong email or password")
        })
    };

    const Schema = yup.object().shape({
        email: yup.string().email("Email invalid").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(Schema)
    });

    const cancelLogin =()=>{
        navigate('/',{replace:true})
    }


    return (
        <div className='bg-1'>
        <div className='App'>
            <h1>Login In</h1>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className='login-form'>
                <div>
                <label>Email</label>
                <input type='email' placeholder='email' {...register("email")} /><br />
                <p className='p-red' hidden={!errors?.email}>{errors?.email?.message}</p>
                </div>
                <div className='mt-3'>
                <label>Password</label>
                <input type='password' placeholder='Password' {...register("password")} /><br />
                <p className='p-red' hidden={!errors?.password}>{errors?.password?.message}</p>
                </div>
                </div>
                <div className='mt-3'>
                <Button className='rgs-btn' type='submit'>Login</Button> 
                <Button  className="ccl-btn" onClick={cancelLogin} type="button">Cancel</Button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default SignIn;
