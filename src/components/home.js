import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {Card,CardImg,CardBody,CardTitle,CardText, Button} from 'reactstrap'
import { FcLikePlaceholder,  FcLike } from "react-icons/fc";
import axios from 'axios'
import CardCom from './card';
import { GetRequest } from '../global/getReq';
import { PostRequest } from '../global/post';
import FilterBar from './filterBar';
import Pagination from './pagination';
import Header from './header';

function Home(){
    const [propertyData, setPropertyData] = useState([]);
    const [userData,setUserData] = useState(null);
    const [currentPage,setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        price: '',
        aptType: '',
        bathrooms: ''
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    useEffect(()=>{
        console.log(process.env.REACT_APP_BASEURL,"hello");
        setLoading(true);
        GetRequest('property/')
        .then((data)=>{
            console.log(data.data?.data);
            setPropertyData(data.data?.data);
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err)
        })

        GetRequest('users/')
        .then((user)=>{
            setUserData(user.data?.data);
            console.log("User data ",user.data?.data);
        })
        .catch((err)=>{
            console.log("User fetch error");
        })
    },[])

    const filteredProperties = propertyData.filter(property => {
        return (
            (filters.price === '' || property.price <= filters.price) &&
            (filters.aptType === '' || property.aptType === filters.aptType) &&
            (filters.bathrooms === '' || property.bathrooms >= filters.bathrooms)
        );
    });

    const clearUserData=()=>{
        setUserData(null);
    }

    const productPerPage = 4;

    //Pagination
    const indexOfLastPage = currentPage * productPerPage;
    const indexOfFirstPage = indexOfLastPage - productPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstPage,indexOfLastPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    

    return(
        <div className='App'>
            <Header userData={userData} clearData={clearUserData} />
            <h1>Home Page</h1>
            {loading?<div><h3>Loading ...<p className='load-p'>Note: It might take 20-40 seconds to load as backend is deployed in free tier</p></h3></div>:<></>}
            {/* {userData? <h4>{userData?.firstName}  {userData?.email}</h4>:<></>}
            {userData?<></>:<><Link to='/register'>Register</Link><br/></>}
            {userData?<Link onClick={logOut}>Logout</Link>:<Link to="/login">Login</Link>}<br/>
            {userData && userData.role=="seller"?<><Link to="/propertyForm">Add property</Link><br/></>:<></>}
            {userData && userData.role=="seller"?<><Link to="/viewSeller">View my properties</Link><br/></>:<></>} */}
            <div className='row'>
                <div className='col-3'>
                    <FilterBar filters={filters} onFilterChange={handleFilterChange} />
                </div>
                {!loading?<div className='col-9'>
                    {currentProperties.map((ele,index)=>{
                        return(
                            <div key={index+1}>
                            <CardCom data={ele} userData ={userData}/>
                            </div>
                        );
                    })}
                </div>:<div className='col-9'></div>}
            </div>
            <div className='pagination-center'>
                <Pagination 
                    propertiesPerPage={productPerPage} 
                    currentPage={currentPage} 
                    totalProperties={filteredProperties.length}
                    paginate={paginate} />
            </div>
        </div>
    );
}

export default Home;