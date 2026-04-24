import React from 'react'
import "./Navbar.css"

const NavBar = () => {
  return (
    <div className="navbar">
      
      {/* Logo */}
      <h2 className="logo">Shop</h2>

      {/* Links */}
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Login</a>
        <a href="#">Signup</a>
      </div>

    </div>
  )
}

export default NavBar