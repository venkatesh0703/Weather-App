import { useState } from "react";
import { GeocodingResult } from "@/types/weather";
import { useCurrentWeather, useCurrentWeatherByCoords } from "@/hooks/use-weather";
import SearchBar from "@/components/weather/search-bar";
import WeatherCard from "@/components/weather/weather-card";
import MapPanel from "@/components/weather/map-panel";
import LoadingOverlay from "@/components/ui/loading-overlay";

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<GeocodingResult | null>(null);
  const [searchCity, setSearchCity] = useState("");

  const {
    data: weatherByCity,
    isLoading: loadingByCity,
    error: errorByCity,
  } = useCurrentWeather(searchCity, !!searchCity);

  const {
    data: weatherByCoords,
    isLoading: loadingByCoords,
    error: errorByCoords,
  } = useCurrentWeatherByCoords(
    selectedLocation?.lat || 0,
    selectedLocation?.lon || 0,
    !!selectedLocation
  );

  const isLoading = loadingByCity || loadingByCoords;
  const weatherData = weatherByCity || weatherByCoords;
  const error = errorByCity || errorByCoords;

  const handleLocationSelect = (location: GeocodingResult) => {
    setSelectedLocation(location);
    setSearchCity(""); // Clear city search when location is selected
  };

  const handleCitySearch = (location: GeocodingResult) => {
    setSearchCity(location.name);
    setSelectedLocation(null); // Clear location when city is searched
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
          Weather at your{" "}
          <span className="bg-gradient-to-r from-orange-400 to-purple-500 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
            fingertips
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          
        </p>
      </section>

      {/* Search Bar */}
      <SearchBar
        onLocationSelect={handleCitySearch}
        className="max-w-2xl mx-auto mb-8"
      />

      {/* Current Weather Display */}
      {weatherData && (
        <WeatherCard
          weather={weatherData}
          className="max-w-2xl mx-auto mb-8"
        />
      )}

      {/* Error Display */}
      {error && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="glass-light dark:glass-dark rounded-2xl p-6 border border-red-200 dark:border-red-800 shadow-lg">
            <div className="flex items-center space-x-3 text-red-600 dark:text-red-400">
              <i className="fas fa-exclamation-triangle text-xl"></i>
              <div>
                <h3 className="font-semibold">Weather data not available</h3>
                <p className="text-sm">
                  {error instanceof Error ? error.message : "Please try a different location"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Map */}
      <MapPanel 
        onLocationSelect={handleLocationSelect} 
        selectedLocation={selectedLocation}
      />

      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
}
