import React from 'react'
import "./Verify.css"
import {useSearchParams,useNavigate} from "react-router-dom"
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useEffect } from 'react'
function Verify() {
    const [searchparams,setsearchparams] = useSearchParams()
    const success=searchparams.get("success")
    const orderid=searchparams.get("orderid")
    const navigate=useNavigate()
    const {url} =useContext(StoreContext)
    const verifypayment =async()=>{
        const response =await axios.post(url+"/api/order/verify",{success,orderid})
        if(response.data.success){
            navigate("/myorders")

        }
        else{
            navigate("/")
        }
    }
    useEffect(()=>{
        verifypayment()
    },[])

    
  return (
    <div>
        <div className="verify">
            <div className="spinner"></div>
        </div>
    </div>
  )
}

export default Verify