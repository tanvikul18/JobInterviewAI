import React, { useEffect, useRef, useState } from 'react'
import { LuChevronDown, LuPin, LuPinOff, LuSparkle, LuSparkles } from 'react-icons/lu'
import AIResponsePreview from '../../Pages/InterviewPrep/AIResponsePreview'
export default function QuestionCard({question,answer,onLeanMore,isPinned,onTogglePin}) {
    const[isExpanded,setExpanded]=useState(false)
    const[height,setHeight]=useState(0)
    const contentRef=  useRef(null)

    useEffect(()=>{
       if(isExpanded)
       {
        const contentHeight = contentRef.current.scrollHeight;
        setHeight(contentHeight + 10) 
       }
       else{
          setHeight(0)
       }
    },[isExpanded])

    const toggleExpand=()=>{
         setExpanded(!isExpanded)
    }
  return (
 <div className='bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100 group'>
  <div className='flex items-start justify-between cursor-pointer'>
    <div className='flex items-start gap-3.5'>
      <span className='text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]'>Q</span>
      <h3
        onClick={toggleExpand}
        className='text-medium md:text-[15px] font-semibold text-gray-800 mr-0 md:mr-20'
      >
        {question}
      </h3>
    </div>

    <div className='flex items-center justify-end ml-4 relative'>
      {/* ✅ This block shows only when hovered (on larger screens) or when expanded */}
      <div className={`gap-2 ${isExpanded ? "flex" : "hidden md:group-hover:flex"}`}>
        <button
          onClick={onTogglePin}
          className='flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 rounded border border-indigo-50 hover:bg-indigo-200 cursor-pointer'
        >
          {isPinned ? <LuPinOff className='text-xs' /> : <LuPin className='text-xs' />}
        </button>

        <button
          onClick={() => {
            setExpanded(true);
            onLeanMore();
          }}
          className='flex items-center gap-2 text-xs text-cyan-800 font-medium px-3 py-1 rounded border border-cyan-50 hover:bg-cyan-100 cursor-pointer'
        >
          <LuSparkles />
          <span className='hidden md:block'>Learn More</span>
        </button>
      </div>

      <button
        className='text-gray-400 hover:text-gray-500 cursor-pointer ml-2'
        onClick={toggleExpand}
      >
        <LuChevronDown
          size={20}
          className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  </div>

  <div
    className='overflow-hidden transition-all duration-300 ease-in-out'
    style={{ maxHeight: `${height}px` }}
  >
    <div
      className='mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg'
      ref={contentRef}
    >
      <AIResponsePreview content={answer} />
    </div>
  </div>
</div>

  )
}
