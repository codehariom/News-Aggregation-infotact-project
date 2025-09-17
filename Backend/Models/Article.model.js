// Backend/Models/Article.model.js
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    summary: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    content: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    authorName: {
      type: String,
    }, // optional plain name
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }, // optional ref

    // source info
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Source",
    },
    sourceDomain: {
      type: String,
    }, // e.g., bbc.com

    category: {
      type: String,
      default: "Other",
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    language: {
      type: String,
      default: "en",
    },

    // status
    status: {
      type: String,
      enum: ["draft", "under_review", "published", "rejected", "removed"],
      default: "under_review",
      index: true,
    },

    // metadata
    reliabilityScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 50,
    },
    annotationsCount: {
      type: Number,
      default: 0,
    },
    readTimeMinutes: {
      type: Number,
    },

    // dates
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

// 🔎 Text index for searching
articleSchema.index({ title: "text", summary: "text", content: "text" });

export default mongoose.model("Article", articleSchema);
