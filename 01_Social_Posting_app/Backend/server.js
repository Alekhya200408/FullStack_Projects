import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import Dbconnection from "./db/Db_conn.js"
import router from "./routes/post.routes.js"
import authrouter from "./routes/auth.routes.js"

const app=express()

dotenv.config({
    path:"./.env"
})

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/api/posts", router)
app.use("/auth",authrouter)
app.get("/",(req,res)=>{
    res.send(`Server is Running`)
})



Dbconnection()
.then(()=>{
    app.listen(process.env.PORT||3000,()=>{
    console.log(`App is running on port 3000`);
    
    })
})
.catch((err)=>{
    console.log("MongoDb connection Error",err);
    
})






