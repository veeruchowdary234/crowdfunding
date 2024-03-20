import express from "express"

const Router=express.Router()

Router.get("/test",(req,res)=>
{
    res.json({"message":"hello"})
})

export default Router;