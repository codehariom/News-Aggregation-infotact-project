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
    claim: { type: String, required: true, trim: true },
    verdict: { type: String, enum: ["true", "false", "misleading", "unverified"], default: "unverified" },
    evidence: { type: String, trim: true },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

// ✅ Overwrite error avoid karne ka fix
export default mongoose.models.FactCheck || mongoose.model("FactCheck", factCheckSchema);
