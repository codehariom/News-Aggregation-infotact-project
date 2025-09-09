import express from "express";
import { getFactChecks, submitFacts } from "../Controllers/factCheckController.js";

const router = express.Router();

// GET -> /api/fact-checking
router.get("/fact-checking", getFactChecks);

// POST -> /api/submit-facts
router.post("/submit-facts", submitFacts);

export default router;
