import React from 'react';
import Reviews from './components/ReviewForm'; // Import the Reviews component
import { BrowserRouter as Router, Route , Routes , Link } from 'react-router-dom';
import About from './components/About';
import './App.css';

function App() {
 
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<h1>Welcome to Our Hotel</h1>} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<About />} />
        </Routes>
        
        <footer>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </footer>
      </div>
    </Router>
  )
}

export default App
