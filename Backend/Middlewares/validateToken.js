import jwt from "jsonwebtoken";
import { User } from "../Models/User.model.js";

export const authenticateUser = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false, 
                message: "Access denied. No token provided." 
            });
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.substring(7);

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Access denied. No token provided." 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.Jwt_Secret);
        
        // Find user by id
        const user = await User.findById(decoded.id).select("-passwordHash");
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token. User not found." 
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(401).json({ 
                success: false, 
                message: "Account is deactivated." 
            });
        }

        // Add user to request object
        req.user = user;
        next();

    } catch (error) {
        console.error("Token verification error:", error);
    }
};
