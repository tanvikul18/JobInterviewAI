import { axiosInstance } from "./axiosInstance";
import { API_PATHS } from "./apiPaths";
const ImageUpload = async(imageFile)=>{
    console.log(imageFile)
  const formdata = new FormData();
  formdata.append("file",imageFile);
  try{
       const response =await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formdata,{
        headers:{
            'Content-Type':"multipart/form-data"
        }
       });
       return response.data;

  }
  catch(err){
    console.log(err)
        console.error("Error uploading image file")
  }
}

export default ImageUpload;