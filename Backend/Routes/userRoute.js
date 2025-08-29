import express from "express";
import { loginUser, registerUser, userLogout, userProfile, editProfile } from "../Controllers/userControllers.js";
import { authenticateUser } from "../Middlewares/validateToken.js";

const router = express.Router();


// route post /api/user/register 
// @desc Register a new user 
// @access public
router.post("/register", registerUser)

// route post /api/user/login 
// @desc Login user 
// @access public
router.post("/login", loginUser)

// route get /api/user/userProfile 
// @desc Get user profile 
// @access private
router.get("/userProfile", authenticateUser, userProfile)

// route post /api/user/logout 
// @desc Logout user 
// @access private
router.post("/logout", authenticateUser, userLogout)

// route put /api/user/edit-profile 
// @desc Edit user profile (password only)
// @access private
router.put("/edit-profile", authenticateUser, editProfile)

export default router;