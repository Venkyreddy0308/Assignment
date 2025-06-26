const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import and use routes
const calcRoutes = require('./routes/calculations');
app.use('/', calcRoutes);

// Test DB connection
const db = require('./db');
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// Start the server
app.listen(3001, () => {
  console.log('🚀 Server running on http://localhost:3001');
});
