import React, { useState } from 'react';

export default function SearchSection({ getWeatherDetails, searchInputRef }) {

    const [cityName, setCityName] = useState("");

    const handleCitySearch = (e) => {

        const API_KEY = "28c8279a0e1d4620858141843240811";
        const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=2`

        e.preventDefault();

        getWeatherDetails(API_URL);
    }

    const handleLocationSearch = () => {

        navigator.geolocation.getCurrentPosition(position => {

            const API_KEY = "28c8279a0e1d4620858141843240811";
            const { latitude, longitude } = position.coords;
            const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`
            getWeatherDetails(API_URL);
        },

            () => {
                alert("Location access denied. Please enable permissions to use this feature.");
            }
        )
    }


    return (
        <div className="search-section">
            <form action="#" className="search-form" onSubmit={handleCitySearch}>
                <span className="material-symbols-outlined">
                    search
                </span>
                <input type="text" className="search-input"
                    placeholder="Enter a city name" required
                    onChange={(e) => setCityName(e.target.value)}
                    ref={searchInputRef} />
            </form>
            <button className="location-button" onClick={handleLocationSearch}>
                <span className="material-symbols-outlined">
                    my_location
                </span>
            </button>
        </div>
    )
}