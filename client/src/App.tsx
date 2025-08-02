import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./hooks/use-theme";
import Navbar from "./components/layout/navbar";
import Home from "./pages/home.tsx";
import Forecast from "./pages/forecast.tsx";
import Favorites from "./pages/favorites.tsx";
import About from "./pages/about.tsx";
import NotFound from "./pages/not-found";
import LoadingOverlay from "./components/ui/loading-overlay";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-cyan-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900 transition-all duration-500">
              <Navbar />
              <main className="pt-20 min-h-screen">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/forecast" element={<Forecast />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <LoadingOverlay />
              <Toaster />
            </div>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
