import mongoose from "mongoose"

const orderschema =new mongoose.Schema({
    userid:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
})

const ordermodel= mongoose.models.order ||  mongoose.model("order",orderschema)
export default ordermodel