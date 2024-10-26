
import React, { useState } from 'react';
import { useBooks } from '../context/BookContext';
import './AdminPanel.css';

const AdminPanel = () => {
    const { books, addBook, removeBook, editBook } = useBooks();
    const [newBook, setNewBook] = useState({ title: '', author: '', price: '', imgUrl: '' });
    const [editingBook, setEditingBook] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingBook) {
            editBook(editingBook.id, newBook);
            setEditingBook(null);
        } else {
            addBook(newBook);
        }
        setNewBook({ title: '', author: '', price: '', imgUrl: '' });
    };

    const handleEdit = (book) => {
        setNewBook({ title: book.title, author: book.author, price: book.price, imgUrl: book.imgUrl });
        setEditingBook(book);
    };

    const handleCancel = () => {
        setNewBook({ title: '', author: '', price: '', imgUrl: '' });
        setEditingBook(null);
    };

    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>
            <form onSubmit={handleSubmit} className="add-book-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Book Title"
                    value={newBook.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newBook.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="imgUrl"
                    placeholder="Image URL"
                    value={newBook.imgUrl}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
                {editingBook && <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>}
            </form>
            <h3>Existing Books</h3>
            <ul className="book-list">
                {books.map((book) => (
                    <li key={book.id} className="book-item">
                        <div className="book-info">
                            <h4>{book.title}</h4>
                            <p>Author: {book.author}</p>
                            <p>Price: ${book.price}</p>
                        </div>
                        <div>
                            <button className="remove-button" onClick={() => removeBook(book.id)}>
                                Remove
                            </button>
                            <button className="edit-button" onClick={() => handleEdit(book)}>
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
