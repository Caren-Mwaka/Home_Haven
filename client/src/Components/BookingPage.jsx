import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./bookingpage.css";
import { Link } from "react-router-dom";
import "./Navbar/Navbar";
import LogoutButton from "./LogoutButton";

const BookingPage = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://home-haven-7.onrender.com/rooms")
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.log(error));
  }, []);

  const handleBookNow = (roomId) => {
    navigate(`/bookings/${roomId}`); 
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const roomTypes = ["Single", "Double", "Suite", "Family"];
  const filteredRooms = rooms.filter(
    (room) =>
      roomTypes.includes(room.type) &&
      room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <input
        type="text"
        placeholder="Search by room type..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div id="container">
        <h2 id="welcome">Welcome to Home Haven Hotel</h2>
        <div className="rooms">
          {filteredRooms.map((room) => (
            <div key={room.id} className="profile">
              <div className="info">
                <h2>{room.room_number}</h2>
                <h3>Type: {room.type}</h3>
                <img
                  src={room.image_url}
                  alt={room.room_number}
                  className="image"
                />
                <button className="btn" onClick={() => handleBookNow(room.id)}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingPage;
