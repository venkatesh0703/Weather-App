import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { WeatherData, GeocodingResult } from "@/types/weather";
import { useCurrentWeatherByCoords } from "@/hooks/use-weather";
import { WeatherAPI } from "@/lib/weather-api";
import { getTemperatureColors } from "@/lib/temperature-colors";
import "leaflet/dist/leaflet.css";

// Fix for default markers in React Leaflet
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapPanelProps {
  onLocationSelect: (location: GeocodingResult) => void;
  selectedLocation?: GeocodingResult | null;
  className?: string;
}

function MapController({ center }: { center: LatLngExpression }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 10);
  }, [center, map]);
  
  return null;
}

function MapClickHandler({ onLocationSelect }: { onLocationSelect: (location: GeocodingResult) => void }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      
      // Create a mock location result for the clicked coordinates
      const location: GeocodingResult = {
        name: `Location (${lat.toFixed(2)}, ${lng.toFixed(2)})`,
        lat,
        lon: lng,
        country: "Unknown",
      };
      
      onLocationSelect(location);
    },
  });
  
  return null;
}

export default function MapPanel({ onLocationSelect, selectedLocation, className = "" }: MapPanelProps) {
  const [clickedLocation, setClickedLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  
  const { data: weather, isLoading: weatherLoading } = useCurrentWeatherByCoords(
    clickedLocation?.lat || 0,
    clickedLocation?.lon || 0,
    !!clickedLocation
  );

  useEffect(() => {
    if (weather) {
      setWeatherData(weather);
    }
  }, [weather]);

  const handleLocationClick = (location: GeocodingResult) => {
    setClickedLocation({ lat: location.lat, lon: location.lon });
    onLocationSelect(location);
  };

  // Use selected location or default to New York
  const center: LatLngExpression = selectedLocation 
    ? [selectedLocation.lat, selectedLocation.lon] 
    : [40.7128, -74.0060];

  const getTemperatureColor = (temp: number) => {
    if (temp > 30) return "bg-red-500";
    if (temp > 20) return "bg-yellow-500";
    if (temp > 10) return "bg-blue-500";
    return "bg-purple-500";
  };

  return (
    <div className={`glass-light dark:glass-dark rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Interactive Weather Map
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Click anywhere to get weather
        </div>
      </div>

      {/* Map Container */}
      <div className="h-96 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <MapContainer
          center={center}
          zoom={8}
          className="h-full w-full"
          style={{ height: "384px", width: "100%", minHeight: "384px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapController center={center} />
          <MapClickHandler onLocationSelect={handleLocationClick} />
          
          {/* Show marker for clicked location */}
          {clickedLocation && (
            <Marker position={[clickedLocation.lat, clickedLocation.lon]}>
              <Popup>
                <div className="p-2 min-w-[200px]">
                  {weatherLoading ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mx-auto mb-2"></div>
                      <div>Loading weather...</div>
                    </div>
                  ) : weatherData ? (
                    (() => {
                      const tempColors = getTemperatureColors(weatherData.main.temp);
                      return (
                        <div className="text-center">
                          <h3 className="font-semibold text-lg mb-2">
                            {weatherData.name}, {weatherData.sys.country}
                          </h3>
                          <div className="flex items-center justify-center space-x-3 mb-3">
                            <div className={`w-12 h-12 bg-gradient-to-br ${tempColors.gradient} rounded-xl flex items-center justify-center`}>
                              <i className={`${WeatherAPI.getWeatherIconClass(weatherData.weather[0].icon)} text-xl text-white`}></i>
                            </div>
                            <div>
                              <div className={`text-2xl font-bold ${tempColors.text}`}>
                                {Math.round(weatherData.main.temp)}°C
                              </div>
                              <div className={`px-2 py-1 ${tempColors.bg} ${tempColors.text} rounded-full text-xs font-medium mb-1`}>
                                {tempColors.label}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 capitalize mb-2">
                            {weatherData.weather[0].description}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>Feels like: {Math.round(weatherData.main.feels_like)}°C</div>
                            <div>Humidity: {weatherData.main.humidity}%</div>
                            <div>Wind: {Math.round(weatherData.wind.speed)} km/h</div>
                            <div>Visibility: {Math.round(weatherData.visibility / 1000)} km</div>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="text-center text-red-500">
                      Failed to load weather data
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          )}
          
          {/* Show marker for selected location from search */}
          {selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lon]}>
              <Popup>
                <div className="text-center p-2">
                  <h3 className="font-semibold text-lg">
                    📍 {selectedLocation.name}
                  </h3>
                  <div className="text-sm text-gray-600">
                    Selected Location
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Temperature-based Color Legend */}
      <div className="mt-4 p-4 bg-white/30 dark:bg-white/10 rounded-xl">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Temperature Color Guide</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-300">🔥 Hot (&gt;30°C)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-300">☀️ Warm (20-30°C)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-300">🌤️ Cool (10-20°C)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-300">❄️ Cold (&lt;10°C)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
