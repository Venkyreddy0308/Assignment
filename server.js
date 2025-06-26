const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Venkyreddy$$0308',      // your password
  database: 'sum_app'
});

// Insert new result
app.post('/add', (req, res) => {
  const { input_number, result_sum, result_words } = req.body;
  db.query(
    'INSERT INTO calculations (input_number, result_sum, result_words) VALUES (?, ?, ?)',
    [input_number, result_sum, result_words],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send('Inserted');
    }
  );
});

// Fetch last 5 calculations
app.get('/latest', (req, res) => {
  db.query(
    'SELECT * FROM calculations ORDER BY calculated_at DESC LIMIT 5',
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
