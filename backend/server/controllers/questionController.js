import {UserModel} from "../models/User.js"

import { SessionModel } from "../models/Session.js";
import { QuestionsModel } from "../models/Questions.js";

export const addQuestionstoSession=async(req,res)=>{
    try{
       const {sessionId,questions} = req.body;
        if(!sessionId || !questions || !Array.isArray(questions))
              res.status(400).json({success : true, message: "Invalid Data"})
        const session = await SessionModel.findById(sessionId)    
        if(!session)
              res.status(404).json({success : true, message: "Session not found"})
        const createdQuestions = await QuestionsModel.insertMany(
            questions.map((q)=>({
                session : sessionId,
                question : q.question,
                answer:q.answer
            }))
        )

        session.questions.push(...createdQuestions.map(q=>q.id))
        await session.save()
       res.status(201).json(createdQuestions)
    }
    catch(err){
        console.log(err)
              return res.status(500).json({success :false , message :"Server Error"})
    }
}

export const togglePinQuestion=async(req,res)=>{
    try{
  
      const question = await QuestionsModel.findById(req.params.id);
    //  console.log("Question",question)
      if(!question)
         return res.status(404).json({success :false , message :"No Question found"})
      const updatedQuestion = await QuestionsModel.findByIdAndUpdate(
      question._id,
      { isPinned: !question.isPinned}, // assumes your schema has a `pinned` field
      { new: true }
    );
     return res.status(200).json({updatedQuestion,message:"Question Pinned sucessfully"})
    }
    catch(err){
        console.log(err)
              return res.status(500).json({success :false , message :"Server Error"})
    }
}

// export const updateQuestionNote=async(req,res)=>{
//    try{
//          const {note} = req.body;
//          const question =  await QuestionsModel.findById(req.params.id);

//           if(!question)
//              return res.status(404).json({success : false, message: "Question not found" })
//         question.note= note || "";
//         await question.save();
//        res.status(201).json({success : true, question})
//     }
//     catch(err){
//               return res.status(500).json({success :false , message :"Server Error"})
//     }
// }

