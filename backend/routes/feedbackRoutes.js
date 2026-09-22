const express = require('express');
const Feedback = require('../models/Feedback');

const router = express.Router();
const demoFeedback = [];

function databaseConnected() {
  return Feedback.db.readyState === 1;
}

router.get('/', async (req, res) => {
  if (!databaseConnected()) {
    res.json(demoFeedback);
    return;
  }

  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 }).lean();
    res.json(feedback);
  } catch (error) {
    console.error('Could not fetch feedback:', error.message);
    res.status(500).json({ message: 'Could not load feedback right now.' });
  }
});

router.post('/', async (req, res) => {
  if (!databaseConnected()) {
    const feedback = new Feedback({
      name: req.body.name,
      rating: Number(req.body.rating),
      comments: req.body.comments
    });

    try {
      await feedback.validate();
      const demoItem = {
        _id: `demo-${Date.now()}`,
        name: feedback.name,
        rating: feedback.rating,
        comments: feedback.comments,
        createdAt: new Date().toISOString()
      };
      demoFeedback.unshift(demoItem);
      res.status(201).json(demoItem);
    } catch (error) {
      const message = Object.values(error.errors)
        .map((validationError) => validationError.message)
        .join(' ');
      res.status(400).json({ message });
    }
    return;
  }

  try {
    const feedback = await Feedback.create({
      name: req.body.name,
      rating: Number(req.body.rating),
      comments: req.body.comments
    });

    res.status(201).json(feedback);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors)
        .map((validationError) => validationError.message)
        .join(' ');
      res.status(400).json({ message });
      return;
    }

    console.error('Could not save feedback:', error.message);
    res.status(500).json({ message: 'Could not save feedback right now.' });
  }
});

module.exports = router;
