import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/weather', {
        city,
        country: 'IN',  // Use default country for simplicity
      });
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching weather data');
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h3>{weatherData.city}, {weatherData.country}</h3>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Description: {weatherData.description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
