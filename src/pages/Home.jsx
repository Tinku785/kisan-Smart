import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const Home = () => {
  const { t } = useLanguage();

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", bounce: 0.3 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Full Viewport Height with Modern Gradient Overlay */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Slow Zoom Effect */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1625246333195-bfk044431f0?q=80&w=2670&auto=format&fit=crop)', // High quality farm aerial view
          }}
        >
          {/* Multi-layer Gradient Overlay for Text Readability & Mood */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center mt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >

            {/* Pill Badge */}
            <motion.div variants={heroVariants}>
              <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-semibold tracking-wide text-green-300 shadow-lg hover:bg-white/20 transition-colors cursor-default">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {t('home.heroBadge')}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={heroVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl"
            >
              {t('home.heroTitle1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400">
                {t('home.heroTitle2')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={heroVariants}
              className="text-lg md:text-2xl text-gray-200 font-medium max-w-3xl mx-auto leading-relaxed opacity-90 text-shadow-sm"
            >
              {t('home.heroSubtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={heroVariants}
              className="flex flex-col sm:flex-row gap-5 justify-center pt-8"
            >
              <Link
                to="/locate"
                className="group relative inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 shadow-[0_10px_30px_rgba(22,163,74,0.4)] hover:shadow-[0_15px_40px_rgba(22,163,74,0.6)] transform hover:-translate-y-1"
              >
                <span className="mr-3">{t('home.cta')}</span>
                <span className="group-hover:translate-x-1 transition-transform text-xl">→</span>
              </Link>

              <button className="px-10 py-4 rounded-full border-2 border-white/30 text-white font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-white/50">
                Learn More
              </button>
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </div>

      {/* Stats/Trust Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-white py-12 border-b border-gray-100 relative z-20 -mt-8 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] mx-4 md:mx-8"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-center">
            <div className="group cursor-default">
              <h3 className="text-4xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">10k+</h3>
              <p className="text-gray-500 uppercase text-xs font-bold tracking-wider mt-1">Farmers Helped</p>
            </div>
            <div className="group cursor-default">
              <h3 className="text-4xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">50+</h3>
              <p className="text-gray-500 uppercase text-xs font-bold tracking-wider mt-1">Districts Covered</p>
            </div>
            <div className="group cursor-default">
              <h3 className="text-4xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">95%</h3>
              <p className="text-gray-500 uppercase text-xs font-bold tracking-wider mt-1">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Feature Cards Section */}
      <div className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 animate-pulse-slow"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Why Choose <span className="text-green-600">{t('appName')}</span>?</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We leverage cutting-edge satellite imagery and AI to provide precise, actionable farming insights directly to your phone.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >

            {/* Card 1 - Yield */}
            <motion.div variants={cardVariants} className="group bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-green-900/10 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-3xl text-white mb-8 shadow-lg shadow-green-200 relative z-10 group-hover:rotate-6 transition-transform">
                📈
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-700 transition-colors">{t('home.features.yield.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('home.features.yield.desc')}</p>
            </motion.div>

            {/* Card 2 - Weather */}
            <motion.div variants={cardVariants} className="group bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-900/10 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl text-white mb-8 shadow-lg shadow-blue-200 relative z-10 group-hover:rotate-6 transition-transform">
                🌦️
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-700 transition-colors">{t('home.features.weather.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('home.features.weather.desc')}</p>
            </motion.div>

            {/* Card 3 - Soil */}
            <motion.div variants={cardVariants} className="group bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-amber-900/10 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl text-white mb-8 shadow-lg shadow-amber-200 relative z-10 group-hover:rotate-6 transition-transform">
                🌱
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-amber-700 transition-colors">{t('home.features.soil.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('home.features.soil.desc')}</p>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Footer is same but can be styled if needed, keeping basic for now */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <span className="text-green-500">🌾</span> {t('appName')}
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">Empowering Indian Farmers with Technology to achieve better yields and sustainable growth.</p>
          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-500">
            © 2025 KisanSmart AgTech Pvt Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;