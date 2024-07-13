import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import BookingPage from './components/Bookingpage';
import BookingFormPage from './components/BookingFormPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BookingPage />,
  },
  {
    path: '/book/:roomId',
    element: <BookingFormPage />,
  },
]);

export default router;