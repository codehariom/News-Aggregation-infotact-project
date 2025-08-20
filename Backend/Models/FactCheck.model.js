const mongoose = require('mongoose');

const factCheckSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      trim: true,
    },
    evidence: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'investigating', 'verified', 'false'],
      default: 'pending',
      index: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    verificationDate: {
      type: Date,
      default: null,
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    upvotes: {
      type: Number,
      default: 0,
      min: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
      min: 0,
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

factCheckSchema.index({ title: 'text', content: 'text', evidence: 'text' });

module.exports = mongoose.model('FactCheck', factCheckSchema);


