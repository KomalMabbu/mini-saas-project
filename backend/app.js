const express = require('express');
const app = express();

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

app.get('/users', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Demo User',
    },
  ]);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});