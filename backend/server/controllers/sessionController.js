import {UserModel} from "../models/User.js"

import { SessionModel } from "../models/Session.js";
import { QuestionsModel } from "../models/Questions.js";

export const createSession=async(req,res)=>{
    try{
      //console.log("Create sEssion conroller")
       const {role,experience,topicsToFocus,description,questions} = req.body;
      // console.log(req.body)
       const userId = req.user?.id;
       console.log("USerIDforsEssion",userId)
       const session = await SessionModel.create({
        userId,
        role,experience,topicsToFocus,description
       })

        const questionDocs = await Promise.all(
          questions.map(async(q)=>{
              const question = await QuestionsModel.create({
                  sessionId : session._id,
                  question : q.question,
                  answer  :  q.answer,

              })
              return question._id;
          })
        )
         session.questions = questionDocs;
     
       await session.save();
       res.status(201).json({success : true, session})
    }
    catch(error){
      console.log(error)
              return res.status(500).json({success :false , message : error.message})
    }
}

export const getMySessions=async(req,res)=>{
    try{
      const userId= req.user?.id;
      const sessions = await SessionModel.find(userId)
      .sort({createdAt : -1})
      .populate("questions")
       res.status(201).json({success : true, sessions})
    }
    catch(error){
      console.log(error)
              return res.status(500).json({success :false,sessions,message :"Server Error"})
    }
}

export const getSessionById=async(req,res)=>{
   try{
          const session = await SessionModel.findById(req.params.id).populate({
              path: "questions",
              options: { sort: { isPinned: -1, createdAt: 1 } }
            });
      
          if(!session)
             return res.status(201).json({success : false, message: "Session not found" })
       return res.status(201).json({success : true, session})
    }
    catch(error){
              return res.status(500).json({success :false , message :"Server Error"})
    }
}

export const deleteSessionById=async(req,res)=>{
    try{
          const session = await SessionModel.findById(req.params.id)
         //  console.log("Session to be deleted",session)
          if(!session)
             return res.status(201).json({success : false, message: "Session not found" })
           //chck if logged in user own th esession
           
           if(session.userId.toString() !== req.user.id){
               return res.status(401).json({success : false, message: "Not authorize to delete session" })
           }
           //delete all question from session
            await QuestionsModel.deleteMany({sessionId : session._id})

            //delete the session

            await session.deleteOne(session._id)
       res.status(201).json({success : true, mesage : "Deleted sucessfulyy"})
    }
    catch(error){
      console.log(error)
              return res.status(500).json({success :false , message :"Server Error"})
    }
}