import mongoose from "mongoose"

const SessionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "UserModel"
    },
     role:{
        type:String,
        
    }, 
    experience:{
        type:String,
       
    },
     topicsToFocus:{
        type: String,
        
    },
     description:{
        type:String,
       
    },
    questions : [{
         type: mongoose.Schema.Types.ObjectId,
        ref : "QuestionsModel"
     }]
},
 {timestamps : true}
)

export const SessionModel = mongoose.model('SessionModel',SessionSchema)