import React from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from './Bookingform';

function BookingFormPage() {
  const { roomId } = useParams();

  const handleBookingSubmit = (values) => {
    console.log('Booking Data:', values);
  };

  return (
    <div>
      <h2>Book Room {roomId}</h2>
      <BookingForm onSubmit={handleBookingSubmit} roomId={roomId} />
    </div>
  );
}

export default BookingFormPage;