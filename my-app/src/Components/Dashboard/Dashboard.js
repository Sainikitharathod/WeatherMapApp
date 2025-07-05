import React from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import './Dashboard.css';

const Dashboard = ({ locations, onEdit, onDelete }) => {
  console.log('Dashboard locations:', locations); // Debug log

  return (
    <div className="dashboard">
      {locations.length === 0 ? (
        <p className="empty-state">
          No locations added. Click "Add Location" to get started!
        </p>
      ) : (
        locations.map((weatherData) => (
          <WeatherCard
            key={weatherData.id}
            weatherData={weatherData}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default Dashboard;