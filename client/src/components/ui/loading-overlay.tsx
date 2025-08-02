import { useEffect, useState } from "react";

interface LoadingOverlayProps {
  isVisible?: boolean;
  message?: string;
}

export default function LoadingOverlay({ 
  isVisible = false, 
  message = "Loading Weather Data" 
}: LoadingOverlayProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Add slight delay to prevent flashing on quick requests
    if (isVisible) {
      const timer = setTimeout(() => setShow(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <div className="glass-light dark:glass-dark rounded-2xl p-8 border border-white/20 dark:border-white/10 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-purple-500 dark:from-purple-400 dark:to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
          <i className="fas fa-cloud-sun text-2xl text-white"></i>
        </div>
        <div className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {message}
        </div>
        <div className="text-gray-600 dark:text-gray-300">Please wait...</div>
      </div>
    </div>
  );
}
