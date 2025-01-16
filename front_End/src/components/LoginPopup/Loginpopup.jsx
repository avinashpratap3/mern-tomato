import React, { useState } from 'react'
import "./Loginpopup.css"
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

function Loginpopup({setshowlogin}) {

    const {url,settoken} =useContext(StoreContext)
    const [currstate,setcurrstate]=useState("Log In")

    const [data,setdata]= useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler=(e)=>{
        const name =event.target.name
        const value=event.target.value
        setdata(data=>({...data,[name]:value}))
    }
    const onlogin=async (e)=>{
        e.preventDefault()
        let newurl=url;
        if(currstate==="Log In"){
            newurl+= "/api/user/login"
        }
        else{
            newurl+="/api/user/register"
        }

        const response=await axios.post(newurl,data)

        if (response.data.success) {
            settoken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setshowlogin(false)
        }
        else{
            alert(response.data.message)
        }


    }
  return (
    <div className='login-popup'>
        <form onSubmit={onlogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currstate}</h2>
                <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currstate==="Log In"?<></>:<input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required/>}
                
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required/>
                <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required/>


            </div>
            <button type='submit'>{currstate==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, i agree to terms of use and privacy Policy</p>
            </div>
            {currstate==="Log In"
            ?<p>Create a new account? <span onClick={()=>setcurrstate("Sign Up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=>setcurrstate("Log In")}>Login here</span></p>
        }
            
            


        </form>
    </div>
  )
}

export default Loginpopup