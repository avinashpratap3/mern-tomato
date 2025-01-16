import usermodel from "../models/usermodel.js";

import jwt from "jsonwebtoken"
import bcrypt from"bcrypt"
import validator from "validator"



const loginuser=async(req,res)=>{
    const {email,password}=req.body;
    
    try{
        const user=await usermodel.findOne({email})
        
        if(!user){
            return res.json({success:false,message:"user does not exist"})
            
        }

        const ismatch =await bcrypt.compare(password,user.password)
        // console.log(ismatch)

        if (!ismatch) {
            return res.json({success:false,message:"invalid credentials"})
            // console.log(ismatch)s
        }
        const token = createtoken(user._id)
        res.json({success:true,token})
    }catch(e){
        console.log(e)
        return res.json({success:false,message:"Error"})

    }

}

const createtoken=(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registeruser=async(req,res)=>{
    const {name,password,email} =req.body;
    try{
        const exist=await usermodel.findOne({email})
        if(exist){
            return res.json({success:false,message:"user already exists"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"please enter strong password"})
        }


        const salt=await bcrypt.genSalt(10)
        const hashespassword=await bcrypt.hash(password,salt);

        const newuser =new usermodel({
            name:name,
            email:email,
            password:hashespassword
        })


        const user=await newuser.save()
        const token=createtoken(user._id)
        res.json({success:true,token})


    }catch(e){
        console.log(e)
        res.json({success:false,message:"Error"})

    }

}


export {loginuser,registeruser}