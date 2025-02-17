import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  const testFunction2 = async () => {
    try {
      const response = await axios.get('http://localhost:5000/test-db');
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={testFunction2}>Test database connection</button>
      </header>
    </div>
  );
}

export default App;
