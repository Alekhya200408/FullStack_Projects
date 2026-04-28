import mongoose,{Schema} from "mongoose";

const PostSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:[true,"Content is required"]
    },
    likes:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel