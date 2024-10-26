
import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import './Navbar.css';

const Navbar = () => {
    const { cart } = useBooks();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>Bookstore</h1>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/cart">
                    Shopping Cart {cart.length > 0 && <span className="cart-count">({cart.length})</span>}
                </Link>
                <Link to="/admin">Admin</Link>
            </div>
        </nav>
    );
};

export default Navbar;
