import axios from 'axios';

const COUNTRY_API_BASE_URL = 'http://api.countrylayer.com/v2';
const WEATHER_API_BASE_URL = 'http://api.weatherstack.com/current';
const COUNTRY_API_KEY = '283149f26b1e75289a0182cc009541b9';
const WEATHER_API_KEY = 'e8df2a4a28933ef6c53228dfda44b2a8';

export interface Country {
  name: string;
}

export const fetchCityList = async (): Promise<Country[]> => {
  try {
    const response = await axios.get(`${COUNTRY_API_BASE_URL}/all?access_key=${COUNTRY_API_KEY}`);
    console.log('API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching city list:', error);
    throw error;
  }
};

export const searchCity = async (name: string): Promise<Country[]> => {
  try {
    const response = await axios.get(`${COUNTRY_API_BASE_URL}/name/${name}?access_key=${COUNTRY_API_KEY}&fullText=`);
    return response.data;
  } catch (error) {
    console.error('Error searching for a city:', error);
    throw error;
  }
};

export interface WeatherData {
  current: {
    temperature: number;
    weather_code: number;
    weather_icons: any;
    pressure: string;
    wind_speed: string;
    wind_degree: string;
    precip: string;
  }
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${WEATHER_API_BASE_URL}?access_key=${WEATHER_API_KEY}&query=${city}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
