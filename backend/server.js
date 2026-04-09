const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.POSTGRES_DB || 'fasttest',
  user: process.env.POSTGRES_USER || 'fasttest',
  password: process.env.POSTGRES_PASSWORD || 'fasttest123',
});

app.use(cors());
app.use(express.json());

app.get('/api/tests', async (req, res) => {
  try {
    const result = await pool.query('SELECT name FROM categories ORDER BY name');
    res.json(result.rows.map(row => row.name));
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to load categories' });
  }
});

app.get('/api/tests/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const catResult = await pool.query(
      'SELECT id FROM categories WHERE name = $1',
      [category]
    );
    
    if (catResult.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    const categoryId = catResult.rows[0].id;
    
    const questionsResult = await pool.query(
      'SELECT id, pergunta, opcoes, resposta_correta, explicacao FROM questions WHERE category_id = $1',
      [categoryId]
    );
    
    const shuffled = questionsResult.rows.sort(() => 0.5 - Math.random());
    const numQuestions = Math.floor(Math.random() * 2) + 3;
    const selectedQuestions = shuffled.slice(0, numQuestions);
    
    res.json(selectedQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to load questions' });
  }
});

app.post('/api/results', async (req, res) => {
  try {
    const { category, score, total } = req.body;
    
    await pool.query(
      'INSERT INTO results (category, score, total) VALUES ($1, $2, $3)',
      [category, score, total]
    );
    
    res.json({ success: true, message: 'Result saved' });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ error: 'Failed to save result' });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});