import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./roomspage.css";
import { Link } from "react-router-dom";
import "./Navbar/Navbar";
import LogoutButton from "./LogoutButton";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://home-haven-7.onrender.com/rooms")
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.log(error));
  }, []);

  const handleReview = (roomId) => {
    navigate(`/review/${roomId}`);
  };

  return (
    <>
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
      <div className="rooms-container">
        <h2>Rooms at Home Haven Hotel</h2>
        <div className="rooms-list">
          {rooms.map((room) => (
            <div key={room.id} className="room-card">
              <h3>Room {room.room_number}</h3>
              <img src={room.image_url} alt={`Room ${room.room_number}`} />
              <p>Type: {room.type}</p>
              <button onClick={() => handleReview(room.id)}>Review Room</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoomsPage;
