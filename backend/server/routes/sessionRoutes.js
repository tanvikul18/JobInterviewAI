import express from "express"
import {createSession,getMySessions,getSessionById,deleteSessionById} from "../controllers/sessionController.js"
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
 
router.post("/create",protect,createSession)
router.get("/get-mysession",protect,getMySessions)
router.get("/:id",protect,getSessionById)
router.delete("/:id",protect,deleteSessionById)

export default router;