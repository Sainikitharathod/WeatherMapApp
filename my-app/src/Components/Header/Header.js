import React from 'react';
import './Header.css';

const Header = ({ onAddClick }) => (
  <div className="header">
    <h2>Professional Weather App</h2>
    <button
      onClick={onAddClick}
      className="add-location-btn"
      aria-label="Add new location"
    >
      Add Location
    </button>
  </div>
);

export default Header;