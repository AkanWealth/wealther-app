import React, { useState, useEffect } from 'react';
import { fetchCityList, fetchWeather, Country, searchCity } from './services/api';
import CityList from './components/CityList';
import CityDetails from './components/CityDetails';
import FavoritesList from './components/FavoritesList';
import SearchBar from './components/SearchBar';

const App: React.FC = () => {
  const [cities, setCities] = useState<Country[]>([]);
  const [selectedCity, setSelectedCity] = useState<Country | null>(null);
  const [favorites, setFavorites] = useState<Country[]>([]);

  useEffect(() => {
    // Fetch initial city list
    const fetchInitialCities = async () => {
      try {
        const initialCities = await fetchCityList();
        setCities(initialCities);
      } catch (error) {
        console.error('Error fetching initial city list:', error);
      }
    };

    // Check local storage for favorites
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);

    // Fetch initial data when the component mounts
    fetchInitialCities();
  }, []);

  const handleCityClick = async (city: Country) => {
    try {
      // Fetch more details for the selected city
      const cityWeather = await fetchWeather(city.name);

      // Update state or perform other actions with the city details
      console.log('City Weather:', cityWeather);

      setSelectedCity(city);
    } catch (error) {
      console.error('Error fetching city details:', error);
    }
  };

  const handleRemoveCity = (city: Country) => {
    // Remove the city from the list
    const updatedCities = cities.filter((c) => c.name !== city.name);
    setCities(updatedCities);

    // Update local storage
    localStorage.setItem('cities', JSON.stringify(updatedCities));
  };

  const handleSearch = async (query: string) => {
    try {
      // Search for a city and update the list
      const searchResults = await searchCity(query);
      setCities(searchResults);
    } catch (error) {
      console.error('Error searching for a city:', error);
    }
  };

  const handleAddFavorite = (city: Country) => {
    // Add the city to favorites
    const updatedFavorites = [...favorites, city];
    setFavorites(updatedFavorites);

    // Update local storage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleRemoveFavorite = (city: Country) => {
    // Remove the city from favorites
    const updatedFavorites = favorites.filter((c) => c.name !== city.name);
    setFavorites(updatedFavorites);

    // Update local storage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Weather App</h1>
      <div className="col">
        <div className="col-md-4">
          <FavoritesList favorites={favorites} onFavoriteClick={handleCityClick} />
          <div className='mt-4'></div>
        </div>
        <div className="col-md-8">
          <SearchBar onSearch={handleSearch} />
          <CityList cities={cities} onCityClick={handleCityClick} onRemoveCity={handleRemoveCity} />
          {selectedCity && (
            <CityDetails
              city={selectedCity}
              onAddFavorite={handleAddFavorite}
              onRemoveFavorite={handleRemoveFavorite}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
