import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


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
        const user=await User.create({
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

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body

        const user=await User.findOne({email})

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password",
            });
        }

        const ismatch= await bcrypt.compare(password,user.password)

        if(!ismatch){
            return res.status(400).json({
                message: "Invalid Email or Password",
            });
        }
        const token=jwt.sign(
            {
                id:user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        )
        console.log(req.body);
        console.log(user);

        res.status(201).json({
            success:true,
            message:"User LogedIn",
            token,
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
      message: error.message,
    });
    }
}

export  {registerUser,loginUser}
