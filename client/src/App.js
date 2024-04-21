// App.js

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import ShowPage from './components/Pages/show';
import AddPage from './components/Pages/add';
import UpdatePage from './components/Pages/update';
import DeletePage from './components/Pages/delete';
import './navbar.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/show" className="nav-link">Show</Link>
          <Link to="/add" className="nav-link">Add</Link>
          <Link to="/update" className="nav-link">Update</Link>
          <Link to="/delete" className="nav-link">Delete</Link>
        </nav>
        <Routes>
          <Route path="/show" element={<ShowPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/update" element={<UpdatePage />} />
          <Route path="/delete" element={<DeletePage />} />
          <Route path="/" element={<Navigate to="/show" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
