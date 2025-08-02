import { useState, useCallback } from "react";
import { GeocodingResult } from "@/types/weather";

interface LocationState {
  selectedLocation: GeocodingResult | null;
  setSelectedLocation: (location: GeocodingResult | null) => void;
  clearLocation: () => void;
}

// Global location state to share between components
let globalLocationState: GeocodingResult | null = null;
const locationStateListeners: ((location: GeocodingResult | null) => void)[] = [];

export const useLocationState = (): LocationState => {
  const [selectedLocation, setLocalSelectedLocation] = useState<GeocodingResult | null>(globalLocationState);

  const setSelectedLocation = useCallback((location: GeocodingResult | null) => {
    globalLocationState = location;
    setLocalSelectedLocation(location);
    // Notify all components using this hook
    locationStateListeners.forEach(listener => listener(location));
  }, []);

  const clearLocation = useCallback(() => {
    setSelectedLocation(null);
  }, [setSelectedLocation]);

  // Subscribe to global state changes
  useState(() => {
    const listener = (location: GeocodingResult | null) => {
      setLocalSelectedLocation(location);
    };
    locationStateListeners.push(listener);
    return () => {
      const index = locationStateListeners.indexOf(listener);
      if (index > -1) locationStateListeners.splice(index, 1);
    };
  });

  return {
    selectedLocation,
    setSelectedLocation,
    clearLocation,
  };
};