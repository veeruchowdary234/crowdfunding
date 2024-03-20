import bcrypt from "bcryptjs"
import User from "../model/usermodel.js"
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";
export const signup=async (req,res,next)=>
{
    const {username,email,password}=req.body
    if(!username||!email||!password)
    {
      return next(errorHandler(400, 'All fields are required'));
    }
    const hashedpassword=bcrypt.hashSync(password,10)
    const newUser=new User({username,email,password:hashedpassword})

   try {
      await newUser.save();
      res.json("signup sucessful")
   } catch (error) {
      next(error);
   }
}

export const signin=async (req,res,next)=>
{
       const {email,password}=req.body;
       if(!email||!password)
       {
         return next("all fields are required");
       }
   
       try {
         const validuser=await User.findOne({email})         
         if(!validuser)
         {
          return next(errorHandler(404, 'User not found'));
         }
         const validpass=bcrypt.compareSync(password,validuser.password)
         if(!validpass)
         {
          return next(errorHandler(400, 'Invalid password'));
         }
         const token=jwt.sign({id:validuser._id},"abc123");
         return res.status(200).cookie('token',token,{ 
          httpOnly:true,
         }).json(validuser)   
       } catch (error) {
         next(error)
       }
}

export const google=async (req,res,next)=>{
  try {
    const {name,email,photo}=req.body;
    const user=await User.findOne({email})
    if(user)
    {
      const token=jwt.sign({id:user._id},"abc123");
      return res.status(200).cookie('token',token,{ 
        httpOnly:true,
       }).json(user) 
    }
    else
    {
      const generatepassword=Math.random().toString(36).substring(7);
      const hashedpassword=bcrypt.hashSync(generatepassword,10)
      const newUser=new User({username:name,email,password:hashedpassword,photo})
      await newUser.save();
      const token=jwt.sign({id:newUser._id},"abc123");
      return res.status(200).cookie('token',token,{ 
        httpOnly:true,
       }).json(newUser) 
    }
  }
  catch (error) {
    next(error)
  }
}
