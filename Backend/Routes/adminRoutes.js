// Backend/Routes/adminRoutes.js
import express from "express";
import { approveArticle, rejectArticle, approveFactCheck, rejectFactCheck } from "../Controllers/adminController.js";

const router = express.Router();

// ✅ Approve Article
router.put("/articles/:id/approve", approveArticle);

// ✅ Reject Article
router.put("/articles/:id/reject", rejectArticle);

// ✅ Approve FactCheck
router.put("/fact-checks/:id/approve", approveFactCheck);

// ✅ Reject FactCheck
router.put("/fact-checks/:id/reject", rejectFactCheck);

export default router;
