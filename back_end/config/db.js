import mongoose from "mongoose";


export const connectdb=async ()=>{
    await mongoose.connect("mongodb+srv://avinashpratap333:Rockavi9839@cluster0.dxfi4.mongodb.net/MERN_PROJECT").then(()=>console.log("db connected"))

}