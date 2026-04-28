import mongoose,{Schema} from "mongoose";

const PostSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        trim:true
    },
    content:{
        type:String,
        required:[true,"Content is required"]
    },
    likes:{
        type:Number,
        default:0
    },
    unlikes:{
        type:Number,
        default:0
    },
    likedBy:[String]
},{
    timestamps:true
})

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel