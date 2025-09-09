import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    verdict: {
      type: String,
      enum: ["true", "false", "mixed", "unverified"],
      required: true,
    },
    evidence: [String], // links/screenshots URLs
  },
  { _id: false }
);

const factCheckSchema = new mongoose.Schema(
  {
    article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" }, // optional
    sourceDomain: String, // example.com
    claims: { type: [claimSchema], default: [] },
    confidence: { type: Number, min: 0, max: 100, default: 50 },
    notes: String,
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    votes: {
      up: { type: Number, default: 0 },
      down: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("FactCheck", factCheckSchema);
