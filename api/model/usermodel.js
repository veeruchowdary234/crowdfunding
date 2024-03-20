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
     default:"https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account",
     required:true,
    },
},{timeStamps:true});

const User=mongoose.model("userd",userschema)
export default User