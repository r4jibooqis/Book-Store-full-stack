
import React from 'react';
import { useBooks } from '../context/BookContext';
import './BookList.css';

const BookList = () => {
    const { books, addToCart } = useBooks();

    return (
        <div className="book-list">
            <h2>Available Books</h2>
            <div className="book-cards">
                {books.map((book) => (
                    <div key={book.id} className="book-card">
                        <img src={book.imgUrl} alt={book.title} className="book-image" />
                        <div className="book-details">
                            <h3>{book.title}</h3>
                            <p>Author: {book.author}</p>
                            <p>Price: ${book.price}</p>
                            <button className="add-to-cart" onClick={() => addToCart(book)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
