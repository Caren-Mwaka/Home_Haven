import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import BookingPage from './components/Bookingpage';
import BookingFormPage from './components/BookingFormPage';
import App from "./App";
import LoginSignupPage from "./Components/LoginSignup/LoginSignupPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <BookingPage />,
  },
  {
    path: '/book/:roomId',
    element: <BookingFormPage />,
  },
  {
    path: '/',
    element: <App />,
   
  },
  {
    path:'/LoginSignup',
    element:<LoginSignupPage/>
  },
]);

  

export default router;