// Backend/Routes/articleRoutes.js
import express from "express";
import {
  createArticle,
  listArticles,
  getArticle,
  updateArticle,
  updateArticleStatus,
  deleteArticle
} from "../Controllers/articleController.js";

const router = express.Router();

router.post("/", createArticle);                 // POST /api/articles
router.get("/", listArticles);                   // GET  /api/articles
router.get("/:id", getArticle);                  // GET  /api/articles/:id
router.put("/:id", updateArticle);               // PUT  /api/articles/:id
router.put("/:id/status", updateArticleStatus);  // PUT  /api/articles/:id/status
router.delete("/:id", deleteArticle);            // DELETE /api/articles/:id

export default router;
