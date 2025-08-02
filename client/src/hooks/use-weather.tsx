import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { WeatherAPI } from "@/lib/weather-api";
import { WeatherData, ForecastData } from "@/types/weather";

export function useCurrentWeather(city: string, enabled = true) {
  return useQuery<WeatherData>({
    queryKey: ["weather", "current", city],
    queryFn: () => WeatherAPI.getCurrentWeather(city),
    enabled: enabled && !!city,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });
}

export function useCurrentWeatherByCoords(lat: number, lon: number, enabled = true) {
  return useQuery<WeatherData>({
    queryKey: ["weather", "current", "coords", lat, lon],
    queryFn: () => WeatherAPI.getCurrentWeatherByCoords(lat, lon),
    enabled: enabled && lat !== 0 && lon !== 0,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });
}

export function useForecast(city: string, enabled = true) {
  return useQuery<ForecastData>({
    queryKey: ["weather", "forecast", city],
    queryFn: () => WeatherAPI.getForecast(city),
    enabled: enabled && !!city,
    staleTime: 15 * 60 * 1000, // 15 minutes
    refetchInterval: 30 * 60 * 1000, // 30 minutes
  });
}

export function useForecastByCoords(lat: number, lon: number, enabled = true) {
  return useQuery<ForecastData>({
    queryKey: ["weather", "forecast", "coords", lat, lon],
    queryFn: () => WeatherAPI.getForecastByCoords(lat, lon),
    enabled: enabled && lat !== 0 && lon !== 0,
    staleTime: 15 * 60 * 1000,
    refetchInterval: 30 * 60 * 1000,
  });
}

export function useGeocoding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: WeatherAPI.geocodeCity,
    onSuccess: () => {
      // Optionally invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["weather"] });
    },
  });
}
