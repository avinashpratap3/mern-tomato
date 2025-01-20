import { createContext, useEffect, useState } from "react";
import axios from "axios"


export const StoreContext=createContext(null)



const StoreContextProvider =(props)=>{
    const [cartitems,setcartitems]=useState({});
    const url ="https://tomato-backend-59z2.onrender.com"
    const [token,settoken]=useState("")

    const [food_list,setfoodlist]=useState([])



    const addtocart=async(itemid)=>{
        if(!cartitems[itemid]){
            setcartitems((prev)=>({...prev,[itemid]:1}))
        }
        else{
            setcartitems((prev)=>({...prev,[itemid]:prev[itemid]+1}))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemid},{headers:{token}})
            
        }

    }
    const removefromcart =async(itemid)=>{
        setcartitems((prev)=>({...prev,[itemid]:prev[itemid]-1}))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemid},{headers:{token}})
            
        }
    }
    const getTotalCartAmount =()=>{
        let totalAmount=0;
        for(const item in cartitems){
            if(cartitems[item]>0){
                let iteminfo=food_list.find((product)=>product._id===item);
            totalAmount+=iteminfo.price* cartitems[item];

            }
            
        }
        return totalAmount
    }

    const fetchfoodlist =async ()=>{
        const response=await axios.get(url+"/api/food/list")
        setfoodlist(response.data.data)
    }

    const loadata=async(token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setcartitems(response.data.cartdata)
    }

    useEffect(()=>{
        
        async function loaddata() {
            fetchfoodlist()
            if(localStorage.getItem("token")){
                settoken(localStorage.getItem("token"))
                await loadata(localStorage.getItem("token"))
    
            }
        }
        loaddata();

            

    },[])

    const contextValue={food_list,cartitems,setcartitems,addtocart,removefromcart,getTotalCartAmount,url,token,settoken}
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>

    )
}


export default StoreContextProvider;
