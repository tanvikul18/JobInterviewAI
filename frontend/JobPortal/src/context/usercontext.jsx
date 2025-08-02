import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const[user,setUser]=useState(null);
    const[loading,setLoading]=useState(false)
    useEffect(()=>{
        if(!user)
             return;
         const token = JSON.parse(localStorage.getItem("token"));
         if(!token) 
         {
            setLoading(false)
            return;
         }
         const fetchData=async()=>{
            try{
              const response =  await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
              setUser(response.data)
            }
            catch(err){
                console.error("USer not authenticatd",err)
                clearUser();
            }
         }
         fetchData()
    },[])
    const updateUser=(userData)=>{
         setUser(userData)
         localStorage.setItem("token",JSON.stringify(userData.token))
         setLoading(false)
    }
    const clearUser=()=>{
         setUser(null)
         localStorage.removeItem("token")
    }

    return <UserContext.Provider value={{user,loading,updateUser,clearUser}}>
        {children}
    </UserContext.Provider>
}