import React, { useEffect, useState } from "react";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import { PostRequest ,PatchRequest} from "../global/post";
import {useNavigate} from 'react-router-dom'
import {Button} from 'reactstrap'


function PropertyForm(props){
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);

    const onFormSubmit=(data)=>{
        if(props?.modal){
            console.log("Data from modal edit ",data);
            PatchRequest(`property/${props?.propertyData._id}`,data)
            .then((succ)=>{
                alert("Successfully edited ");
                props?.toggle();
                props?.reload();
            })
            .catch((err)=>{
                console.log("Error from property from for seller modal ",err);
                alert(err);
            })
        }
        else{
            console.log("data from property form ",data);
            PostRequest("property",data)
            .then((rsp)=>{
                navigate('/',{replace:true})
            })
            .catch((err)=>{
                console.log("Error from add property ",err);
                alert(err);
            })
        }
    }

    const Schema = yup.object().shape({
        title: yup.string().required(),
        location: yup.string().required(),
        aptType: yup.string().oneOf(['1BHK','2BHK','3BHK','4BHK'],"Property type must 1BHK or 2BHK and so on..").required(),
        description: yup.string().required(),
        price: yup.number().required(),
        bathrooms: yup.number().required()
    })

    const {register,handleSubmit,reset, formState:{errors}} = useForm({
        resolver: yupResolver(Schema),
        defaultValues: formData
    });
    useEffect(()=>{
        if(props?.propertyData){
            console.log("Form property data  ",props?.propertyData)
            setFormData(props?.propertyData);
            reset(props?.propertyData);
        }
    },[])

    return(
        <>
            <div className="App">
                {props?.modal?<><h2>Edit your property</h2></>:<h2>Add Proptery Details</h2>}
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="property-form">
                    <div>
                    <label>Title</label>
                    <input type="text" placeholder="title"  {...register("title")}/><br/>
                    <p className='p-red' hidden={!errors?.title}>{errors?.title?.message}</p>
                    <label>Location</label>
                    <input type="text" placeholder="location" {...register("location")} /><br/>
                    <p className='p-red' hidden={!errors?.location}>{errors?.location?.message}</p>
                    </div>
                    <div>
                    <label> Type</label>
                    <input type="text" placeholder="Apt type eg: 2BHK" {...register("aptType")} /><br/>
                    <p className='p-red' hidden={!errors?.aptType}>{errors?.aptType?.message}</p>
                    <label>Description</label>
                    <input type="text" placeholder="description" {...register("description")} /><br/>
                    <p className='p-red' hidden={!errors?.description}>{errors?.description?.message}</p>
                    </div>
                    <div>
                    <label>Price</label>
                    <input type="number" placeholder="price" {...register("price")} /><br/>
                    <p className='p-red' hidden={!errors?.price}>{errors?.price?.message}</p>
                    <label>Bathrooms</label>
                    <input type="number" placeholder="bathrooms" {...register("bathrooms")} /><br/>
                    <p className='p-red' hidden={!errors?.bathrooms}>{errors?.bathrooms?.message}</p>
                    </div>
                    </div>
                    <div className="mt-4">
                    {props?.modal?<><Button className="rgs-btn" type="submit">Confirm</Button><Button className="ccl-btn" type="button" onClick={props?.toggle}>Cancel</Button></>:<><Button className="rgs-btn" type="submit">Add property</Button><Button className="ccl-btn" onClick={()=>{navigate('/',{replace:true})}} type="submit">Cancel</Button></>}
                    
                    </div>
                </form>
            </div>
        </>
    );
}

export default PropertyForm;