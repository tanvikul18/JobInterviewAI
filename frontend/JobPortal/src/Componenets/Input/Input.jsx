import React, { useState } from 'react'
import {FaRegEye,FaRegEyeSlash} from "react-icons/fa"
export default function Input({value,onChange,label,placeholder,type}) {
    const [showPassword,setShowPassword] = useState(false)
    const toggleShowPassword = ()=>{
        setShowPassword(!showPassword)
    }
  return (
    <div>
      <label className='text-[13px] text-slate-800'>{label}</label>
      <div className=' w-full flex justify-between gap-3 text-sm text-black bg-gray-50/50 rounded px-4 py-3 mb-4 mt-3 border border-gray-100 outline-none focus-within:border-orange-300'>
        <input type={type === "password" ? (showPassword ? "text" : "password") : type} placeholder={placeholder}
        className='w-full bg-transparent outline-none' value={value} onChange={(e)=>onChange(e)}
        />
        {
            type === "password" && (
                <>
                (
                    {
                       showPassword ? (
                    <FaRegEye size={22} className='text-primary cursor-pointer' onClick={()=>toggleShowPassword()}/>
                ) : (
                    <FaRegEyeSlash size={22} className='text-slate-400 cursor-pointer' onClick={()=>toggleShowPassword()}/>
                )})
                </>
            )
        }
      </div>
    </div>
  )
}
