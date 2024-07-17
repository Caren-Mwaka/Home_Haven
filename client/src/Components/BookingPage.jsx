import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./bookingpage.css";

const BookingPage = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5555/rooms")
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.log(error));
  }, []);

  const handleBookNow = (roomId) => {
    navigate(`/bookings/${roomId}`); // Redirect to the booking form with room ID
  };

  return (
    <div id="container">
      <h2 id="welcome">Welcome to Home Haven Hotel</h2>
      <div className="rooms">
        {rooms.map((room) => (
          <div key={room.id} className="profile">
            <div className="info">
              <h2>{room.room_number}</h2>
              <h3>Type: {room.type}</h3>
              <img src={room.image_url} alt={room.room_number} className="image" />
              <button className="btn" onClick={() => handleBookNow(room.id)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
