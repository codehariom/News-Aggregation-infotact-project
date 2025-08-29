import mongoose from "mongoose"

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
    sourceUrl: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'Other',
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    publishDate: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['submitted', 'approved', 'rejected'],
      default: 'submitted',
      index: true,
    },
    readTimeMinutes: {
      type: Number,
    },
  },
  { timestamps: true }
);

articleSchema.index({ title: 'text', summary: 'text', content: 'text' });

export const Article = mongoose.model('Article', articleSchema);


