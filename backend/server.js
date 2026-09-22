require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
const port = process.env.PORT || 3000;
const frontendPath = path.join(__dirname, '..', 'frontend');

app.use(express.json());
app.use(express.static(frontendPath));

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'demo'
  });
});

app.use('/api/feedback', feedbackRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'feedback.html'));
});

app.get('/feedback', (req, res) => {
  res.sendFile(path.join(frontendPath, 'feedback.html'));
});

app.get('/feedback.html', (req, res) => {
  res.sendFile(path.join(frontendPath, 'feedback.html'));
});

app.get('/all-feedback', (req, res) => {
  res.sendFile(path.join(frontendPath, 'all-feedback.html'));
});

app.get('/all-feedback.html', (req, res) => {
  res.sendFile(path.join(frontendPath, 'all-feedback.html'));
});

async function startServer() {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is missing. Database actions are disabled.');
  } else {
    mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
      .then(() => console.log('Connected to MongoDB.'))
      .catch((error) => console.error('MongoDB connection failed. Start MongoDB or add a MongoDB Atlas URI in backend/.env:', error.message));
  }

  app.listen(port, () => {
    console.log(`Student Feedback Manager running at http://localhost:${port}`);
  });
}

startServer();
