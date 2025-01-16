import express from "express"
import cors from "cors"
import { connectdb } from "./config/db.js";
import foodrouter from "./routes/foodroute.js";
import userrouter from "./routes/userroute.js";
import fileUpload from "express-fileupload";
import "dotenv/config"
import cartrouter from "./routes/cartroute.js";
import orderrouter from "./routes/orderroute.js";



const app=express();
const port=process.env.PORT || 4000;

app.use(express.json())
app.use(cors())
// app.use(fileUpload({
//     useTempFiles:true
// }))

connectdb();

app.use("/api/food",foodrouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userrouter)
app.use("/api/cart",cartrouter)
app.use("/api/order",orderrouter)

app.get("/",(req,res)=>{
    res.send("API working")

})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

//mongodb+srv://avinashpratap333:<db_password>@cluster0.dxfi4.mongodb.net/?