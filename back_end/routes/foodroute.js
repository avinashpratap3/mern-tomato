import express from "express"
import { addFood, listfood, removefood } from "../controllers/foodcontroller.js"
import multer from "multer"
import fileUpload from "express-fileupload";
import {CloudinaryStorage} from "multer-storage-cloudinary"
import {v2 as cloudinary} from "cloudinary"
const foodrouter = express.Router();


cloudinary.config({
    cloud_name:"dywvipsd8",
    api_key:"142112394953522",
    api_secret:"paviKtu9U2R4NhgVHhnTra_-IGI"
})
const storage =new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:"tomato",
        
    },
})
const upload=multer({storage:storage})

foodrouter.post("/add",upload.single("image"),addFood)
foodrouter.get("/list",listfood)
foodrouter.post("/remove",removefood)



export default foodrouter;