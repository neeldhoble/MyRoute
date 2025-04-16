// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';


function App() {
  return (
    <div className="flex">
      <Navbar />
    </div>
  );
}

export default App;
