import React from 'react';

const BookList = ({ books }) => {
  return (
    <ul>
      {books.map((book, index) => (
        <li key={index}>
          {book.title} by {book.author}
        </li>
      ))}
    </ul>
  );
};

export default BookList;
