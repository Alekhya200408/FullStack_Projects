import mongoose,{Schema} from "mongoose";

const UserModel=new Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

 const User=mongoose.model("User",UserModel)

 export default User