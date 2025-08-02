import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../Componenets/Input/Input'
import { axiosInstance } from '../../utils/axiosInstance'
import axios from 'axios'
import { API_PATHS } from '../../utils/apiPaths'
import {Loader} from "lucide-react"
export default function CreateSessionForm() {
    const[formData,setFormData]= useState({
        role:"",
        experience:"",
        topicsToFocus:"",
        description:""
    })
    const[isLoading,setIsLoading]=useState(false)
     const[error,setError]=useState(null)
     const navigate=useNavigate();
     const handleChange=(name,value)=>{
            setFormData((prevData)=>({
                ...prevData,
                [name]:value
            }))
     }

     const handleCreateSession=async(e)=>{
        e.preventDefault();
        console.log("Inside session creation")
        const{role,experience,topicsToFocus}=formData;
        console.log(role,experience,topicsToFocus)
         if(!role||!experience||!topicsToFocus){
                 setError("Please fill all the required fields")
                return;
              }
              setError("")
              setIsLoading(true)
         try{
             const response = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS,{role,experience,topicsToFocus,numberOfQuestions:10})
             //console.log(response) 
             const generatedQuestions =  response.data;
             console.log("Questions",generatedQuestions)
              const apiResponse = await axiosInstance.post(API_PATHS.SESSION.CREATE,{
                
                    questions:generatedQuestions,
                       ...formData
              })
             console.log(apiResponse)
              if(apiResponse.data?.session?._id){
                console.log(apiResponse.data.session?._id)
                navigate(`/interview-prep/${apiResponse.data.session?._id}`)
              }
            }
         catch(err){
                  if(err.response && err.response.data.message){
                    setError(err.response.data.message)
                  }
                  else{
                    setError("Something went wrong. Pease try again.")
                  }
         }
     }
  return (
    <div className='w-[90vw] md:w-[35vw] p-7 flex  flex-col justify-center'>
       <h3 className='text-lg font-semobold text-black'>
              Start a new Interview Jounrey
       </h3>
       <p className='text-xs text-slate-700 mt-[5px] mb-3'>
        Fill out a few quick details and unlock your personalized set of interview questions!
       </p>
       <form onSubmit={handleCreateSession} className='flex flex-col gap-3'>
         <Input value={formData.role} onChange={({target})=>handleChange("role",target.value)} label="Target Role" 
         placeholder="(e.g. Front end develeoper)" type="text"/>
           <Input value={formData.experience} onChange={({target})=>handleChange("experience",target.value)} label="Years of Experience" 
         placeholder="(e.g. 1 year 3years etc)" type="number"/>
           <Input value={formData.topicsToFocus} onChange={({target})=>handleChange("topicsToFocus",target.value)} label="Topics to focus on" 
         placeholder="(e.g. Node, React)" type="text"/>
          <Input value={formData.description} onChange={({target})=>handleChange("description",target.value)} label="Description" 
         placeholder="(Any specific gaols or note for this session)" type="text"/>

         {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
         <button className='w-full flex items-center justify-center gap-3 text-sm font-medium text-white bg-black shadow-lg rounded-md px-4 py-3 mb-4 mt-3 border border-gray-100 outline-none focus-within:border-orange-300 cursor-pointer' disabled={isLoading} type='submit'>
            {isLoading && <Loader className="h-4 w-4 animate-spin mr-2" />}Create Session</button>
       </form>
    </div>
  )
}
