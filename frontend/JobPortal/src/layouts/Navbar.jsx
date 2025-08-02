import React from 'react'
import ProfileCard from '../Componenets/Cards/ProfileCard'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div className='h-16 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0'>
         <div className='container mx-auto flex items-center justify-between gap-5'>
            <Link to="/dashboard">
              <h2 className='text-lg md:text-xl font-medium  text-black leadin-5'>Interview Prepare AI</h2>
            </Link>
            <ProfileCard/>
         </div>
      
    </div>
  )
}
