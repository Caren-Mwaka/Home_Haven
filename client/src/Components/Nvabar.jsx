import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'


const Navbar = () => {
  return (
    <div className='nav'>
        <div className="nav-logo">Home Haven</div>
        <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/LoginSignup">Sign Up</Link></li>
          
        </ul>

    </div>
  )
}

export default Navbar