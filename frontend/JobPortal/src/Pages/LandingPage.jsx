import React, { useState } from 'react'
import {LuSparkles} from "react-icons/lu"
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import { APP_FEATURES } from '../utils/data'
import HERO_IMG from "../assets/heroimage.PNG"
import Modal from '../Componenets/Modal/Modal'
import { useContext } from 'react'
import { UserContext } from '../context/usercontext'
import { useNavigate } from 'react-router-dom'
import ProfileCard from '../Componenets/Cards/ProfileCard'
export default function LandingPage() {
    const{user}=useContext(UserContext)
    const navigate = useNavigate();
    const[openAuthModal,setAuthModal] = useState(false)
    const[currentPage,setcurrentPage] = useState("login")
    const handleCTA=()=>{
        if(!user){
            setAuthModal(true)
        }
        else{
            navigate("/dashbaord")
        }
    }
  return (
    <>
    <div className='w-full min-h-full bg-{#FFFCEF} pb-36'>
         <div className='w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left'></div>
         <div className='container mx-auto p-4 pt-6 pb-[200px] relative z-10'>
            <header className='flex justify-between items-center mb-16'>
                <div className='text-xl text-black font-bold'>
                    Interview Prep AI
                </div>
                {
                    user ? (<ProfileCard/>) : (<button className='bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white-500 px-7 py-3.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer' onClick={()=>setAuthModal(true)}>Login/SignUp</button>)
                }
                    </header>
            <div className='flex flex-col md:flex-row items-center'>
                <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
                    <div className='flex items-center justify-left mb-2'>
                        <div className='flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300'>
                           <LuSparkles/>AI Powered
                        </div>
                    </div>
                    <h1 className='text-5xl text-black font-medium mb-6 leading-tight'>
                        Ace Interview with <br/>
                        <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324_0%_,#FCD760_100%)] bg-[length:200%_200%] font-semibold animate-text-shine'>AI- Powered</span>{" "}
                        Learning
                    </h1>
                </div>
                <div className='w-full md:w-1/2'>
                    <p className='text-[17px] text-gray-900 mr-0 md:mr-20 mb-6'>
                        Get role specified questions, expand answers when you need them, die deepeer into concepts and organize everything
                        your way. From preparations to mastery- your ultimate interview toolkit is here.
                    </p>
                    <button className='bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colrs cursor-pointer ' onClick={handleCTA}>Get Started</button>
                </div>
            </div>
         </div>
      
    </div>
    <div className='w-full min-h-full relative z-10 mb-86'>
        <div className='flex items-center justify-center -mt-36'>
            <section className=''>
                <img src={HERO_IMG} alt="HeroImg" className='w-[80vw] rounded-lg'/>
            </section>
        </div>
        <div className='w-full min-h-full bg-[#FFFCEF] mt-10'>
             <div className='container mx-auto px-4 pt-10 pb-20'>
                <section className='mt-5'>
                    <h2 className='text-5xl font-medium text-center mb-12'>Features that make you shine</h2>
                    <div className='flex flex-col items-center gap-8'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
                            {
                                APP_FEATURES.slice(0,4).map((feature)=>{
                                    return <div key={feature.id} className='bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-l shadow-amber-100 transition border border-amber-100'>
                                        <h3 className='text-base font-semibold'>{feature.title}</h3>
                                        <p className='text-gray-600'>{feature.description}</p>
                                        </div>
                                })
                            }
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
                            {
                                 APP_FEATURES.slice(4).map((feature)=>{
                                    return <div key={feature.id} className='bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-l shadow-amber-100 transition border border-amber-100'>
                                        <h3 className='text-base font-semibold'>{feature.title}</h3>
                                        <p className='text-gray-600'>{feature.description}</p>
                                        </div>
                                })
                            }
                        </div>
                    </div>
                </section>
             </div>
        </div>
         <div className='text-sm bg-gray-50 text-secondary text-center p-5 mt-5'>
            Made with ❤️...Happy Coding
        </div>
    </div>
             <Modal isOpen={openAuthModal} onClose={()=>{
                 setAuthModal(false)
                 setcurrentPage("login")
             }} hideHeader>
                   <div>
                    {
                        currentPage == "login" && (
                            <Login setcurrentPage={setcurrentPage}/>
                        )
                    }
                     {
                        currentPage == "signup" && (
                            <SignUp setcurrentPage={setcurrentPage}/>
                        )
                    }
                   </div>
             </Modal>
    </>
  )
}
