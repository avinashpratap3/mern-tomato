import usermodel from "../models/usermodel.js";

const addtocart =async (req,res)=>{
try {
    // console.log(req.body.userid)
    let userdata=await usermodel.findOne({_id:req.body.userid})
    
    let cartdata=await userdata.cartdata;
    
    if (!cartdata[req.body.itemid]) {
        cartdata[req.body.itemid]=1
    }
    else{
        cartdata[req.body.itemid]+=1
    }

    await usermodel.findByIdAndUpdate(req.body.userid,{
        cartdata
    })
    res.json({success:true,message:"Added to cart"})
} catch (error) {
    console.log(error)
    
    res.json({success:false,error})
}
}


const removefromcart=async(req,res)=>{

    try {
        let userdata=await usermodel.findById(req.body.userid)
        let cartdata =await userdata.cartdata

        if (cartdata[req.body.itemid]>0) {
            cartdata[req.body.itemid]-=1
        } 
        await usermodel.findByIdAndUpdate(req.body.userid,{cartdata})
        res.json({success:true,message:"Removed from Cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }


}

const getcart =async (req,res)=>{
    try {
        let userdata =await usermodel.findById(req.body.userid)
        let cartdata=await userdata.cartdata
        res.json({success:true,cartdata})
    } catch (e) {
        console.log(e)
        res.json({success:false,message:"Error"})
    }

}


export {addtocart,removefromcart,getcart}