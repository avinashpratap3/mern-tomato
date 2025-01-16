import jwt from "jsonwebtoken"
import "dotenv"

const authmiddleware=async (req,res,next)=>{
    const {token}=req.headers;
    // console.log(req.headers)
    if (!token) {
        return res.json({success:false,message:"Not authorised login again"})
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        // console.log(token_decode)
        req.body.userid=token_decode.id
        next();
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }


}

export default authmiddleware