import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostRequest } from '../global/post';
import {useNavigate} from 'react-router-dom'
import { Button } from 'reactstrap';




function Register(props) {
    const navigate = useNavigate();
    const formSubmit = (data) => {
        console.log(data);
        PostRequest("users/register",data)
        .then((rsp)=>{
            localStorage.setItem('token',rsp.data?.token);
            navigate('/',{replace:true})
        })
        .catch((err)=>{
            console.log("Error ",err);
            alert(err);
        })
    };
    const Schema = yup.object().shape({
        firstName: yup.string().matches(/^[A-Za-z]+$/, 'First name must contain only letters').required("First name is required"),
        lastName: yup.string().required("Lastname is required"),
        email: yup.string().email("Email invalid").required("Email is required"),
        phone: yup.string().matches(/^[0-9]+$/, 'Phone number must be only digits').min(10, 'Phone number must be at least 10 digits').required(),
        password: yup.string().min(6, "Password must be at least 6 characters").required(),
        confirmPass: yup.string().oneOf([yup.ref('password')], "Passwords don't match").required("Confirm password is required")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(Schema),
    });
    
    const cancelLogin=()=>{
        navigate("/",{replace:true})
    }

    return (
        <div className='bg-1'>
        <div className='App container '>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className='property-form'>
                <div>
                <label>First Name</label>
                <input type='text' placeholder='FirstName' {...register("firstName")} /><br />
                <p className='p-red' hidden={!errors?.firstName}>{errors?.firstName?.message}</p>

                <label>Last Name</label>
                <input type='text' placeholder='LastName' {...register("lastName")} /><br />
                <p className='p-red' hidden={!errors?.lastName}>{errors?.lastName?.message}</p>
                </div>

                <div>
                <label>Email</label>
                <input type='text' placeholder='Email' {...register("email")} /><br />
                <p className='p-red' hidden={!errors?.email}>{errors?.email?.message}</p>

                <label>Phone Number</label>
                <input type='text' placeholder='PhoneNumber' {...register("phone")} /><br />
                <p className='p-red' hidden={!errors?.phone}>{errors?.phone?.message}</p>
                

                <label>Role</label>
                <select {...register("role")}>
                    <option>seller</option>
                    <option>buyer</option>
                </select><br/>
                </div>

                <div>
                <label>Password</label>
                <input type='password' placeholder='Password' {...register("password")} /><br />
                <p className='p-red' hidden={!errors?.password}>{errors?.password?.message}</p>
                
                <label>Confirm Password</label>
                <input type='password' placeholder='Confirm Password' {...register("confirmPass")} /><br />
                <p className='p-red' hidden={!errors?.confirmPass}>{errors?.confirmPass?.message}</p>
                </div>
                </div>
                <div className='mt-4'>
                <Button className='rgs-btn' type='submit'>Register</Button> 
                <Button className='ccl-btn' onClick={cancelLogin} type="button">Cancel</Button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Register;
