const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    match: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Match',
    },
    rating: {
      type: Number,
      required: true,
      min: 0.5,
      max: 5,
    },
    // Notes détaillées optionnelles
    detailedRatings: {
      excitement: { type: Number, min: 0.5, max: 5 },
      quality: { type: Number, min: 0.5, max: 5 },
      importance: { type: Number, min: 0.5, max: 5 },
    },
    title: {
      type: String,
      maxlength: 100,
    },
    text: {
      type: String,
      required: true,
      minlength: 1,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    // Indique si cet avis contient des spoilers
    containsSpoilers: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Un utilisateur ne peut avoir qu'un seul avis par match
reviewSchema.index({ user: 1, match: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;