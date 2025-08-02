import { ForecastData } from "@/types/weather";
import { WeatherAPI } from "@/lib/weather-api";
import { getTemperatureColors } from "@/lib/temperature-colors";

interface ForecastCardProps {
  forecast: ForecastData;
  className?: string;
}

export default function ForecastCard({ forecast, className = "" }: ForecastCardProps) {
  // Group forecast data by day
  const dailyForecasts = forecast.list.reduce((days: any[], item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toDateString();
    
    const existingDay = days.find(day => day.date === dayKey);
    if (existingDay) {
      existingDay.items.push(item);
    } else {
      days.push({
        date: dayKey,
        items: [item],
        dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
        shortDate: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      });
    }
    
    return days;
  }, []).slice(0, 5); // Take only 5 days

  const getDailyStats = (items: any[]) => {
    const temps = items.map(item => item.main.temp);
    const conditions = items.map(item => item.weather[0]);
    
    return {
      minTemp: Math.round(Math.min(...temps)),
      maxTemp: Math.round(Math.max(...temps)),
      mainCondition: conditions[Math.floor(conditions.length / 2)], // Middle condition
      hourlyData: items.slice(0, 4), // First 4 entries for hourly view
    };
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {dailyForecasts.map((day, index) => {
        const stats = getDailyStats(day.items);
        const isToday = index === 0;
        
        return (
          <div
            key={day.date}
            className={`glass-light dark:glass-dark rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-800 dark:text-white">
                    {isToday ? "Today" : day.dayName}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {day.shortDate}
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${getTemperatureColors(stats.maxTemp).gradient} rounded-xl flex items-center justify-center`}>
                  <i className={`${WeatherAPI.getWeatherIconClass(stats.mainCondition.icon)} text-2xl text-white`}></i>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800 dark:text-white">
                    {stats.maxTemp}° / {stats.minTemp}°
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 capitalize">
                    {stats.mainCondition.description}
                  </div>
                </div>
              </div>

              {/* Hourly Forecast for Today */}
              {isToday && (
                <div className="flex space-x-4 overflow-x-auto pb-2 min-w-0 flex-shrink-0">
                  {stats.hourlyData.map((hour, hourIndex) => {
                    const time = new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      hour12: true,
                    });
                    
                    return (
                      <div
                        key={hourIndex}
                        className="flex-shrink-0 text-center p-3 bg-white/20 dark:bg-white/10 rounded-lg"
                      >
                        <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                          {time}
                        </div>
                        <i className={`${WeatherAPI.getWeatherIconClass(hour.weather[0].icon)} text-orange-500 dark:text-purple-400 my-2`}></i>
                        <div className="text-sm font-medium text-gray-800 dark:text-white">
                          {Math.round(hour.main.temp)}°
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Daily stats for other days */}
              {!isToday && (
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-wind text-orange-500 dark:text-purple-400"></i>
                    <span className="text-gray-600 dark:text-gray-300">
                      {Math.round(stats.hourlyData[0]?.wind.speed || 0)} km/h
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-tint text-orange-500 dark:text-purple-400"></i>
                    <span className="text-gray-600 dark:text-gray-300">
                      {stats.hourlyData[0]?.main.humidity || 0}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-umbrella text-orange-500 dark:text-purple-400"></i>
                    <span className="text-gray-600 dark:text-gray-300">
                      {Math.round((stats.hourlyData[0]?.pop || 0) * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
