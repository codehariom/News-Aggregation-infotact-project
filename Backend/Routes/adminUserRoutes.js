// Backend/Routes/adminUserRoutes.js
import express from "express";
import {
  getAllUsers,
  promoteToAdmin,
  demoteToUser,
  deleteUser,
} from "../Controllers/adminController.js";

const router = express.Router();

// saare users list karo
router.get("/", getAllUsers);

// promote → admin
router.put("/:id/promote", promoteToAdmin);

// demote → normal user
router.put("/:id/demote", demoteToUser);

// delete user
router.delete("/:id", deleteUser);

export default router;
