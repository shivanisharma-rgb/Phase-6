const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 60
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comments: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 500
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
