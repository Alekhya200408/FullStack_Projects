import User from "../models/User";
import bcrypt from "bcryptjs"

const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body

        // User existence checking()
        const userExist=await User.findOne({email})

        if (userExist) {
            return res.status(400).json({
                message:"User Already Exist"
            })
        }

        // for hashing password
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        
        // create User
        const user=User.create({
            name,
            email,
            password:hashedPassword,
        })

        res.status(201).json({
            success:true,
            message:"User Registered",
            user:{
                id: user._id,
                name:user.name,
                email:user.email,
                xp:user.xp,
                level:user.level,
            }
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}

module.exports={
    registerUser,
}
