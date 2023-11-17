import React, { useEffect, useState } from 'react';
import { fetchWeather, WeatherData } from '../services/api';

interface City {
  name: string;
}

interface FavoritesListProps {
  favorites: City[];
  onFavoriteClick: (city: City) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onFavoriteClick }) => {
  const [weatherData, setWeatherData] = useState<{ [key: string]: WeatherData | null }>({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      const newData: { [key: string]: WeatherData | null } = {};

      for (const favorite of favorites) {
        try {
          const data = await fetchWeather(favorite.name);
          newData[favorite.name] = data;
        } catch (error) {
          console.error(`Error fetching weather data for ${favorite.name}:`, error);
          newData[favorite.name] = null;
        }
      }

      setWeatherData(newData);
    };

    fetchWeatherData();
  }, [favorites]);

  return (
    <div>
      <h3>Favorites</h3>
      <ul className="list-group">
        {favorites.map((favorite) => (
          <li
            key={favorite.name}
            onClick={() => onFavoriteClick(favorite)}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{favorite.name}</span>
            {weatherData[favorite.name] && (
              <span>
                Temperature: {weatherData[favorite.name]?.current.temperature} °C
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
