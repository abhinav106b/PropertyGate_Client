import React,{useEffect, useState} from 'react'
import {Card,CardImg,CardBody,CardTitle,CardText, Button,Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import { FcLikePlaceholder,  FcLike } from "react-icons/fc";
import { MdEdit,MdDelete,MdOutlineCancel } from "react-icons/md";
import axios from 'axios';
import PropertyForm from './propertyForm';
import { DeleteRequest, PostRequest } from '../global/post';
import { GetRequest } from '../global/getReq';
import {useNavigate} from 'react-router-dom'

function CardCom(props){
    const [likebtn, setLikebtn] = useState(false);
    const [likeCnt,setLikeCnt] = useState(0);
    const [sellerData,setSellerData] = useState(null);
    const [modal, setModal] = useState(false);
    const [triggerRelaod, setTriggerReload] = useState(0);
    const [intBtn, setIntBtn] =useState(false);

    const navigate = useNavigate();

    const toggleModal =()=>{
        setModal(!modal);
    }

    const onLikeClick =()=>{
        if(likebtn){
            axios.patch(`${process.env.REACT_APP_BASEURL}/property/dislike/${props?.data?._id}`)
            .then((done)=>{
                setLikebtn(false);
                setLikeCnt(likeCnt-1);
            })
            .catch((err)=>{
                console.log(err)
                alert("Please login")            })
        }
        else{
            axios.patch(`${process.env.REACT_APP_BASEURL}/property/like/${props?.data?._id}`)
            .then((done)=>{
                setLikebtn(true)
                setLikeCnt(likeCnt+1);
            })
            .catch((err)=>{
                console.log(err)
                alert("Please login")  
            })
        }
    }
    useEffect(()=>{
        console.log("From card component ",props.data)
        setLikeCnt(props?.data?.likeCount)

    },[triggerRelaod])

    const reloadOnEdit =()=>{
        props?.reload();
    }

    const onClickDelete =()=>{
        DeleteRequest(`property/${props?.data?._id}`)
        .then((rsp)=>{
            alert("Delete successfully");
            reloadOnEdit();
        })
        .catch((err)=>{
            console.log("Error while deleting seller property ",err);
            alert(err);
        })
    }

    const onInterestedBtnClick=()=>{
        if(!props?.userData){
            navigate('/login')
            alert("Please login to see seller details")
        }
        else{
            console.log("UserData Doneeeeee", props?.userData )
            setIntBtn(true);
            GetRequest(`users/${props?.data?.sellerId}`)
            .then((rsp)=>{
                console.log("Seller data  ",rsp.data);
                setSellerData(rsp.data?.data);
                let emailBody ={
                    buyerEmail: props?.userData?.email,
                    sellerEmail: rsp.data?.data?.email,
                    buyerDetails: props?.userData,
                    sellerDetails: rsp.data?.data
                }
                PostRequest("sendMail",emailBody)
                .then((succ)=>{
                    alert("Email sent successfully");
                })
                .catch((err)=>{
                    console.log(err);
                    alert("Error while sending email");
                })
            })
            .catch((err)=>{
                console.log("Error while getting seller data  ",err);
                alert(err);
            })
        }
    }
    useEffect(()=>{
        if(props?.userData === null){
            setSellerData(null);
        }
    },[props?.userData])


    return(
        <div key={props?.data._id}>
            <Modal fullscreen isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
                <ModalBody>
                    <PropertyForm propertyData={props?.data} reload={reloadOnEdit} modal={true} toggle={toggleModal}/>
                </ModalBody>
            </Modal>
        
        <Card className='crd'>
            <CardBody>
                <div className='row'>
                    <div className='col-4'>
                        <CardImg top className='crd-img' src={props?.data?.image? props?.data?.image:"https://media.self.com/photos/630635c30b7f36ce816f374a/4:3/w_2240,c_limit/DAB03919-10470989.jpg"} alt='apt image' />
                    </div>
                    <div className='col-8'>
                        <CardTitle className='crd-title'>₹{props?.data?.price} ,{props?.data?.title} {props?.sellerProperty?<></>:<button onClick={onLikeClick} className='like-btn'>{likebtn?<FcLike className='like'/>:<FcLikePlaceholder className='like' />} {likeCnt}</button>}</CardTitle>
                        <p>{props?.data?.aptType} FLat</p>
                        <p>{props?.data?.description}</p>
                        <p>{props?.data?.location}</p>
                        <p>Bathrooms: {props?.data?.bathrooms}</p>
                        <p>CLose to Hospital || Close to Markets || close to Malls</p>
                        <div className='btn-int-div'>
                            {props?.sellerProperty?<div className='flex-row'><Button onClick={toggleModal} className='edit-btn'>Edit <MdEdit className='editMd' /></Button><Button onClick={onClickDelete} className='delete-btn'>Delete<MdDelete className='deleteMd'/></Button></div>:<Button onClick={onInterestedBtnClick} className='btn-int'>I am Interested</Button>}
                        </div>
                    </div>
                </div>
                {intBtn && sellerData?<div className='row seller-details relative'>
                    <h3>Seller Details</h3>
                    <div className='outline-cancel'><Button onClick={()=>{setIntBtn(!intBtn)}} className='outline-btn'><MdOutlineCancel className='outline-cancel-btn'/></Button></div>
                    <p>Name: {sellerData?.firstName} {sellerData?.lastName}</p>
                    <p>Contact: {sellerData?.phone} || email: {sellerData?.email}</p>
                </div>:<></>}
            </CardBody>
        </Card>
        </div>
    );
}

export default CardCom;