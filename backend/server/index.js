import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import {dirname} from "path"
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"
import questionRoutes from "./routes/questionRoutes.js"
import { protect } from "./middlewares/authMiddleware.js"
import {generateInterviewQuestion,generateConceptExplanation} from "./controllers/aiController.js"
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Middlewarres
app.use(cors(
    {
        origin : "*",
        methods :["GET","POST","PUT","DELETE"],
        allowedHeaders : ["Content-Type","Authorization"]
    }
))
app.use(express.json())

//Uploads
//app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}))
app.get("/",(req,res)=>{
    res.send("server is sucessfull")
})
connectDb();
//Auth Routes
app.use("/auth",authRoutes)
app.use("/session",sessionRoutes)
app.use("/question",questionRoutes)
app.use("/ai/generate-questions",generateInterviewQuestion)
app.use("/ai/generate-explanations",protect,generateConceptExplanation)
app.use('/uploads', express.static(path.join(process.cwd(),'server','uploads')));
console.log("Serving uploads from:", path.join(process.cwd(), 'server', 'uploads'));
const port = process.env.PORT  || 3000;
app.listen(3000,()=>{
    console.log("This is grest server is running on 3000")
})