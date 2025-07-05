import React from 'react';
    import './WeatherCard.css';

    const WeatherCard = ({ weatherData, onEdit, onDelete }) => {
      console.log('WeatherCard data:', weatherData); // Debug log
      return (
        <div className="weather-card">
          <h3 className="city-name">{weatherData.name}</h3>
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt="Weather icon"
          />
          <p className="temperature">{weatherData.main.temp} °C</p>
          <p className="description">{weatherData.weather[0].description}</p>
          <div className="card-buttons">
            <button
              onClick={() => onEdit(weatherData.name)}
              className="edit-btn"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(weatherData.name)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      );
    };

    export default WeatherCard;