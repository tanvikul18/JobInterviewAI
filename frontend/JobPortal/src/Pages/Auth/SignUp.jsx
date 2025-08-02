import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../Componenets/Input/Input'
import ProfilePhotoSelector from '../../Componenets/Input/ProfilePhotoSelector'
import { useContext } from 'react'
import { UserContext } from '../../context/usercontext'
import { validateEmail } from '../../utils/helper'
import ImageUpload from '../../utils/imageUplaod'
import axios from 'axios'
export default function SignUp({setcurrentPage}) {
   const {updateUser} = useContext(UserContext)
      const[profilePic,setProfilepic] = useState(null)
        const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
     const[error,setError] = useState(null)
     const navigate= useNavigate();

     const handleSignup=async(e)=>{
      e.preventDefault();
      let profileImageUrl="";
      console.log("sign up pressed  ")
      if(profilePic)
      {
        const imageuploadRes = await ImageUpload(profilePic);
        profileImageUrl=imageuploadRes.imageUrl;
        console.log("ProfileImg",profileImageUrl)
      }
        if(!validateEmail(email)){
                     setError("Please enter valid email address");
                     return;
                 }
                 if(!password){
                     setError("Please enterpassword");
                     return;
                 }
                 setError("");
       try{
                  const response = await axios.post("http://localhost:3000/auth/signup",{
                      name,email,password,profileImageUrl
                  })
                console.log(response)
                  const token = response.data.token;
                  if(token){
                    //  localStorage.setItem("token",JSON.stringify(token))
                      updateUser(response.data)
                       navigate("/login")

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
         <h3 className='text-lg font-semibold text-black'>Create an Acoount</h3>
         <p className='text-sm text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below.</p>
         <form onSubmit={handleSignup}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilepic}/>
             <Input value={name} onChange={({target})=>setName(target.value)} label="Full Name" 
                 placeholder = "John Doe" type="text"/>
              
                 <Input value={email} onChange={({target})=>setEmail(target.value)} label="Email Address" 
                 placeholder = "john@example.com" type="text"/>
                    <Input value={password} onChange={({target})=>setPassword(target.value)} label="Password" 
                 placeholder = "Min 8 characters" type="password"/>
                 {
                    error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>
                 }
                 <button type="submit" className='w-full flex items-center justify-center gap-3 text-sm font-medium text-white bg-black shadow-lg rounded-md px-4 py-3 mb-4 mt-3 border border-gray-100 outline-none focus-within:border-orange-300 cursor-pointer'>SIGN UP</button>
                 <p className='text-[13px] text-slate-800 mt-3'>Already have an account? {" "}
                    <button className='font-medium text-primary underline cursor-pointer' onClick={()=>setcurrentPage("login")}>Login</button>

                 </p>
         </form>
    </div>
  )
}
