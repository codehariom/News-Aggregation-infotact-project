// Backend/Controllers/articleController.js
import mongoose from "mongoose";
import Article from "../Models/Article.model.js";
import { Source } from "../Models/source.model.js"; // adjust if your source export differs

// helper to validate ObjectId
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// POST /api/articles  -> create article
export const createArticle = async (req, res) => {
  try {
    const { title, summary, content, url, imageUrl, authorName, source, sourceDomain, tags, publishedAt } = req.body;
    if (!title || !url) return res.status(400).json({ message: "title and url required" });

    // optional: if source id provided, ensure exists
    if (source && !isValidId(source)) return res.status(400).json({ message: "Invalid source id" });

    const existing = await Article.findOne({ url });
    if (existing) return res.status(409).json({ message: "Article with this URL already exists" });

    const art = new Article({
      title, summary, content, url, imageUrl, authorName, source, sourceDomain, tags, publishedAt,
      status: req.body.status || "under_review"
    });

    await art.save();
    res.status(201).json(art);
  } catch (err) {
    console.error("createArticle error:", err);
    res.status(500).json({ message: "Failed to create article", error: err.message });
  }
};

// GET /api/articles  -> list, with pagination, search, filters
export const listArticles = async (req, res) => {
  try {
    let { page = 1, limit = 20, q, sourceDomain, status, sortBy = "createdAt", order = "desc", tag } = req.query;
    page = Number(page); limit = Number(limit);

    const query = {};
    if (q) query.$text = { $search: q };
    if (sourceDomain) query.sourceDomain = sourceDomain;
    if (status) query.status = status;
    if (tag) query.tags = tag;

    const sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    const [items, total] = await Promise.all([
      Article.find(query).sort(sort).skip((page - 1) * limit).limit(limit).lean(),
      Article.countDocuments(query)
    ]);

    res.json({
      data: items,
      meta: { total, page, limit, pages: Math.ceil(total / limit) }
    });
  } catch (err) {
    console.error("listArticles error:", err);
    res.status(500).json({ message: "Failed to list articles", error: err.message });
  }
};

// GET /api/articles/:id  -> details
export const getArticle = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid id" });

    const article = await Article.findById(id).populate("source", "name url reliabilityScore");
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    console.error("getArticle error:", err);
    res.status(500).json({ message: "Failed to get article", error: err.message });
  }
};

// PUT /api/articles/:id  -> update whole article
export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid id" });

    const updated = await Article.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Article not found" });
    res.json(updated);
  } catch (err) {
    console.error("updateArticle error:", err);
    res.status(500).json({ message: "Failed to update article", error: err.message });
  }
};

// PUT /api/articles/:id/status  -> update only status (review flow)
export const updateArticleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid id" });
    if (!status) return res.status(400).json({ message: "status required" });

    const updated = await Article.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: "Article not found" });
    res.json(updated);
  } catch (err) {
    console.error("updateArticleStatus error:", err);
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
};

// DELETE /api/articles/:id
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid id" });

    const deleted = await Article.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error("deleteArticle error:", err);
    res.status(500).json({ message: "Failed to delete article", error: err.message });
  }
};
