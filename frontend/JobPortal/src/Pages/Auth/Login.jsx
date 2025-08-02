import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../Componenets/Input/Input'
import { validateEmail } from '../../utils/helper'
import { axiosInstance } from '../../utils/axiosInstance'
import axios from 'axios'
import { API_PATHS } from '../../utils/apiPaths'
import { useContext } from 'react'
import { UserContext } from '../../context/usercontext'
export default function Login({setcurrentPage}) {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
     const[error,setError] = useState(null);
     const {updateUser} = useContext(UserContext)
     const navigate= useNavigate();

     const handleLogin=async(e)=>{
        e.preventDefault();
        console.log("Login")
        if(!validateEmail(email)){
            setError("Please enter valid email address");
            return;
        }
        if(!password){
            setError("Please enterpassword");
            return;
        }
        setError("")
        //API call


        try{
          //  const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{email,password})
          console.log(API_PATHS.AUTH.LOGIN)
          const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{email,password})
           console.log(response)
            const token = response.data.token;
           console.log("Token",token)
            if(token){
                
             //localStorage.setItem("token",JSON.stringify(token))
                updateUser(response.data)
                 navigate("/dashboard")
            }   
                
           
        }
        catch(error){
            if(error.response && error.response.data.message){
                setError(error.response.data.message)
            }
        }
     }
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
         <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
         <p className='text-sm text-slate-700 mt-[5px] mb-6'>Please enter your details to login</p>
         <form onSubmit={handleLogin}>
                 <Input value={email} onChange={({target})=>setEmail(target.value)} label="Email Address" 
                 placeholder = "john@example.com" type="text"/>
                    <Input value={password} onChange={({target})=>setPassword(target.value)} label="Password" 
                 placeholder = "Min 8 characters" type="password"/>
                 {
                    error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>
                 }
                 <button type="submit" className='w-full flex items-center justify-center gap-3 text-sm font-medium text-white bg-black shadow-lg rounded-md px-4 py-3 mb-4 mt-3 border border-gray-100 outline-none focus-within:border-orange-300 cursor-pointer'>Log in</button>
                 <p className='text-[13px] text-slate-800 mt-3'>Don't have an account? {" "}
                    <button className='font-medium text-primary underline cursor-pointer' onClick={()=>setcurrentPage("signup")}>SignUp</button>

                 </p>
         </form>
    </div>
  )
}
