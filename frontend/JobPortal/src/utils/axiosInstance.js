import axios from "axios"
import { BASE_URL } from "./apiPaths"

export const axiosInstance = axios.create({
    baseURL : BASE_URL,
    headers:{
        "Content-Type" : "application/json",
        Accept  : "application/json"
    }
})

axiosInstance.interceptors.request.use((config)=>{
    const accessToken = JSON.parse(localStorage.getItem("token"))
    console.log("acesstoken",accessToken)
    if(accessToken){ 
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;

},
(error)=>{
    return Promise.reject(error)
}
)

axiosInstance.interceptors.response.use((response)=> {
    return response
},
(error)=>{
   if(error.response){
     if(error.response.status === 401){
           window.location.href= "/"
     }
     if(error.response.status === 500){
          console.error("Server error")
     }
   }
   return Promise.reject(error)
})