import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


registering
export default async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(404).json({ message: "All fields are required" });
        }
        const existingUser = await User.findone({ username });

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