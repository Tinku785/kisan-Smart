import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On non-home pages, always show solid background
  const navClass = (isHome && !isScrolled)
    ? 'bg-transparent py-6'
    : 'bg-kisan-green/90 backdrop-blur-md shadow-lg py-4';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 text-white transition-all duration-300 ${navClass}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo linking to Home */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 tracking-tight group">
          <span className="transform group-hover:scale-110 transition-transform duration-300">🌾</span> {t('appName')}
        </Link>
        <div>
          {/* Working Language Dropdown */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm px-3 py-1 rounded-full font-medium outline-none transition-colors cursor-pointer text-sm font-sans"
          >
            <option value="en" className="text-gray-800">🇺🇸 English</option>
            <option value="hi" className="text-gray-800">🇮🇳 हिंदी</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;