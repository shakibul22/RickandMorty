import React from 'react';
import './Navbar.css'; // Import your CSS file

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">RickyMorty</h1>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
        
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
