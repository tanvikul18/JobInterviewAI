import express from "express"
import {signNewUser,loginUser,getUserProfile} from "../controllers/authController.js"
import {protect} from "../middlewares/authMiddleware.js"
import { upload } from "../middlewares/uploadMiddleware.js";
const router = express.Router();
 
router.post("/signup",signNewUser)
router.post("/login",loginUser)
router.get("/profile",protect,getUserProfile)
router.post("/upload-image",upload.single("file"),(req,res)=>{
    if(!req.file)
         return res.status(400).json({message: "No files uploaded"})
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`  
   // console.log("ImageUrl",imageUrl)
    if(!imageUrl)
          return res.status(400).json({message: "Error in uloading file"})
     return res.status(200).json({imageUrl})  
})
export default router;