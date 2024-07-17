import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./Navbar/Navbar.css"

const HomePage = () => {
  return (
    <nav className="navbar">
      <h1>Home Page</h1>
      <ul className="nav-links">
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
  );
};

export default HomePage;
