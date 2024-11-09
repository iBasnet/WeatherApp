import React, { useState, useEffect, useRef } from "react";
import SearchSection from "./components/SearchSection";
import WeatherSection from './components/WeatherSection';
import HourlyForecast from './components/HourlyForecast';
import NoResultsSection from './components/NoResultsSection';
import { weatherCodes } from "./constants";

const Loader = () => (
  <div className="loader">
    <div className="spinner"></div>
  </div>
);

export default function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);
  const [hasNoResults, setHasNoResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const defaultCity = "LA";
    const API_KEY = "28c8279a0e1d4620858141843240811";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`;
    getWeatherDetails(API_URL);
  }, []);

  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });

    setHourlyForecasts(next24HoursData);
  };

  const getWeatherDetails = async (API_URL) => {
    setHasNoResults(false);
    setLoading(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error();
      const data = await response.json();

      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const location =
        data.location.country === "United States of America"
          ? `${data.location.name}, ${data.location.region}`
          : `${data.location.name}, ${data.location.country}`;
      const weatherIcon = Object.keys(weatherCodes).find(
        (icon) => weatherCodes[icon].includes(data.current.condition.code)
      );

      setCurrentWeather({ temperature, description, location, weatherIcon });

      const combinedHourlyData = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];

      filterHourlyForecast(combinedHourlyData);

      searchInputRef.current.value = data.location.name;
    } catch {
      setHasNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <SearchSection getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef} />
      {loading ? (
        <Loader />
      ) : hasNoResults ? (
        <NoResultsSection />
      ) : (
        <>
          <WeatherSection currentWeather={currentWeather} />
          <HourlyForecast hourlyForecasts={hourlyForecasts} />
        </>
      )}
    </div>
  );
}
