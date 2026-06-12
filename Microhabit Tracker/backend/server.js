import express from "express"
import connDB from "./config/db.js"
import dotenv from "dotenv"
import  cors from "cors"
import authRouter from "../backend/routes/authRoutes.js"


dotenv.config()


const app=express()
const PORT=process.env.PORT||5000

connDB()

app.use("/api/auth", authRouter);
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("MicroHabit Tracker API is Running")
})


app.listen(PORT,()=>{
    console.log(`App is Running on port ${process.env.PORT}`);
    
})