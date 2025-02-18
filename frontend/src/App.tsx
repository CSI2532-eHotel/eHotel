import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './app.css';
import './app.scss';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
