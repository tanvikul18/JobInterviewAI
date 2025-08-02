import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/usercontext'
import { useNavigate } from 'react-router-dom';

export default function ProfileCard() {
    const {user,clearUser} = useContext(UserContext);
    console.log("USer in ProfileCArd",user.user)
    const navigate =useNavigate();
    const handlelogout=()=>{
        localStorage.clear();
        clearUser();
        navigate("/")
    }
  return (
    <div className='flex items-center'>
      <img src={user.user.profileImageUrl} alt="" className='w-11 h-11 bg-gray-300 rounded-full mr-3'/>
      <div className='flex-col'>
      <div className='text-[15px] text-black font-bold leading-3'>
           {user.user.name ? user.user.name : ""}
      </div>
        <div className='text-amber-300 text-sm font-semibold cursor-pointer hover:text-underline'>
             
                      <button className='cursor-pointer' onClick={handlelogout}>
              Logout
        </button>  
             
        </div>
        </div>
      
     
    </div>
  )
}
