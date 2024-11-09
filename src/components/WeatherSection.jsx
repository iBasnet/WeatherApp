import React from 'react'

const WeatherSection = ({ currentWeather }) => {
    return (
        <div className="weather-section">
            <div className="current-weather">
                <img src={`/icons/${currentWeather.weatherIcon}.svg`} className="weather-icon" />
                <h2 className="temperature">{currentWeather.temperature}</h2>
                <p className="description">{currentWeather.description}</p>
                <p className="country">{currentWeather.location}</p>
            </div>
        </div>
    )
}

export default WeatherSection