const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "03c4211535ff72e18bf4e6b0fe3d6aea";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

export class WeatherAPI {
  static async getCurrentWeather(city: string) {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather data not found for ${city}`);
    }
    
    return response.json();
  }

  static async getCurrentWeatherByCoords(lat: number, lon: number) {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error("Weather data not found for these coordinates");
    }
    
    return response.json();
  }

  static async getForecast(city: string) {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Forecast data not found for ${city}`);
    }
    
    return response.json();
  }

  static async getForecastByCoords(lat: number, lon: number) {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error("Forecast data not found for these coordinates");
    }
    
    return response.json();
  }

  static async geocodeCity(city: string) {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(city)}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("Geocoding failed");
    }
    
    return response.json();
  }

  static getWeatherIconUrl(icon: string) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  static getWeatherIconClass(icon: string): string {
    const iconMap: Record<string, string> = {
      '01d': 'fas fa-sun',
      '01n': 'fas fa-moon',
      '02d': 'fas fa-cloud-sun',
      '02n': 'fas fa-cloud-moon',
      '03d': 'fas fa-cloud',
      '03n': 'fas fa-cloud',
      '04d': 'fas fa-cloud',
      '04n': 'fas fa-cloud',
      '09d': 'fas fa-cloud-rain',
      '09n': 'fas fa-cloud-rain',
      '10d': 'fas fa-cloud-sun-rain',
      '10n': 'fas fa-cloud-moon-rain',
      '11d': 'fas fa-bolt',
      '11n': 'fas fa-bolt',
      '13d': 'fas fa-snowflake',
      '13n': 'fas fa-snowflake',
      '50d': 'fas fa-smog',
      '50n': 'fas fa-smog'
    };
    
    return iconMap[icon] || 'fas fa-cloud';
  }
}
