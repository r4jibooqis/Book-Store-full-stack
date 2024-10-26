
import React from 'react';
import { useBooks } from '../context/BookContext';
import './ShoppingCart.css';

const ShoppingCart = () => {
    const { cart, removeFromCart } = useBooks();

    const getTotalPrice = () => {
        return cart.reduce((total, book) => total + parseFloat(book.price), 0).toFixed(2);
    };

    return (
        <div className="shopping-cart">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <div>
                    <div className="cart-items">
                        {cart.map((book, index) => (
                            <div key={index} className="cart-item">
                                <div className="cart-item-details">
                                    <h3>{book.title}</h3>
                                    <p>Author: {book.author}</p>
                                    <p>Price: ${book.price}</p>
                                    <button className="remove-button" onClick={() => removeFromCart(book)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h3 className="total-price">Total Price: ${getTotalPrice()}</h3>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
