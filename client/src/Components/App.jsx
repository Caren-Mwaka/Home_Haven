import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import RoomsPage from './RoomsPage';
import BookingPage from './BookingPage'; 
import BookingForm from './BookingForm'; 
import ReviewForm from './ReviewForm';
import LoginSignupPage from './LoginSignupPage';
import About from './About';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/bookings" element={<BookingPage />} /> 
        <Route path="/bookings/:roomId" element={<BookingForm />} />  
        <Route path="/review/:roomId" element={<ReviewForm />} />
        <Route path="/auth" element={<LoginSignupPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
