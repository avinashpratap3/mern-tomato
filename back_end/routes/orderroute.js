import express from "express"

import {placeorder, userorders, verifyorder,listorder, updatestatus} from "../controllers/ordercontroller.js"
import authmiddleware from "../middleware/auth.js"


const orderrouter=express.Router()

orderrouter.post("/place",authmiddleware,placeorder)

orderrouter.post("/verify",verifyorder)

orderrouter.post("/userorder",authmiddleware,userorders)
orderrouter.get("/list",listorder)
orderrouter.post("/status",updatestatus)

export default orderrouter