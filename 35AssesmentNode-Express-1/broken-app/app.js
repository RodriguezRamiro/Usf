const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Helper function to fetch user data
const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return {
      name: response.data.name,
      bio: response.data.bio,
    };
  } catch (error) {
    console.error(`Error fetching data for ${username}:`, error.message);
    throw new Error(`Failed to fetch data for ${username}`);
  }
};

// Route handler
app.post('/', async (req, res, next) => {
  try {
    const { developers } = req.body;

    if (!Array.isArray(developers) || developers.length === 0) {
      return res.status(400).json({ error: 'Developers array is required and cannot be empty' });
    }

    // Fetch data for all developers
    const results = await Promise.all(developers.map(fetchUserData));

    // Send JSON response
    return res.json(results);
  } catch (err) {
    next(err); // Pass the error to the error-handling middleware
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
