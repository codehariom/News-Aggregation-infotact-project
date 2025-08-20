const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    reliabilityScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    factCheckAccuracy: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

sourceSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Source', sourceSchema);


