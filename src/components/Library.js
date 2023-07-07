import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingAnimation from './LoadingAnimation';
import BookForm from './BookForm';
import BookList from './BookList';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

function Library() {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [cart, setCart] = useState([]);

  const fetchBooks = async ({ searchQuery, page = 1, limit = 10 }) => {
    try {
      setLoading(true);

      const params = { searchQuery, page, limit };
      if (filterBy) {
        params.filterBy = filterBy;
      }
      if (sortBy) {
        params.sortBy = sortBy;
      }

      const response = await axios.get('/api/books', { params });

      const { books: fetchedBooks, totalPages: fetchedTotalPages } = response.data;

      setBooks(fetchedBooks);
      setTotalPages(fetchedTotalPages);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks({ searchQuery });
  }, [searchQuery, filterBy, sortBy]);

  const handleFilterChange = (event) => {
    const newFilterBy = event.target.value;
    setFilterBy(newFilterBy);
  };

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleAddToCart = (book) => {
    setCart([...cart, book]);
  };

  const handleCheckout = () => {
    // Perform the necessary logic to process the checkout, such as updating availability and number of copies
    cart.forEach((book) => {
      // Find the corresponding book in the 'books' state
      const updatedBooks = books.map((b) => {
        if (b.id === book.id) {
          // Decrease the availability and number of copies
          return {
            ...b,
            availability: b.availability - 1,
            copies: b.copies - 1,
          };
        }
        return b;
      });

      // Update the 'books' state with the updated book data
      setBooks(updatedBooks);
    });

    // Clear the cart after checkout
    setCart([]);
  };

  return (
    <div className="library">
      <div className="search-bar">
        <input
          type="text"
          id="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      <div className="filter-sort-controls">
        {/* Filter and Sort controls */}
        {/* ... Your existing code for filter and sort controls ... */}
      </div>

      <div className="book-list">
        <h2>Search Results</h2>
        <p>Total Books: {books.length}</p>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <BookList books={books} addToCart={handleAddToCart} />
        )}
      </div>

      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {cart.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
        <button onClick={handleCheckout}>Checkout</button>
      </div>

      <div className="signup-section">
        <SignupForm />
      </div>

      <div className="login-section">
        <LoginForm />
      </div>

      <BookForm />
    </div>
  );
}

export default Library;

