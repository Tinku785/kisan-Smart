import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like fix */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1628711466395-9274291563f8?q=80&w=2670&auto=format&fit=crop)', // Banana farm
          }}
        >
          {/* Detailed Overlay Gradient - reduced opacity so image pops more */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-black/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white mt-16">
          <div className="animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-green-500/30 border border-green-400/50 backdrop-blur-md text-sm font-semibold tracking-wide mb-4 text-green-100">
              {t('home.heroBadge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg">
              {t('home.heroTitle1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-yellow-300">
                {t('home.heroTitle2')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200 font-light leading-relaxed">
              {t('home.heroSubtitle')}
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link
                to="/locate"
                className="group relative bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.5)] transform hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('home.cta')} <span className="text-xl transition-transform group-hover:translate-x-1">➔</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Section (Floating Glass) */}
      <div className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Why {t('appName')}?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">We combine ancient wisdom with modern satellite technology to give you the most accurate recommendations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">📈</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('home.features.yield.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('home.features.yield.desc')}</p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">🌦️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('home.features.weather.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('home.features.weather.desc')}</p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-2">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">🌱</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('home.features.soil.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('home.features.soil.desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">🌾 {t('appName')}</h2>
          <p className="text-gray-400">Empowering Indian Farmers with Technology</p>
          <div className="mt-8 text-sm text-gray-500">
            © 2024 KisanSmart AgTech Pvt Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;