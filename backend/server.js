const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API Routes
app.get('/api/tests', (req, res) => {
  try {
    const questionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'questions.json'), 'utf8'));
    const categories = Object.keys(questionsData);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load categories' });
  }
});

app.get('/api/tests/:category', (req, res) => {
  try {
    const { category } = req.params;
    const questionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'questions.json'), 'utf8'));

    if (!questionsData[category]) {
      return res.status(404).json({ error: 'Category not found' });
    }

    let categoryQuestions = questionsData[category];
    // Shuffle and take 3-4 random questions
    categoryQuestions = categoryQuestions.sort(() => 0.5 - Math.random());
    const numQuestions = Math.floor(Math.random() * 2) + 3; // 3 or 4
    const selectedQuestions = categoryQuestions.slice(0, numQuestions);

    res.json(selectedQuestions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load questions' });
  }
});

app.post('/api/results', (req, res) => {
  try {
    const result = req.body;
    // In a real application, you would save to a database
    // For now, we'll just log it and return success
    console.log('Result received:', result);
    res.json({ success: true, message: 'Result saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save result' });
  }
});

// Serve frontend for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});