export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <section className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-purple-500 dark:from-purple-400 dark:to-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-cloud-sun text-3xl text-white"></i>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          About WeatherGlass
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Features */}
        <div className="glass-light dark:glass-dark rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400/20 to-purple-500/20 dark:from-purple-400/20 dark:to-cyan-400/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-star text-orange-500 dark:text-purple-400 text-xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Features</h2>
          </div>

          <ul className="space-y-4">
            {[
              "Real-time weather data",
              "Interactive map integration",
              "5-day weather forecast",
              "Favorite cities management",
              "Dark/Light mode toggle",
              "Responsive design",
            ].map((feature, index) => (
              <li key={index} className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-green-500"></i>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Stack */}
        <div className="glass-light dark:glass-dark rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400/20 to-purple-500/20 dark:from-purple-400/20 dark:to-cyan-400/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-code text-orange-500 dark:text-purple-400 text-xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Built With</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "React", icon: "fab fa-react", color: "text-blue-500" },
              { name: "Tailwind CSS", icon: "fas fa-wind", color: "text-cyan-500" },
              { name: "Leaflet.js", icon: "fas fa-map", color: "text-green-500" },
              { name: "OpenWeather", icon: "fas fa-cloud", color: "text-purple-500" },
            ].map((tech, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white/20 dark:bg-white/10 rounded-xl"
              >
                <i className={`${tech.icon} text-3xl ${tech.color} mb-2`}></i>
                <div className="text-sm font-medium text-gray-800 dark:text-white">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API Information */}
      <div className="glass-light dark:glass-dark rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400/20 to-purple-500/20 dark:from-purple-400/20 dark:to-cyan-400/20 rounded-xl flex items-center justify-center">
            <i className="fas fa-database text-orange-500 dark:text-purple-400 text-xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Data Sources</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              OpenWeather API
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Provides accurate and up-to-date weather information for locations worldwide.
            </p>
            <div className="space-y-2 text-sm">
              {[
                { icon: "fas fa-thermometer-half", text: "Current weather conditions", color: "text-red-500" },
                { icon: "fas fa-calendar-alt", text: "5-day/3-hour forecasts", color: "text-blue-500" },
                { icon: "fas fa-map-marker-alt", text: "Geolocation-based weather", color: "text-green-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <i className={`${item.icon} ${item.color}`}></i>
                  <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Interactive Maps
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              High-quality mapping service for location selection and visualization.
            </p>
            <div className="space-y-2 text-sm">
              {[
                { icon: "fas fa-mouse-pointer", text: "Click-to-search functionality", color: "text-purple-500" },
                { icon: "fas fa-map", text: "OpenStreetMap tiles", color: "text-orange-500" },
                { icon: "fas fa-mobile-alt", text: "Mobile-optimized interface", color: "text-cyan-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <i className={`${item.icon} ${item.color}`}></i>
                  <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
