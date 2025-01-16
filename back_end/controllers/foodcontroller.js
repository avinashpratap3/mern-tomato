import foodmodel from "../models/foodmodel.js";
import fs from "fs"
import fileupload from "express-fileupload"




const addFood=async (req,res)=>{
    
    console.log(req.file)
    

    const food=new foodmodel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:req.file.path,
    })
    try{
        await food.save();
        // console.log(req.body)
        
        res.json({success:true,message:"food added"})
    }catch(e){
        console.log(e)
        res.json({success:false,message:"error"})

    }
    

}

const listfood=async (req,res)=>{
    
    try{
        const foods =await foodmodel.find({});
        console.log(foods)
        res.json({success:true,data:foods})

    }catch(error){
        console.log(error)
        res.json({success:false,message:"error"})
    }

}


const removefood =async(req,res)=>{
    try {
        const food=await foodmodel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodmodel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food removed"})
    }
     catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

export {addFood,listfood,removefood}