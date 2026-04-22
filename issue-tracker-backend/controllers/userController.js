import User from '../models/userModal.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

const salt = 10;

export const register = async (req,res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })
        await user.save();
        return res.status(201).json({ 
            data: user,
            message: "User created successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const payload = {
            _id: user._id,
            email: user.email
        }
        const token = jsonwebtoken.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
        return res.status(200).json({token});
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}