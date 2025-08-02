// Temperature-based color system for modern interface
export const getTemperatureColors = (temp: number) => {
  if (temp > 30) {
    // Hot (>30°C) - Red/Orange theme
    return {
      gradient: "from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400",
      bg: "bg-red-50 dark:bg-red-900/20",
      text: "text-red-600 dark:text-red-400",
      icon: "text-red-500 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      label: "Hot",
      emoji: "🔥"
    };
  } else if (temp >= 20) {
    // Warm (20-30°C) - Orange/Yellow theme
    return {
      gradient: "from-orange-500 to-yellow-500 dark:from-orange-400 dark:to-yellow-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      text: "text-orange-600 dark:text-orange-400",
      icon: "text-orange-500 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-800",
      label: "Warm",
      emoji: "☀️"
    };
  } else if (temp >= 10) {
    // Cool (10-20°C) - Green/Teal theme
    return {
      gradient: "from-green-500 to-teal-500 dark:from-green-400 dark:to-teal-400",
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-600 dark:text-green-400",
      icon: "text-green-500 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
      label: "Cool",
      emoji: "🌤️"
    };
  } else {
    // Cold (<10°C) - Blue/Purple theme
    return {
      gradient: "from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      icon: "text-blue-500 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      label: "Cold",
      emoji: "❄️"
    };
  }
};

export const getTemperatureLabel = (temp: number): string => {
  const colors = getTemperatureColors(temp);
  return `${colors.emoji} ${colors.label} (${Math.round(temp)}°C)`;
};