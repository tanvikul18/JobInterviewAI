import mongoose from "mongoose"

const QuestionsSchema = new mongoose.Schema({
    sessionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "SessionModel"
    },
     question:{
        type:String,
       
    }, 
    answer:{
        type:String,
       
    },
     note:{
        type:String,
       
    },
      isPinned:{
        type: Boolean,
        default :false
       
    }
},
 {timestamps : true}
)

export const QuestionsModel = mongoose.model('QuestionsModel',QuestionsSchema)