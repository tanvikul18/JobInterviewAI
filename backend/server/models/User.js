import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
       
    },
     email:{
        type:String,
        
    }, 
    password:{
        type:String,
       
    },
     profileImageUrl:{
        type:String,
        default:null
    }
},
 {timestamps : true}
)

export const UserModel = mongoose.model('UserModel',UserSchema)