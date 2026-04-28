import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


// registering
export const register= async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(404).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            res.status(404).json({ message: "User already exist" });
        }

        const hassedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hassedPassword
        });
        res.status(200).json({ user, message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: "Something Went wrong" });
    }

};

// login
export const login=async (req,res) => {
 try {
     const {username,password}=req.body;
   
     if (!username||!password) {
       res.status(400).json({message:"All fields are required"})
     }
   
     const user =await User.findOne({username})
     if (!user) {
       res.status(400).json({message:"Invalid Credentials"})
     }
     const isMatch=await bcrypt.compare(password,user.password)
   
     if (!isMatch) {
       res.status(400).json({message:"Invalid Credentials"})
     }
   
     const token = jwt.sign(
         { id: user._id, username: user.username },
         process.env.JWT_SECRET,
         { expiresIn: "1d" }
       )
       res.status(200).json({token})
 } catch (error) {
    res.status(404).json({message:"Something went wrong"})
 }
}