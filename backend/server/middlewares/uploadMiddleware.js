import multer from "multer"
import path from "path"
const storage= multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(process.cwd(),"server", "uploads"))
    },
    filename:(req,file,cb)=>{
      cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter=(req,file,cb)=>{
const allowedtypes=['image/jpeg','image/png']
if(allowedtypes.includes(file.mimetype))
{
    cb(null,true)
}
else{
    cb(new Error("Please enter valid image format"),false)
}
}
export const upload = multer({storage,fileFilter})