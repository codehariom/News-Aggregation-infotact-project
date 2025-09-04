import express from "express";
const router = express.Router();

// dummy data for now
router.get("/", (req, res) => {
  res.json([
    {
      id: "1",
      title: "Breaking News",
      summary: "Demo article",
      createdAt: new Date(),
      annotations: [
        { id: "a1", text: "This looks fake", createdAt: new Date() }
      ]
    }
  ]);
});

export default router;
