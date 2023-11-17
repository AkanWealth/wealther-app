import React from 'react';

interface City {
  name: string;
}

interface CityListProps {
  cities: City[];
  onCityClick: (city: City) => void;
  onRemoveCity: (city: City) => void;
}

const CityList: React.FC<CityListProps> = ({ cities, onCityClick, onRemoveCity }) => {
  const slicedCities = cities.slice(0, 15);
  return (
    <div>
      <ul className="list-group">
        {slicedCities?.map((city) => (
          <li key={city.name} className="list-group-item d-flex justify-content-between align-items-center">
            <span onClick={() => onCityClick(city)} className='cursor'>{city.name}</span>
            <button onClick={() => onRemoveCity(city)} className="btn btn-danger">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;
