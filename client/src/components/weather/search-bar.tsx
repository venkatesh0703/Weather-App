import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useGeocoding } from "@/hooks/use-weather";
import { GeocodingResult } from "@/types/weather";

interface SearchBarProps {
  onLocationSelect: (location: GeocodingResult) => void;
  className?: string;
}

export default function SearchBar({ onLocationSelect, className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const geocoding = useGeocoding();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const results = await geocoding.mutateAsync(query);
      setSuggestions(results);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Search failed:", error);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (location: GeocodingResult) => {
    onLocationSelect(location);
    setQuery(`${location.name}, ${location.country}`);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`} style={{ zIndex: 1000 }}>
      <div className="glass-light dark:glass-dark rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative" style={{ zIndex: 1001 }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter city name..."
              className="w-full px-4 py-3 bg-white/50 dark:bg-white/10 border border-white/30 dark:border-white/20 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-300"
            />
            
            {showSuggestions && suggestions.length > 0 && (
              <div 
                className="search-suggestions absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 z-[9999] max-h-64 overflow-y-auto"
                style={{ position: 'absolute', zIndex: 9999, pointerEvents: 'auto' }}
              >
                <div className="p-2 space-y-1">
                  {suggestions.map((location, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-all duration-200 flex items-center space-x-3"
                      onClick={() => handleSuggestionClick(location)}
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-purple-500 dark:from-purple-400 dark:to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-map-marker-alt text-white text-sm"></i>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 dark:text-white">
                          {location.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {location.state && `${location.state}, `}{location.country}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleSearch}
            disabled={geocoding.isPending}
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-purple-500 dark:from-purple-400 dark:to-cyan-400 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="w-4 h-4 mr-2 inline" />
            {geocoding.isPending ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
}
