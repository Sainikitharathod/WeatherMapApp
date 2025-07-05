import React from 'react';
import './Modal.css';

const Modal = ({ city, setCity, onSubmit, error, isLoading, editingCity, onClose }) => (
  <div className="modal-overlay">
    <div className="modal">
      <h3>{editingCity ? 'Edit Location' : 'Add New Location'}</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="city-input"
          aria-label="City name"
        />
        <button
          type="submit"
          className="search-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : editingCity ? 'Update' : 'Get Weather'}
        </button>
      </form>
      <button
        onClick={onClose}
        className="close-btn"
      >
        Close
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  </div>
);

export default Modal;