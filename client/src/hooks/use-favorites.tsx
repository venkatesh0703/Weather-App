import { useState, useEffect } from "react";
import { FavoriteCity } from "@/types/weather";

const STORAGE_KEY = "weather-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        setFavorites([]);
      }
    }
  }, []);

  const saveFavorites = (newFavorites: FavoriteCity[]) => {
    setFavorites(newFavorites);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  };

  const addFavorite = (city: FavoriteCity) => {
    const exists = favorites.some(fav => fav.id === city.id);
    if (!exists) {
      saveFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (cityId: string) => {
    saveFavorites(favorites.filter(fav => fav.id !== cityId));
  };

  const isFavorite = (cityId: string) => {
    return favorites.some(fav => fav.id === cityId);
  };

  const toggleFavorite = (city: FavoriteCity) => {
    if (isFavorite(city.id)) {
      removeFavorite(city.id);
    } else {
      addFavorite(city);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}
