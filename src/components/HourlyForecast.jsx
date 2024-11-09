import React from 'react'
import WeatherItem from './WeatherItem';
import WeatherSection from './WeatherSection';

const HourlyForecast = ({ hourlyForecasts }) => {
    return (
        <div className="hourly-forecast">
            <ul className="weather-list">
                {hourlyForecasts.map((hourlyWeather) => (
                    <WeatherItem key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather} />
                ))}
            </ul>
        </div>
    )
}

export default HourlyForecast