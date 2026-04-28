import mongoose from "mongoose";
import {Db_name} from "../constants.js"
const Dbconnection=async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${Db_name}`)
        console.log("Mongodb Connected");
        
    } catch (error) {
        console.error("DB Error:", error.message)
        process.exit(1)
    }
}
export default Dbconnection