import React, { useEffect, useState } from "react";
import "./App.css";
import Background from "./Components/Background/Background";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Reviews from './Components/ReviewForm'; // Import the Reviews component
import { BrowserRouter as Router, Route , Routes , Link } from 'react-router-dom';
import About from './Components/About';
import './App.css';

const App = () => {
  let heroData = [
    { text1: "Your Comfort", text2: "our satisfaction" },
    { text1: "Your Paradise", text2: "within grasp" },
    { text1: "One step", text2: "to Pradise" },
  ];
  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((count) => (count === 2 ? 0 : count + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div>
        <Background playStatus={playStatus} heroCount={heroCount} />
        <div>
          <Navbar />
          <Outlet/>
        </div>
        <Hero
          setPlayStatus={setPlayStatus}
          heroData={heroData[heroCount]}
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          playStatus={playStatus}
        />
      </div>
    </>
  );
};

export default App;




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
