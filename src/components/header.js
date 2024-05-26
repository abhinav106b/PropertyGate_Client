import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Nav,Navbar,NavItem,NavbarBrand,NavbarToggler,Collapse,NavLink,DropdownItem,DropdownMenu,DropdownToggle,
    NavbarText,UncontrolledDropdown
} from 'reactstrap'
import { PostRequest } from "../global/post";
import { GetRequest } from "../global/getReq";


function Header(props){
    const [userData,setUserData] = useState(null);
    useEffect(()=>{
        GetRequest('users/')
        .then((user)=>{
            setUserData(user.data?.data);
            console.log("User data ",user.data?.data);
        })
        .catch((err)=>{
            console.log("User fetch error");
        })
    },[])
    const logOut=()=>{
        PostRequest('users/logout')
        .then((succ)=>{
            localStorage.removeItem('token');
            alert("successfully logedout")
            setUserData(null);
            props?.clearData();
        })
        .catch((err)=>{
            alert("error in logout : ",err)
        })
    }

    return(
        <div>
            <nav>
            <div className="row">
                <div className="col-6">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {userData && userData?.role=="seller"?<li><Link to="/propertyForm">Add property</Link><br/></li>:<></>}
                    {userData && userData.role=="seller"?<li><Link to="/viewSeller">View my properties</Link><br/></li>:<></>}
                    
                </ul>
                </div>
                <div className="col-6">
                <ul>
                    {userData?<></>:<li><Link to='/register'>Register</Link><br/></li>}
                    {userData?<li><Link onClick={logOut}>Logout</Link></li>:<li><Link to="/login">Login</Link></li>}
                    {userData?<p className="clr-white">Hi! {userData?.firstName}</p>:<></>}
                </ul>
                </div>
            </div>
        </nav>
        </div>
    );
}

export default Header;