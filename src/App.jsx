import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

// Import pages
import Home from './pages/Home';
import LocateLand from './pages/LocateLand';
import Dashboard from './pages/Dashboard';
import DetailedPlan from './pages/DetailedPlan';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Define the routes */}
          <Route path="/" element={<Home />} />
          <Route path="/locate" element={<LocateLand />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detailed-plan" element={<DetailedPlan />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;