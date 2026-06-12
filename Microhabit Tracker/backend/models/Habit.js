import mongoose,{Schema, Types} from "mongoose";


const habitSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
        },
    streak:{
        type:Number,
        default:0
    },
    completedDates:{
        type:[Date],
        default:[]
    }

},
{
    timestamps:true
})

const Habit=mongoose.model("Habit",habitSchema)
export default Habit