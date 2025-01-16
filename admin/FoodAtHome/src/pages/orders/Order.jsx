import React, { useEffect, useState } from 'react'
import "./Order.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
function Order({url}) {
  const [order,setorder] =useState([])

  const fetchallorders=async()=>{
    const response=await axios.get(url+"/api/order/list")
    if (response.data.success) {
      setorder(response.data.data)
      console.log(response.data.data)

    }
    else{
      toast("Error")
    }

  }
  const statushandler=async (event,orderid)=>{
    const response =await axios.post(url+"/api/order/status",{
      orderid,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchallorders()
    }

  }
  useEffect(()=>{
    fetchallorders()
},[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {order.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item,index)=>{
                  if (index===order.items.length-1) {
                    return item.name+" x "+item.quantity
                  }
                  else{
                    item.name+" x "+item.quantity+", "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstname+" "+order.address.lastname}</p>
              <div className="order-item-address">
                <p>{order.address.street}</p>
                <p>{order.address.city+" , "+order.address.state+",  "+order.address.country+" , "+order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e)=>statushandler(e,order._id)} value={order.status} >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Order