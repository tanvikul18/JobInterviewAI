import {UserModel} from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const generateJWTToken = (userId)=>{
 return jwt.sign({id: userId},"7c0f93733274af589563c78b9d0e070a2f0f5931a7fcf328bd4a6c59a8ca1139da1698c106d55fa161dbb9622828cd15292359dee2b76432844fbc7f4aefd9e3",{"expiresIn" : "6days"})
}
export const signNewUser=async(req,res)=>{
    try{
      //  console.log("sign in user")
         const{name,email,password,profileImageUrl} = req.body;
         console.log(name,email,password,profileImageUrl)
         if(!name || !email || !password || !profileImageUrl)
             return res.status(404).json({message : "Please enter all details"})
         //chek if user exists
         const exixstUser = await UserModel.findOne({email});
        
         console.log(exixstUser)
         if(exixstUser)
            return res.status(401).json({message : "User already exists"})
        const hasedPassword = await bcrypt.hash(password,10)
         const user = await UserModel.create({name,email,password:hasedPassword,profileImageUrl}) ;
         console.log("created user", user)
         if(user)  
             return res.status(200).json({message : "User created sucessfully",user,token:generateJWTToken(user._id)})

    }
    catch(err){
              return res.status(500).json({message : "User already exists",error: err.message})
    }
}

export const loginUser=async(req,res)=>{
    try{
       // console.log("login user")
          const{email,password} = req.body;
        //  console.log(email,password)
          if(! email || ! password)
            return  res.status(401).json({message : "Enter valid credentails"})
          const userExits = await UserModel.findOne({email});
       //   console.log(userExits)
          if(userExits)
          {
               const isMatch =   bcrypt.compare(password , userExits.password);
               if(isMatch){
                  return res.status(200).json({message : "User login sucessfully",user :userExits, token:generateJWTToken(userExits._id) })
               }
               else{
                   return  res.status(401).json({message : "Enter valid credentails"})
               }
          }
          else{
            return  res.status(401).json({message : "Enter valid credentails"})
          }
    }
    catch(err){
         return res.status(500).json({error: err.message})
    }
}

export const getUserProfile=async()=>{
    try{
         const user = await UserModel.findById(req.user.id).select("-password")
         if(!user)
             return res.status(401).json("User not found")
         return res.json(user)   
    }
     catch(err){
         return res.status(500).json({message : "User already exists",error: err.message})
    }
}

