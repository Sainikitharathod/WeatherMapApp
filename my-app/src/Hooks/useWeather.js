import { useState, useEffect, useCallback } from 'react';
import { fetchWeatherData } from '../Services/api';

const useWeather = (apiKey) => {
  const [city, setCity] = useState('');
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('weatherLocations');
    if (saved) {
      console.log('Loaded from localStorage:', JSON.parse(saved));
      setLocations(JSON.parse(saved));
    } else {
      fetchWeather(null, 'London'); // Default city
    }
  }, []);

  useEffect(() => {
    console.log('Updating localStorage with locations:', locations);
    localStorage.setItem('weatherLocations', JSON.stringify(locations));
  }, [locations]);

  const fetchWeather = useCallback(async (e, cityName = city) => {
    e?.preventDefault();
    if (!cityName.trim()) {
      setError('Please enter a valid city name');
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchWeatherData(cityName, apiKey);
      console.log('Fetched weather data:', data);

      if (editingCity) {
        setLocations((prev) => {
          const newLocations = prev.map((loc) =>
            loc.name.toLowerCase() === editingCity.toLowerCase() ? data : loc
          );
          console.log('Updated locations (edit):', newLocations);
          return newLocations;
        });
        setEditingCity(null);
      } else {
        const exists = locations.find(
          (loc) => loc.name.toLowerCase() === cityName.trim().toLowerCase()
        );
        if (exists) {
          setError('Location already added!');
          setIsLoading(false);
          return;
        }
        setLocations((prev) => {
          const newLocations = [...prev, data];
          console.log('Updated locations (add):', newLocations);
          return newLocations;
        });
      }

      setCity('');
      setIsModalOpen(false);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid API key. Please check your API key.');
        } else if (err.response.status === 404) {
          setError('City not found. Please try another city.');
        } else if (err.response.status === 429) {
          setError('API rate limit exceeded. Please try again later.');
        } else {
          setError(err.response.data.message || 'An unexpected error occurred.');
        }
      } else {
        setError('Network error. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [city, locations, editingCity, apiKey]);

  const handleDelete = useCallback((name) => {
    setLocations((prev) => {
      const newLocations = prev.filter((loc) => loc.name !== name);
      console.log('Updated locations (delete):', newLocations);
      return newLocations;
    });
  }, []);

  const handleEdit = useCallback((name) => {
    setEditingCity(name);
    setCity(name);
    setIsModalOpen(true);
  }, []);

  return {
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
  };
};

export default useWeather;