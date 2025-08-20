import mongoose from "mongoose"

const annotationSchema = new mongoose.Schema(
  {
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
    },
    url: {
      type: String,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

annotationSchema.index({ comment: 'text', tags: 1 });

export const Annotation = mongoose.model('Annotation', annotationSchema);


