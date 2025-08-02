import { useState, useEffect } from "react";
import { useForecast } from "@/hooks/use-weather";
import ForecastCard from "@/components/weather/forecast-card";
import LoadingOverlay from "@/components/ui/loading-overlay";

export default function Forecast() {
  const [city, setCity] = useState("London"); // Default city
  
  // Check for URL parameters to auto-load forecast
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('city');
    if (cityParam) {
      setCity(decodeURIComponent(cityParam));
    }
  }, []);
  
  const { data: forecast, isLoading, error } = useForecast(city);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          5-Day Weather Forecast
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Detailed weather predictions for the next 5 days
        </p>
      </section>

      {/* City Selection */}
      <div className="max-w-md mx-auto mb-8">
        <div className="glass-light dark:glass-dark rounded-2xl p-4 border border-white/20 dark:border-white/10 shadow-lg">
          <div className="flex items-center space-x-3">
            <i className="fas fa-map-marker-alt text-orange-500 dark:text-purple-400"></i>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && setCity(e.currentTarget.value)}
              className="flex-1 bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              placeholder="Enter city name..."
            />
          </div>
        </div>
      </div>

      {/* Current Location Info */}
      {forecast && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="glass-light dark:glass-dark rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              {forecast.city.name}, {forecast.city.country}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      )}

      {/* Forecast Cards */}
      {forecast && <ForecastCard forecast={forecast} />}

      {/* Error Display */}
      {error && (
        <div className="max-w-2xl mx-auto">
          <div className="glass-light dark:glass-dark rounded-2xl p-8 border border-red-200 dark:border-red-800 shadow-lg text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-exclamation-triangle text-2xl text-red-600 dark:text-red-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Forecast Not Available
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {error instanceof Error ? error.message : "Please try a different city"}
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!forecast && !isLoading && !error && (
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-400/20 to-purple-500/20 dark:from-purple-400/20 dark:to-cyan-400/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-calendar-alt text-4xl text-orange-500 dark:text-purple-400"></i>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Enter a City Name
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Type a city name above to view the 5-day weather forecast
          </p>
        </div>
      )}

      <LoadingOverlay isVisible={isLoading} message="Loading Forecast Data" />
    </div>
  );
}
