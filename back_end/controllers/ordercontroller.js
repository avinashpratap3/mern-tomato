import ordermodel from "../models/ordermodel.js";

import usermodel from"../models/usermodel.js"

import Stripe from "stripe"

const stripe=new Stripe(process.env.STRIPE_SECRETKEY)

const placeorder =async(req,res)=>{

    const front_url="https://tomato-front.onrender.com"
    const neworder=new ordermodel({
        userid:req.body.userid,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address
    })
    try {
        await neworder.save();
        await usermodel.findByIdAndUpdate(req.body.userid,{cartdata:{}})
    
        const line_items=req.body.items.map((item)=>({
           
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
    
        }  ))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${front_url}/verify?success=true&orderid=${neworder._id}`,
            cancel_url:`${front_url}/verify?success=false&orderid=${neworder._id}`
        })
        // console.log("hello")

        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

  


}

const verifyorder =async (req,res)=>{
    const {orderid,success}=req.body

    try {
        if (success=="true") {
            await ordermodel.findByIdAndUpdate(orderid,{payment:true})
            res.json({success:true,message:"Paid"})
        }
        else{
            await ordermodel.findByIdAndDelete(orderid)
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})

    }

}

const userorders=async (req,res)=>{
    try {
        const order=await ordermodel.find({userid:req.body.userid})
        console.log(order)
        res.json({success:true,data:order})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}


const listorder=async (req,res)=>{
    try {
        const order=await ordermodel.find({})
        res.json({success:true,data:order})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

const updatestatus=async (req,res)=>{
    try {
        await ordermodel.findByIdAndUpdate(req.body.orderid,{status:req.body.status})
        res.json({success:true,message:"Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

export{placeorder,verifyorder,userorders,listorder,updatestatus}
