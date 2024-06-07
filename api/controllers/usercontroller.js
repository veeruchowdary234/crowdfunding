import { errorHandler } from "../utils/error.js"
import bcrypt from "bcryptjs"
import User from "../model/usermodel.js"
export const update = async (req, res,next) => 
{
   if(req.user.id!==req.params.id)
   {
         return next(errorHandler(401, 'Unauthorizedid not vaild'));
   }
   if(req.body.password)
   {
     if(req.body.password.length<6)
     {
         return next(errorHandler(400, 'password must be atleast 6 characters'));
     }
     req.body.password=bcrypt.hashSync(req.body.password,10)
   }
   if(req.body.username)
   {
        if(req.body.username.length<3)
        {
            return next(errorHandler(400, 'username must be atleast 3 characters'));
        }
   }
     try 
    {
        const updateuser=await User.findByIdAndUpdate(req.params.id,{$set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                photo:req.body.photo
            },},{new:true})
            res.status(200).json(updateuser)
    } catch (error) {
            next(error)
        }
}

export const deletuser=async (req,res,next)=>
{
    if(!req.user.id!==req.params.id)
    {
        return next(errorHandler(401, 'Unauthorized not vaild'));
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user deleted')
    } catch (error) {
        next(error)
    }
}

export const signout=async (req,res,next)=>
{

    try {
        res.clearCookie('token').json('signout sucessful')
    } catch (error) 
    {
        next(error)
    }

}
export const getusers=async (req,res,next)=>
{
    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,'you are not authorized to get users'))
    }
    try {
        const startIndex=parseInt(req.query.startindex)||0;
        const limit=parseInt(req.query.limit)||9;
        const sortdirection=req.query.order=='asc'?1:-1;
        const users=await User.find().sort({createdAt:sortdirection}).skip(startIndex).limit(limit);
        const usserswithoutpassword=users.map((user)=>{
            const {password,...rest}=user._doc;
            return rest;
        }
        )
        const totalusers=await User.countDocuments();
        const now=new Date();
        const oneMonthAgo=new Date(now.setMonth(now.getMonth()-1));
        const lastMonthUsers=await User.countDocuments({createdAt:{$gte:oneMonthAgo}});
        res.status(200).json({
            success:true,
            users:usserswithoutpassword,
            totalusers,
            lastMonthUsers
        })
    } catch (error) 
     {
        next(error)
    }
}
export const admindeletuser=async (req,res,next)=>
{
    if(!req.user.isAdmin)
    {
        return next(errorHandler(401, 'Unauthorized not vaild'));
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user deleted')
    } catch (error) {
        next(error)
    }
}