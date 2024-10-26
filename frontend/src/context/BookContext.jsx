
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BookContext = createContext();

export const useBooks = () => {
    return useContext(BookContext);
};

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [cart, setCart] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const apiUrl = 'http://localhost:8080/api/books';
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(apiUrl);
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const addBook = async (book) => {
        try {
            const response = await axios.post(apiUrl, book);
            setBooks((prevBooks) => [...prevBooks, response.data]);
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const editBook = async (id, updatedBook) => {
        try {
            const response = await axios.put(`${apiUrl}/${id}`, updatedBook);
            setBooks((prevBooks) =>
                prevBooks.map((book) => (book.id === id ? response.data : book))
            );
        } catch (error) {
            console.error('Error editing book:', error);
        }
    };

    const removeBook = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } catch (error) {
            console.error('Error removing book:', error);
        }
    };

    const addToCart = (book) => {
        setCart((prevCart) => [...prevCart, book])
    };

    const removeFromCart = (bookToRemove) => {
        setCart((prevCart) => prevCart.filter((book) => book !== bookToRemove));
    };

    return (
        <BookContext.Provider value={{ books, cart, isAdmin, setIsAdmin, addBook, editBook, removeBook, addToCart, removeFromCart }}>
            {children}
        </BookContext.Provider>
    );
};
