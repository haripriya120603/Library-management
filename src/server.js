const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Replace 'YOUR_API_KEY' with your actual API key obtained from the Google Developers Console
const API_KEY = 'AIzaSyDdMaSH431QfX326hD52ixSIdWabikGKfk';

// Endpoint to fetch paginated books
app.get('/api/books', async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    if (searchQuery) {
      // Make a request to the Google Books API endpoint for fetching paginated books
      const startIndex = (page - 1) * limit;
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
        params: { q: searchQuery, startIndex, maxResults: limit, key: API_KEY },
      });

      // Extract the relevant data from the API response
      const { items, totalItems } = response.data;

      // Send the paginated books as the response
      res.json({ books: items, totalPages: Math.ceil(totalItems / limit) });
    } else {
      // Return an empty response as no search query is provided
      res.json({ books: [], totalPages: 0 });
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Root URL handler
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
