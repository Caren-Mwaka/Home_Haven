import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./bookingpage.css";

function BookingPage() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/rooms")
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.log(error));
  }, []);

  const handleBookNow = (room) => {
    navigate(`/book/${room.id}`);
  };

  return (
    <div className="container">
      <h2 id="welcome">Welcome to Home Haven Hotel</h2>
      <div className="rooms">
        {rooms.map((room) => (
          <div key={room.id} className="profile">
            <div className="info">
              <h2>{room.room_number}</h2>
              <h3>Type: {room.type}</h3>
              <img src={room.image} alt={room.title} className="image" />
              <button className="btn" onClick={() => handleBookNow(room)}>
                Book now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingPage;
