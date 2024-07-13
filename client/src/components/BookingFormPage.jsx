import React from 'react';

function BookingFormPage() {

  const handleBookingSubmit = (values) => {
    console.log('Booking Data:', values);
  };

  return (
    <div>
      <h2>Book Room {roomId}</h2>
    </div>
  );
}

export default BookingFormPage;