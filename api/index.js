import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userroutes.js";
import authrouter from "./routes/authroutes.js";
const app=express();

mongoose.connect("mongodb+srv://veerumedikonduru999:veeru@estatecluster.y3zfemg.mongodb.net/?retryWrites=true&w=majority&appName=estatecluster").then(()=>
{
    {console.log("database connected")}
})
app.use(express.json())
app.use("/api/user/",userRouter)
app.use("/api/auth",authrouter)
app.use((err,req,res,next)=>
{
    const statuscode=err.statusCode||500;
    const message=err.message||'internal server error';
    res.status(statuscode).json({
        sucess:false,
        statuscode,
        message
    })
})
app.listen(3000,()=>
{
    console.log("server listening from port 3000")
})
