import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

// Import pages
import Home from './pages/Home';
import LocateLand from './pages/LocateLand';
import Dashboard from './pages/Dashboard';
import DetailedPlan from './pages/DetailedPlan';
import LearningCenter from './pages/LearningCenter';
import Schemes from './pages/Schemes';
import ChatBot from './components/ChatBot';

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
          <Route path="/learning-center" element={<LearningCenter />} />
          <Route path="/schemes" element={<Schemes />} />
        </Routes>
        <ChatBot />
      </Router>
    </LanguageProvider>
  );
}

export default App;