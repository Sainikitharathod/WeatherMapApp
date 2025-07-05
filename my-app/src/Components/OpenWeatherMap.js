import React from 'react';
import Header from './Header/Header';
import Modal from './Modal/Modal';
import Dashboard from './Dashboard/Dashboard';
import useWeather from '../Hooks/useWeather';
import './OpenWeatherMap.css';

const OpenWeatherMap = () => {
  const apiKey = '8bbf3d8f56ebdcf6fe6a02959c52adcc'; // Ideally use process.env.REACT_APP_OPENWEATHER_API_KEY
  const {
    city,
    setCity,
    locations,
    error,
    isModalOpen,
    setIsModalOpen,
    editingCity,
    setEditingCity,
    fetchWeather,
    handleDelete,
    handleEdit,
    setError,
    isLoading,
  } = useWeather(apiKey);

  console.log('Current locations:', locations); // Debug log

  return (
    <div className="openweather-container">
      <Header onAddClick={() => {
        setIsModalOpen(true);
        setCity('');
        setError('');
        setEditingCity(null);
      }} />
      {isModalOpen && (
        <Modal
          city={city}
          setCity={setCity}
          onSubmit={fetchWeather}
          error={error}
          isLoading={isLoading}
          editingCity={editingCity}
          onClose={() => {
            setIsModalOpen(false);
            setCity('');
            setError('');
            setEditingCity(null);
          }}
        />
      )}
      <Dashboard
        locations={locations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default OpenWeatherMap;