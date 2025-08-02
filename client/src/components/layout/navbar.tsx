import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: "fas fa-home" },
    { path: "/forecast", label: "Forecast", icon: "fas fa-calendar-alt" },
    { path: "/favorites", label: "Favorites", icon: "fas fa-heart" },
    { path: "/about", label: "About", icon: "fas fa-info-circle" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-light dark:glass-dark border-b border-white/20 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-purple-500 dark:from-purple-400 dark:to-cyan-400 rounded-lg flex items-center justify-center">
              <i className="fas fa-cloud-sun text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              WeatherGlass
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg transition-colors font-medium ${
                  isActive(link.path)
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
              >
                <i className={`${link.icon} mr-2`}></i>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="md:hidden p-2 rounded-lg bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-800 dark:text-white" />
              ) : (
                <Menu className="w-5 h-5 text-gray-800 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20 dark:border-white/10">
            <div className="flex flex-col space-y-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "text-purple-600 dark:text-purple-400 font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className={`${link.icon} mr-2`}></i>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
