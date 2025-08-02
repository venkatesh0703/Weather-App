import { useEffect } from "react";
import { Plus, Heart, Trash2 } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { useCurrentWeather } from "@/hooks/use-weather";
import { WeatherAPI } from "@/lib/weather-api";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Favorite Cities
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Quick access to your saved locations
        </p>
      </section>

      {favorites.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((city, index) => (
            <FavoriteCityCard
              key={city.id}
              city={city}
              onRemove={() => removeFavorite(city.id)}
              index={index}
            />
          ))}

          {/* Add New Favorite Card */}
          <Link
            to="/"
            className="glass-light dark:glass-dark rounded-2xl p-6 border border-dashed border-white/30 dark:border-white/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in block text-center"
            style={{ animationDelay: `${favorites.length * 0.1}s` }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-purple-500/20 dark:from-purple-400/20 dark:to-cyan-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-orange-500 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Add New City
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Search and add more cities to favorites
            </p>
            <div className="px-4 py-2 bg-gradient-to-r from-orange-400 to-purple-500 dark:from-purple-400 dark:to-cyan-400 text-white rounded-lg hover:shadow-lg transition-all duration-300 inline-block">
              Add City
            </div>
          </Link>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400/20 to-purple-500/20 dark:from-purple-400/20 dark:to-cyan-400/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-orange-500 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              No Favorite Cities Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Start adding cities to your favorites for quick weather updates
            </p>
            <Link
              to="/"
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-purple-500 dark:from-purple-400 dark:to-cyan-400 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center"
            >
              <i className="fas fa-search mr-2"></i>
              Search Cities
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function FavoriteCityCard({ 
  city, 
  onRemove, 
  index 
}: { 
  city: any; 
  onRemove: () => void; 
  index: number;
}) {
  const { data: weather, isLoading } = useCurrentWeather(city.name);

  return (
    <div
      className="glass-light dark:glass-dark rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {city.name}, {city.country}
        </h3>
        <button
          onClick={onRemove}
          className="p-2 rounded-lg hover:bg-red-500/20 transition-colors group"
        >
          <Trash2 className="w-5 h-5 text-red-500 group-hover:text-red-600" />
        </button>
      </div>

      {isLoading ? (
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
              <div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
              </div>
            </div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
          </div>
        </div>
      ) : weather ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400/20 to-purple-500/20 dark:from-purple-400/20 dark:to-cyan-400/20 rounded-xl flex items-center justify-center">
              <i className={`${WeatherAPI.getWeatherIconClass(weather.weather[0].icon)} text-2xl text-orange-500 dark:text-purple-400`}></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="text-gray-600 dark:text-gray-300 capitalize">
                {weather.weather[0].description}
              </div>
            </div>
          </div>

          <Link
            to={`/forecast?city=${encodeURIComponent(city.name)}&country=${encodeURIComponent(city.country)}&lat=${city.coord.lat}&lon=${city.coord.lon}`}
            className="px-4 py-2 bg-orange-500/20 dark:bg-purple-400/20 text-orange-500 dark:text-purple-400 rounded-lg hover:bg-orange-500/30 dark:hover:bg-purple-400/30 transition-colors"
          >
            View Details
          </Link>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <i className="fas fa-exclamation-triangle mb-2"></i>
          <div className="text-sm">Unable to load weather data</div>
        </div>
      )}
    </div>
  );
}
