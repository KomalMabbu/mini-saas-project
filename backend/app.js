const express = require('express');
const app = express();
const pool = require('./db');
const redisClient = require("./redis");

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Backend API Running');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'backend',
  });
});


// Get all users from PostgreSQL
app.get('/users', async (req, res) => {
  try {
    // Check Redis first
    const cachedUsers = await redisClient.get("users");

    if (cachedUsers) {
      console.log("Serving from Redis Cache");
      return res.json(JSON.parse(cachedUsers));
    }

    console.log("Fetching from PostgreSQL");

    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");

    // Save to Redis for 60 seconds
    await redisClient.setEx(
      "users",
      60,
      JSON.stringify(result.rows)
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch users"
    });
  }
});


// Add new user to PostgreSQL
app.post('/add-user', async (req, res) => {
  try {
    const { name } = req.body;

    const result = await pool.query(
      'INSERT INTO users (name) VALUES ($1) RETURNING *',
      [name]
    );

    // Clear Redis cache after new user added
    await redisClient.del("users");

    res.status(201).json({
      message: 'User added successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to add user',
    });
  }
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});