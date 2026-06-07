import mongoose from "mongoose";

const Db_name="MicroHabitTracker"
const connDB=async()=>{
    try {
        //  console.log("MONGO_URI =", process.env.MONGO_URI)
        await mongoose.connect(`${process.env.MONGO_URI}/${Db_name}`)

        console.log("MongoDB connected");
        
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

export default connDB