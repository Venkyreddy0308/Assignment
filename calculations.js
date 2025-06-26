const express = require('express');
const router = express.Router();
const db = require('../db');

// 📥 POST /add — Add a new calculation to the database
router.post('/add', (req, res) => {
  const { input_number, result_sum, result_words } = req.body;

  if (
    typeof input_number !== 'number' ||
    typeof result_sum !== 'number' ||
    typeof result_words !== 'string'
  ) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  const query = `
    INSERT INTO calculations (input_number, result_sum, result_words)
    VALUES (?, ?, ?)
  `;

  db.query(query, [input_number, result_sum, result_words], (err) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Database error');
    }
    res.status(200).send('Calculation saved successfully');
  });
});

// 📤 GET /latest — Fetch the last 5 calculations
router.get('/latest', (req, res) => {
  const query = `
    SELECT * FROM calculations
    ORDER BY calculated_at DESC
    LIMIT 5
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

module.exports = router;
