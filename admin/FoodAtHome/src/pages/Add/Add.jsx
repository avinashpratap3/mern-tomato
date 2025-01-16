import React, { useEffect, useState } from 'react'
import "./Add.css"
import axios from "axios"
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
function Add({url}) {
    
    const [image,setimage]=useState(false)
    const [data,setdata]=useState({
        name:"",
        description:"",
        price:"",
        category:"Salad",

    })
    const onChangeHandler =(e)=>{
        const name=e.target.name
        const value=e.target.value 
        setdata(data=>({...data,[name]:value}))
    }

    const onsubmithandler=async (e) =>{
        e.preventDefault();
        const formdata=new FormData();

        formdata.append("name",data.name)
        formdata.append("description",data.description)
        formdata.append("price",data.price)
        formdata.append("category",data.category)
        formdata.append("image",image)
        // console.log(`${url}/api/food/add`)
        const response=await axios.post(`${url}/api/food/add`,formdata)
        if(response.data.success){
            setdata({
                name:"",
                description:"",
                category:"Salad",
        
            })
            setimage(false)
            toast.success(response.data.message)


        }
        else{

        }

    }
    useEffect(()=>{
        console.log(data)
    },[data])
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onsubmithandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor='image'>
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setimage(e.target.files[0])} type="file" id="image" hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p>
                    Product name 
                </p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />

            </div>
            <div className="add-product-description flex-col"> 
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Writese content here' id=""></textarea>
            </div>
            <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Product category</p>
                <select onChange={onChangeHandler} value={data.category} name="category" id="">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Desert">Desert</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>Product price</p>
                <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
            </div>

            </div>
            <button type='submit' className='add-btn'>Add</button>
            
        </form>
        
    </div>
  )
}

export default Add