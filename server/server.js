const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read JSON files
async function readJsonFile(filename) {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    throw error;
  }
}

// Endpoints
app.get('/api/aniversariantes', async (req, res) => {
  try {
    const data = await readJsonFile('aniversariantes.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching birthday data' });
  }
});

app.get('/api/feriados', async (req, res) => {
  try {
    const data = await readJsonFile('feriados.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching holiday data' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 