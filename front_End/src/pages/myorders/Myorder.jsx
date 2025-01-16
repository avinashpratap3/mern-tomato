import React from 'react'
import "./Myorder.css"
import { useState } from 'react'
import axios from "axios"

import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
function Myorder() {
    const [data,setdata]=useState([])
    const {url,token}=useContext(StoreContext)

    const fetchorder =async ()=>{
        const response =await axios.post(url+"/api/order/userorder",{},{headers:{token}})
        setdata(response.data.data)
        // console.log(response.data.data)
    }

    useEffect(()=>{
        if(token){
            fetchorder()
        }

    },[token])


  return (
    <div className='my-orders'>
        <h2>My Order</h2>
        <div className="container">
            {data.map((order,index)=>{
                return(
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if (index===order.items.length-1) {
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+", "
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchorder}>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Myorder