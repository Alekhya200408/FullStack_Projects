import mongoose,{Schema} from "mongoose";
import { use } from "react";

const userSchema=new Schema({
    name:{
        type:String,
        required:true
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
    xp:{
        type:Number,
        default:0
    },
    level:{
        type:Number,
        default:1
    },

},
{
    timestamps:true
})

const User=mongoose.model("User",userSchema)
export default User