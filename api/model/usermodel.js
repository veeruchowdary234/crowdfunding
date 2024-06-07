import mongoose from "mongoose";

const userschema=mongoose.Schema({
    username:{
          type:String,
          required:true,
          unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
   },
   password:{
    type:String,
    required:true,
   },
    photo:{
     type:String,
     default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
     required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timeStamps:true});

const User=mongoose.model("userd",userschema)
export default User