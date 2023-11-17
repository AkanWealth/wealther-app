import React, { useEffect, useState } from 'react';
import { fetchWeather, WeatherData } from '../services/api';

interface City {
  name: string;
}

interface CityDetailsProps {
  city: City;
  onAddFavorite: (city: City) => void;
  onRemoveFavorite: (city: City) => void;
}

const CityDetails: React.FC<CityDetailsProps> = ({
  city,
  onAddFavorite,
  onRemoveFavorite,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchCityWeather = async () => {
      try {
        const weatherData = await fetchWeather(city.name);
        setWeather(weatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchCityWeather();
  }, [city.name]);

  return (
    <div className="mb-5">
      <div className="pt-5">
        <div className="card p-4">
          <div className="card-body">
            <h5 className="card-title">{city.name}</h5>
            {weather && (
              <>
                <div className="card-text">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <img
                        src={weather?.current?.weather_icons}
                        alt="weather-icon"
                        className="bg-transparent"
                      />
                      &nbsp;&nbsp;&nbsp;
                      <p className="my-auto">
                        Temperature: {weather?.current?.temperature || 'N/A'} °C
                      </p>
                    </div>
                    <div>
                      <p className="my-auto mt-4">
                        Weather Code: {weather?.current?.weather_code || 'N/A'}{' '}
                        °C
                      </p>
                    </div>
                  </div>
                </div>
                <p className="card-text mt-2">Pressure: {weather?.current?.pressure} mb</p>
                <p className="card-text">Precip: {weather?.current?.precip} mm</p>
                <p className="card-text">Wind Speed: {weather?.current?.wind_speed} kmph</p>
                <p className="card-text">Wind Degree: {weather?.current?.wind_degree}</p>
              </>
            )}
            <div className="d-flex justify-content-between pt-4">
              <button
                onClick={() => onAddFavorite(city)}
                className="btn btn-success"
              >
                Add to Favorites
              </button>
              <button
                onClick={() => onRemoveFavorite(city)}
                className="btn btn-warning"
              >
                Remove from Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
