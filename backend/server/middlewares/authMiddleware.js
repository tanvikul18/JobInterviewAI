import jwt from "jsonwebtoken"
import { UserModel } from "../models/User.js"

export const protect=async(req,res,next)=>{
    try{
         let token = req.headers.authorization;
         
         if(token && token.startsWith("Bearer")){
           // console.log("Hits",token)
            token = token.split(" ")[1];
           // console.log("Tojken",token)
            const decode = jwt.verify(token,"7c0f93733274af589563c78b9d0e070a2f0f5931a7fcf328bd4a6c59a8ca1139da1698c106d55fa161dbb9622828cd15292359dee2b76432844fbc7f4aefd9e3")
           // console.log("Token",decode)
            req.user = decode;//UserModel.findById(decode.id).select("-password");
            console.log(req.user)
            next();
         }
         else{
             res.status(401).json({message: "Not auhtorized,no token"})
         }
    }
 
 catch(err){
       res.status(401).json({message: "token failed",error: err.message})
 }

}