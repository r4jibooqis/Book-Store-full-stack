
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import ShoppingCart from './components/ShoppingCart';
import AdminPanel from './components/AdminPanel';
import './App.css';

const App = () => {
  return (
    <BookProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </div>
        </div>
        <footer>
          <p>&copy; 2024 Bookstore Application</p>
        </footer>
      </Router>
    </BookProvider>
  );
};

export default App;
