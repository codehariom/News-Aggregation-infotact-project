import expressAsyncHandler from "express-async-handler"
import {User} from "../Models/User.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

//env config
dotenv.config()

export const registerUser = expressAsyncHandler(async(req,res)=>{
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password

    // all field validation 

    if(!username || !email || !password){
        return res.status(400).json({message:"All fields Required"})
    }

    const userExist = await User.findOne({email})
    if(userExist){
        return res.status(400).json({message:"User already registered"})
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({
        email, username, password: hashedPassword
    })

    return res.status(201).json({
        message: "User Registered Successfully",
        user: {
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
        },
    });
})


// Login User
export const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "Email not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
        { id: user._id, email: user.email  },
        process.env.Jwt_Secret,
        { expiresIn: process.env.Jwt_timeout || "24h" } // Fallback to 1 hour
    );

    // Return user data and token
    return res.status(200).json({
        user: {
            id: user._id,
            email: user.email,
            role:user.role,
            name: user.name, // Include additional fields as needed
        },
        token,
    });
});

// user profile
export const userProfile = expressAsyncHandler(async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user._id) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        }

        // Fetch user from MongoDB
        const user = await User.findById(req.user._id).select(
            "username email role"
        );

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        // Return user data
        res.json({
            success: true,
            data: {
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// user logout
export const userLogout = expressAsyncHandler(async (req, res) => {
    try {
        // check if user is authenticated
        if (!req.user) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        }
        // clear authentitcation cokkie or remove jwt secret
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        });

        res.json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Error during logout", error);
        res.status(500).json({ message: "server Error", success: false });
    }
});

// Edit user profile
export const editProfile = expressAsyncHandler(async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user._id) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        }

        const { username, email, password } = req.body;

        // Validate that username and email are not being modified
        if (username !== undefined) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Username cannot be modified" 
                });
        }

        if (email !== undefined) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Email cannot be modified" 
                });
        }

        // Validate password if provided
        if (!password) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Password is required for profile update" 
                });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Password must be at least 6 characters long" 
                });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { 
                password: hashedPassword,
                lastActive: new Date()
            },
            { new: true, runValidators: true }
        ).select("username email role joinDate lastActive");

        if (!updatedUser) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            message: "Profile updated successfully",
            data: {
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
                joinDate: updatedUser.joinDate,
                lastActive: updatedUser.lastActive
            }
        });

    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error while updating profile" 
        });
    }
});
