import { Heart } from "lucide-react";
import { WeatherData } from "@/types/weather";
import { WeatherAPI } from "@/lib/weather-api";
import { useFavorites } from "@/hooks/use-favorites";
import { getTemperatureColors, getTemperatureLabel } from "@/lib/temperature-colors";

interface WeatherCardProps {
  weather: WeatherData;
  className?: string;
}

export default function WeatherCard({ weather, className = "" }: WeatherCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favoriteCity = {
    id: weather.id.toString(),
    name: weather.name,
    country: weather.sys.country,
    coord: weather.coord,
    weather: weather,
  };

  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const tempColors = getTemperatureColors(weather.main.temp);

  return (
    <div className={`glass-light dark:glass-dark rounded-2xl p-6 border ${tempColors.border} shadow-lg animate-fade-in relative overflow-hidden ${className}`}>
      {/* Temperature-based background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${tempColors.gradient} opacity-5 dark:opacity-10`}></div>
      <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {weather.name}, {weather.sys.country}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{formatDate()}</p>
        </div>
        <button
          onClick={() => toggleFavorite(favoriteCity)}
          className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
        >
          <Heart
            className={`w-6 h-6 ${
              isFavorite(favoriteCity.id)
                ? "text-red-500 fill-current"
                : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Weather Icon with temperature-based colors */}
          <div className={`w-20 h-20 bg-gradient-to-br ${tempColors.gradient} rounded-2xl flex items-center justify-center animate-bounce-subtle shadow-lg`}>
            <i className={`${WeatherAPI.getWeatherIconClass(weather.weather[0].icon)} text-4xl text-white`}></i>
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <div className={`text-4xl font-bold ${tempColors.text}`}>
                {Math.round(weather.main.temp)}°C
              </div>
              <div className={`px-3 py-1 ${tempColors.bg} ${tempColors.text} rounded-full text-sm font-medium`}>
                {tempColors.label}
              </div>
            </div>
            <div className="text-gray-600 dark:text-gray-300 capitalize mb-1">
              {weather.weather[0].description}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Feels like {Math.round(weather.main.feels_like)}°C
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <i className={`fas fa-wind ${tempColors.icon}`}></i>
              <span className="text-gray-600 dark:text-gray-300">
                {Math.round(weather.wind.speed)} km/h
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <i className={`fas fa-tint ${tempColors.icon}`}></i>
              <span className="text-gray-600 dark:text-gray-300">
                {weather.main.humidity}%
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <i className={`fas fa-eye ${tempColors.icon}`}></i>
              <span className="text-gray-600 dark:text-gray-300">
                {Math.round(weather.visibility / 1000)} km
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <i className={`fas fa-compress-arrows-alt ${tempColors.icon}`}></i>
              <span className="text-gray-600 dark:text-gray-300">
                {weather.main.pressure} hPa
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
