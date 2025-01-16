import React, { useContext } from 'react'
import "./Placeorder.css"
import { StoreContext } from '../../context/StoreContext'
import { useState } from 'react'
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
function Placeorder() {
    const {getTotalCartAmount,token,food_list,cartitems,url}=useContext(StoreContext)
    const navigate=useNavigate();


    const [data,setdata] =useState({
        firstname:"",
        lastname:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })

    const onchangehandler=(event)=>{
        const name=event.target.name
        const value =event.target.value
        setdata(data=>({...data,[name]:value}))

    }
    const placeorder=async (event)=>{
        event.preventDefault()
        let orderitem=[]
        food_list.map((item)=>{
            if(cartitems[item._id]>0){
                let iteminfo=item
                iteminfo["quantity"]=cartitems[item._id]
                orderitem.push(iteminfo)
            }
        })
        // console.log(orderitem)
        let orderdata ={
            address:data,
            items:orderitem,
            amount:getTotalCartAmount()+2
        }
        let response =await axios.post(url+"/api/order/place",orderdata,{headers:{token}})
        if(response.data.success){
            const {session_url}=response.data
            window.location.replace(session_url)
        }
        else{
            console.log(response)
            alert("Error")
        }

    }

    useEffect(()=>{
        if (!token) {
            navigate("/cart")
        }
        else if (getTotalCartAmount()===0) {
            navigate("/cart")
        }

    },[token])
  return (
    <form onSubmit={placeorder} className="placeorder">
        <div className="placeorder-left">
            <p className='title'>Delivery Information</p>
            <div className='multi-fields'>
                <input required name='firstname' onChange={onchangehandler} value={data.firstname} type="text" placeholder='first name' />
                <input required name='lastname' onChange={onchangehandler} value={data.lastname} type="text" placeholder='last name' />
            </div>
            <input required name='email' onChange={onchangehandler} value={data.email} type="email" placeholder='Email address'/>
            <input required type="text" name='street' onChange={onchangehandler} value={data.street} placeholder='Street'/>
            <div className="multi-fields">
                <input required type="text" name='city' onChange={onchangehandler} value={data.city} placeholder='City' />
                <input required type="text" name='state' onChange={onchangehandler} value={data.state} placeholder='State' />

            </div>
            <div className="multi-fields">
                <input required type="text" name='zipcode' onChange={onchangehandler} value={data.zipcode} placeholder='Zip Code' />
                <input  requiredtype="text" name='country' onChange={onchangehandler} value={data.country} placeholder='Country' />

            </div>
            <input required type="text" name='phone' onChange={onchangehandler} value={data.phone} placeholder='Phone' />


        </div>
        <div className="placeorder-right">
        <div className="cart-total">
                <h2>Cart Totals</h2>
                <div>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>${getTotalCartAmount()===0?0:2}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Total</p>
                        <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
                    </div>
                </div>
                <button type='submit' onClick={()=>navigate("/order")}>Proceed To Payment</button>
            </div>
        </div>
    </form>
  )
}

export default Placeorder