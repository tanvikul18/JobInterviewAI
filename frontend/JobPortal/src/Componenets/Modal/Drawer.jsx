import React, { Children } from 'react'
import { LuX } from 'react-icons/lu'

export default function Drawer({ isOpen,onClose,title,children}) {
  return (
    <div className={`fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] p-4 overflow-y-auto bg-white transition-transform w-full md:w-[40vw] shadow-2xl shadow-cyan border-r boder-l-gray-800 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
       <div className='flex items-center justify-between mb-4'>
        <h5 id="drawer-right-label" className='flex items-center text-base font-semibold text-black'>
                 {title}
        </h5>
        <button className='text-gray-400 bg-transparent hover-bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center cursor-pointer' onClick={onClose}><LuX className='text-lg'/></button>
       </div>
       <div className='text-sm mx-3 mb-6'>
         {children}
       </div>
    </div>
  )
}
