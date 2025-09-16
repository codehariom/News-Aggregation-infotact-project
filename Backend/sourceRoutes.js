import express from "express";
import { getSources, addSource } from "../Controllers/sourceController.js";

const router = express.Router();

// ✅ GET -> /api/sources
router.get("/", getSources);

// ✅ POST -> /api/sources
router.post("/", addSource);

export default router;
