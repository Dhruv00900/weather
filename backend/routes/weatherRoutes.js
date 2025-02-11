const express = require('express');
const axios = require('axios');
const Weather = require('../models/Weather');

const router = express.Router();

// Fetch weather data by city and save it to MongoDB
router.post('/', async (req, res) => {
  const { city, country } = req.body;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    // Fetch current weather data from OpenWeather API
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`);
    const data = response.data;

    const newWeather = new Weather({
      city: data.name,
      country: data.sys.country,
      temperature: Math.floor(data.main.temp - 273.15),  // Convert from Kelvin to Celsius
      description: data.weather[0].description,
    });

    await newWeather.save();
    res.status(200).json(newWeather);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

module.exports = router;
