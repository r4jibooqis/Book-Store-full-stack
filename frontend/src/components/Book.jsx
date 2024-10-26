
import React from 'react';

const Book = ({ book, onAddToCart, onRemove }) => {
    return (
        <div className="book">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <button onClick={() => onAddToCart(book)}>Add to Cart</button>
            {onRemove && <button className="remove-button" onClick={() => onRemove(book.id)}>Remove</button>}
        </div>
    );
};

export default Book;
