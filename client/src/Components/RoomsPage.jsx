
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './roomspage.css';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5555/rooms')
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.log(error));
  }, []);

  const handleReview = (roomId) => {
    navigate(`/review/${roomId}`);
  };

  return (
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
  );
};

export default RoomsPage;
