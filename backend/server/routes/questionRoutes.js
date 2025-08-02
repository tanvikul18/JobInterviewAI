import express from "express"
import {addQuestionstoSession,togglePinQuestion} from "../controllers/questionController.js"
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
 
router.post("/add",protect,addQuestionstoSession)
router.post("/pin/:id",protect,togglePinQuestion)
//router.post("/:id/note",protect,updateQuestionNote)


export default router;