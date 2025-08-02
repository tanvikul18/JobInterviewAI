import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout';
import {AnimatePresence,motion} from "framer-motion"
import { axiosInstance } from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import AIResponsePreview from './AIResponsePreview';
import toast from 'react-hot-toast';
import RoleInfoHeader from './RoleInfoHeader';
import Drawer from "../../Componenets/Modal/Drawer.jsx"
import QuestionCard from "../../Componenets/Cards/QuestionCard.jsx"
import { Loader } from 'lucide-react';
export default function InterviewPrep() {
    const {sessionId} = useParams();
    const[sessionData , setSessionData]=useState(null);
    const[error,setError]=useState(null);
    const[openLearnMoreDrawer,setOpenLearnMoreDrawer]=useState(false)
    const[explanation,setExplanation]=useState(null)
    const[isLoading,setIsLoading]=useState(false)
    const[isUpdateLoader,setIsUpdateLaoder]=useState(false)

    const fetchSessionDetailById =async(e)=>{
         try{
            
                const apiResponse = await axiosInstance.get(API_PATHS.SESSION.GET(sessionId));
                console.log(apiResponse)
                 const sessionData = apiResponse.data.session;
                  setSessionData(sessionData)
               
        }  
        catch(err){
             console.error("ERror:",err)
        }
    } 

    const generateConceptExplanation = async(question)=>{

        try{
               setError("")
               setExplanation(null)
               setIsLoading(true)
               

               const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATIONS,{question})
               console.log("AI response",response)
               if(response.data){
                    setExplanation(response.data)  
                    setIsLoading(false)
                    setOpenLearnMoreDrawer(true)
                }
            }
        catch(err){
                console.error("ERror:",err)
        }
    }

    const toogleQuestionPinStatus = async(questionId)=>{

        try{
            console.log("TogglePine",questionId)
              const response = await axiosInstance.post(API_PATHS.QUESTIONS.PIN(questionId));
              console.log(response)
              if(response.data && response.data.updatedQuestion){
                 fetchSessionDetailById()
                
              }
        }
        catch(err){
            setExplanation(null)
            setError("FAiled to generate concept explanation Try again")
                 console.error("ERror:",err)
                setIsLoading(false)
        }
    }
    const uploadMoreQuestions = async(questionId)=>{

        try{
               setIsUpdateLaoder(true)
               const response = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS,{
                role:sessionData?.role,
                experience:sessionData?.experience,
                topicsToFocus:sessionData?.topicsToFocus,
                numberOfQuestions:10,
               })
              console.log("MoreQuestiongenrate",response)
               const generateQuestions = response.data;

               const apiResponse = await axiosInstance.post(API_PATHS.QUESTIONS.ADD_TO_SESSION,{
                sessionId,
                questions: generateQuestions,

               })
               console.log("Added Question",response)
               if(apiResponse.data){
                 toast.success("Added more Q&A")
                 fetchSessionDetailById()
                 setIsUpdateLaoder(false)
               }
       
            }
        catch(error){
             if(error.response.data && error.response.data.message){
                setError(error.response.data.message)
             }
             else{
                setError("Something went wrong")
             }
             setIsUpdateLaoder(false)
        }
    }

    useEffect(()=>{
        console.log("DrawerOpen",openLearnMoreDrawer);
         if(sessionId)
             fetchSessionDetailById()
         return(()=>{

         })   
    },[])
  return (
         <DashboardLayout>
             
            <RoleInfoHeader role={sessionData?.role || ""} topicsToFocus ={sessionData?.topicsToFocus || ""}
             experience={sessionData?.experience | "-"} questions= { sessionData?.questions?.length  || ""}
             description={sessionData?.description} lastUpdatedAt = {sessionData?.updatedAt}
            />
            <div className='container mx-auto pt-4 pb-4 md:px-0'>
               <h2 className='text-lg font-semibold text-black'>Interview Q&A</h2>
               <div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
                   <div className={`col-span-12 ${openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}>
                             <AnimatePresence>
                                   {
                                    sessionData?.questions?.map((data,index)=>{
                                        return <motion.div key={data?._id || index}
                                        initial={{opacity:0,y:-20}}
                                        animate={{opacity : 1, y: 0}}
                                        exit={{opacity: 0,scale :0.95}}
                                        transition={{
                                            duration:0.4,
                                            type:"spring",
                                            stiffness:100,
                                            delay:index*0.1,
                                            damping:15
                                        }}
                                        layout
                                        layoutId={`question-${data._id || index}`}
                                        >
                                            <>
                                            <QuestionCard question={data?.question} answer={data?.answer}
                                             onLeanMore={()=>generateConceptExplanation(data.question)}
                                             isPinned={data?.isPinned} onTogglePin={()=>toogleQuestionPinStatus(data?._id)}
                                            />
                                            </>
                                            {
                                                !isLoading && sessionData ?.questions.length === index+1 &&
                                                <div className='flex items-center justify-center mt-5'>
                                                    <button className='flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer' disabled={isLoading || isUpdateLoader} onClick={uploadMoreQuestions}>
                                                           {isUpdateLoader ? <Loader className="h-4 w-4 animate-spin mr-2" /> : (
                                                            <LuListCollapse className='text-lg '/>
                                                           )} {" "}
                                                           Load More
                                                    </button>
                                                </div>
                                            }
                                            </motion.div>

                                    })
                                   }
                                 </AnimatePresence>

                   </div>
               </div>
               <div>
                <Drawer isOpen={openLearnMoreDrawer} onClose={()=>setOpenLearnMoreDrawer(false)}
                    title={!isLoading && explanation?.title}
                    >
                    {
                        error && (<p><LuCircleAlert className='flex gap-2 text-sm text-amber-600 font-medium'/>{error}</p>)
                    }
                    {/* {  isLoading && <SpinnerLoader className="h-5 w-5"/>} */}
                    {
                        !isLoading && explanation && (<AIResponsePreview content={explanation?.explanation}/>)
                    }
                </Drawer>
               </div>
            </div>
         </DashboardLayout>
  )
  
}
