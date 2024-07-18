import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Background from "./Background/Background.jsx";
import Hero from "./Hero/Hero.jsx";
import LogoutButton from "./LogoutButton";
import "./Navbar/Navbar.css";

const HomePage = () => {
  let heroData = [
    { text1: "Your Comfort", text2: "our satisfaction" },
    { text1: "Your Paradise", text2: "within grasp" },
    { text1: "One step", text2: "to Paradise" },
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
    <div>
      <nav className="nav">
        <h1 className="nav-logo">Home Haven</h1>
        <ul className="nav-menu">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/bookings">Bookings</Link>
          </li>
          <li>
            <Link to="/rooms">Rooms</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
      <Background playStatus={playStatus} heroCount={heroCount} />
      <Hero
        setPlayStatus={setPlayStatus}
        heroData={heroData[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        playStatus={playStatus}
      />
    </div>
  );
};

export default HomePage;
