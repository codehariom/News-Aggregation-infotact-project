import express from "express";
const router = express.Router();

// GET /api/articles
router.get("/", (req, res) => {
  res.json([
    { id: 1, title: "Demo Article 1", summary: "Summary one" },
    { id: 2, title: "Demo Article 2", summary: "Summary two" }
  ]);
});

export default router;
