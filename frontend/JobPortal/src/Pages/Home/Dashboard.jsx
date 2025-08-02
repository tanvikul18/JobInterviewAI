import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { API_PATHS } from '../../utils/apiPaths';
import { axiosInstance } from '../../utils/axiosInstance';
import { useEffect } from 'react';
import { LuPlane,LuPlus } from 'react-icons/lu';
import Modal from '../../Componenets/Modal/Modal';
import toast from 'react-hot-toast';
import moment from "moment"
import DashboardLayout from '../../layouts/DashboardLayout';
import CreateSessionForm from "../Home/CreateSessionForm.jsx"
import DeleteAlertContent from "../../Componenets/Modal/DeleteAlertContent.jsx"
import SummaryCard from '../../Componenets/Cards/SummaryCard.jsx';

export default function Dashboard() {
  const navigate=useNavigate();
  const[openCreateModal,setOpenCreateModal]=useState(false)
  const[session,setSession]=useState([])
  const[openDeleteAlert,setOpenDeleteAlert]=useState({
    open:false,
    data:null
  })
  const fetchAllSessions=async()=>{
    try{
          const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
          console.log(response);
          setSession(response.data.sessions)
    }
    catch(err){
      console.log(err)
         console.log("Error fecthing")
    }
         
  }
  const deleteSession=async(sessionData)=>{
    try{
      console.log("DEleted SEssseion Id",sessionData._id)
          const response = await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
          if(response){
            toast.success("Session deleted Sucessfully")
            setOpenDeleteAlert({
              open:false,
              data:null
            })
            fetchAllSessions();
          }
          
    }
    catch(err){
            console.error("ERror delting sesson",err)
    }
         
  }
  useEffect(()=>{
    fetchAllSessions();
  },[])
  return (
  
    <DashboardLayout>
      <div className="conatiner mx-auto pt-4 pb-4 p-4">
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6'>
            {
              Array.isArray(session) && session?.map((data,index)=>{
                return <SummaryCard key={data?._id}  role={data?.role || ""} topicsToFocus = {data?.topicsToFocus}
                 experience = {data?.experience | ""} questions = {data?.questions?.length || ""} description= {data?.description || ""}
                 lastUpdated= {data?.updatedAt ? moment(data.updatedAt).format("DD MMM YYYY") : ""}
                 onSelect={
                  
                  ()=> navigate(`/interview-prep/${data?._id}`)}
                   onDelete={()=> setOpenDeleteAlert({open:true,data})}/>
              })
            }
            
          </div>
          <button className='bg-linear-to-r from-[#FF9324] to-[#e99a4b] h-12 md:h-12 flex items-center justify-center gap-3 text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer fixed bottom-10 md:bottom-20 right-10 md:right:20' onClick={()=>setOpenCreateModal(true)}>
            <LuPlus className='text-2xl text-white'/>
            Add New
          </button>
        </div>
        <Modal isOpen={openCreateModal} onClose={()=>setOpenCreateModal(false)} hideHeader>
              <div>
              <CreateSessionForm/>
              </div>
        </Modal>
        <Modal isOpen={openDeleteAlert ?.open} 
        onClose={()=>{setOpenDeleteAlert({open:false,data:null})}} title="Delete Alert">
                 <div className='w-[30vw]'>
                          <DeleteAlertContent content="Are you sure you want to delete the content?" onDelete={()=> deleteSession(openDeleteAlert.data)}/>

                 </div>
        </Modal>
      </DashboardLayout>
  )
}
