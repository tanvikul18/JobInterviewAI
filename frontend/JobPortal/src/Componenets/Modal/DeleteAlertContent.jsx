import React from 'react'

export default function DeleteAlertContent({content,onDelete}) {
  return (
    <div className='p-5'>
       <p className='text-[14px]'>
        {content}
       </p>
       <div className='flex justify-end mt-6'>
        <button type='button' className='bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white-500 px-7 py-3.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer' onClick={onDelete}>Delete</button>
       </div>
    </div>
  )
}
