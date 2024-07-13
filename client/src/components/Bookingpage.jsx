import React, { useEffect, useState } from 'react';
import './bookingpage.css';

function BookingPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/rooms')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.log(error));
  }, []);


  return (
    <div className="container">
      <h2 id='welcome'>Welcome to Home Haven Hotel</h2>
      <div className='rooms'>
        {rooms.map(room => (  
          <div key={room.id} className="profile">
            <div className="info">
              <h2>{room.room_number}</h2>
              <h3>Type: {room.type}</h3>
              <img src={room.image} alt={room.title} className='image'/>
              <button className="btn">Book now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingPage;