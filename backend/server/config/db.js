import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export const connectDb=async()=>{
    try{
  await mongoose.connect("mongodb+srv://user_test:root_test@cluster0.auqnbcm.mongodb.net/interview?retryWrites=true&w=majority&appName=Cluster0",{})
  console.log("MONGO DB connected")
    }
    catch(err){
       console.log("Error connecting db",err)
    }

}