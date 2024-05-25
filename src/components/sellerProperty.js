import React, { useEffect, useState } from "react";
import { GetRequest } from "../global/getReq";
import CardCom from "./card";
import Header from "./header";

function ViewSellerProperty(){
    const [sellerPrData,setSellerPrData] = useState([]);
    const [changeData,setChangeData] = useState(0);

    useEffect(()=>{
        GetRequest("property/seller")
        .then((data)=>{
            console.log(data.data?.data);
            setSellerPrData(data.data?.data);
        })
        .catch((err)=>{
            console.log(err);
            alert(err)
        })
    },[changeData])

    const onDataChange=()=>{
        setChangeData(changeData+1);
    }


    return(
        <div className="App">
            <Header />
            <h1>Your Properties</h1>
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-9'>
                    {sellerPrData.map((ele)=>{
                        return(
                            <CardCom data={ele} sellerProperty={true} reload={onDataChange} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ViewSellerProperty;