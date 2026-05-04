const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Template name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    thumbnail_url: {
      type: String,
      required: [true, 'Thumbnail URL is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Landing Page', 'Dashboard', 'E-Commerce', 'Portfolio', 'Blog', 'SaaS', 'Admin Panel'],
    },
    tags: [{ type: String }],
    isPremium: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    previewUrl: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    downloads: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Template', templateSchema);
