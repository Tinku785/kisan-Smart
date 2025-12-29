import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { mockLandData, mockSoilCredits } from '../data/mockData';

const Dashboard = () => {
  const data = mockLandData;

  // -- STATE DEFINITIONS --
  const [realWeather, setRealWeather] = React.useState(null);
  const [userName, setUserName] = React.useState(data.landDetails.owner);
  const [villageName, setVillageName] = React.useState(data.landDetails.village);

  // -- SIDE EFFECTS (DATA FETCHING) --
  React.useEffect(() => {
    // 1. Random Name Generator
    const names = ["Rajesh Kumar", "Suresh Reddy", "Amit Patel", "Vihaan Singh", "Arjun Das", "Kavita Devi", "Lakshmi Narayana"];
    setUserName(names[Math.floor(Math.random() * names.length)]);

    // 2. Fetch Real Weather & Location
    const fetchData = async () => {
      try {
        const { lat, lng } = data.landDetails.coordinates;

        // Fetch Weather and Location in parallel
        const [weatherRes, locationRes] = await Promise.all([
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`),
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
        ]);

        const weatherResult = await weatherRes.json();
        const locationResult = await locationRes.json();

        // Process Weather
        if (weatherResult.current_weather) {
          const wmoCode = weatherResult.current_weather.weathercode;
          let condition = "Clear Sky";
          // Simple WMO code mapping
          if (wmoCode > 0 && wmoCode <= 3) condition = "Partly Cloudy";
          else if (wmoCode > 45 && wmoCode <= 48) condition = "Foggy";
          else if (wmoCode >= 51 && wmoCode <= 67) condition = "Rainy";
          else if (wmoCode >= 71) condition = "Snow/Ice";
          else if (wmoCode >= 95) condition = "Thunderstorm";

          setRealWeather({
            temp: weatherResult.current_weather.temperature,
            condition: condition,
            advisory: `Real-time: Wind ${weatherResult.current_weather.windspeed} km/h. Good for field work.`,
            isGoodForSowing: wmoCode < 60
          });
        }

        // Process Location
        if (locationResult) {
          // Try to find the most specific locality name
          const loc = locationResult.locality || locationResult.city || locationResult.town || locationResult.village;
          const region = locationResult.principalSubdivision;

          if (loc) {
            setVillageName(region ? `${loc}, ${region}` : loc);
          }
        }

      } catch (error) {
        console.error("Data fetch failed", error);
        // Fallbacks are already set in initial state or via OR logic below
      }
    };

    fetchData();
  }, [data.landDetails.coordinates]); // Run once on mount

  // Computed Values
  const displayWeather = realWeather || data.weather;

  // Chart Data
  const soilChartData = [
    { subject: 'Nitrogen (N)', A: 40, B: 100, fullMark: 100 },
    { subject: 'Phosphorus (P)', A: 75, B: 100, fullMark: 100 },
    { subject: 'Potassium (K)', A: 70, B: 100, fullMark: 100 },
    { subject: 'Organic C', A: 90, B: 100, fullMark: 100 },
    { subject: 'Moisture', A: 85, B: 100, fullMark: 100 },
    { subject: 'pH Balance', A: 95, B: 100, fullMark: 100 },
  ];

  const historyData = [
    { date: 'Jan', points: 650 },
    { date: 'Feb', points: 680 },
    { date: 'Mar', points: 720 },
    { date: 'Apr', points: 800 },
    { date: 'May', points: 850 },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-24 max-w-6xl">
        {/* Header Context */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-200 pb-6 gap-4"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              Hello, {userName} <span className="inline-block animate-wave origin-bottom-right">👋</span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Dashboard for <span className="font-semibold text-gray-700">{villageName}</span> • ID: {data.landDetails.pattaNumber}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-sm border border-gray-100 text-sm flex items-center gap-2">
            <span className="text-gray-500">Season:</span>
            <span className="font-bold text-green-700 bg-green-50 px-2 py-1 rounded-md">{data.recommendation.season}</span>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >

          {/* Weather Widget (Span 1) */}
          <motion.div
            variants={itemVariants}
            className={`col-span-1 p-8 rounded-3xl shadow-xl transform transition-all duration-300 relative overflow-hidden group ${displayWeather.isGoodForSowing ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white' : 'bg-red-50 text-red-700'}`}
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-10 -translate-y-10">
              <svg width="120" height="120" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8z" /></svg>
            </div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <h3 className="font-semibold opacity-90 text-lg uppercase tracking-wider">Live Forecast</h3>
              <span className="text-4xl filter drop-shadow-md">{realWeather ? '📡' : '🌤️'}</span>
            </div>
            <div className="text-6xl font-bold mb-2 relative z-10">{displayWeather.temp}°</div>
            <div className="text-xl font-medium opacity-90 mb-6 relative z-10">{displayWeather.condition}</div>
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl text-sm leading-relaxed border border-white/10 relative z-10">
              {displayWeather.advisory}
            </div>
          </motion.div>

          {/* Main Recommendation Card (Span 2) */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100/50 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-60"></div>

            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Best Crop Rotation Strategy</h2>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10 relative z-10 px-4">
              <div className="text-center group">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Harvested</p>
                <div className="text-3xl font-bold text-gray-700 group-hover:text-green-600 transition-colors">🌾 {data.recommendation.currentCrop}</div>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="w-full h-1 bg-gray-100 rounded-full relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute top-0 left-0 h-full bg-green-500 rounded-full opacity-30"
                  ></motion.div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-sm border border-gray-100 text-green-500">
                    <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </div>
              </div>

              <div className="text-center group">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Next Crop</p>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 group-hover:scale-105 transition-transform">
                  🌱 {data.recommendation.nextCrop}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
              <div className="flex gap-4">
                <span className="text-3xl">💡</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Why this choice?</h4>
                  <p className="text-gray-600 italic leading-relaxed">
                    "{data.recommendation.reason}"
                  </p>
                </div>
              </div>
            </div>

            <Link to="/detailed-plan" className="block w-full text-center bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition duration-300 shadow-xl hover:shadow-2xl translate-y-0 hover:-translate-y-1">
              View Detailed Action Plan ➔
            </Link>
          </motion.div>

          {/* Satellite Field View (Span 3 - Full Width) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-3 bg-white p-1 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-12 bg-gray-900/80 backdrop-blur-md z-10 flex items-center justify-between px-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> LIVE SATELLITE FEED
              </h3>
              <span className="text-green-400 text-xs font-mono">My Field: {data.landDetails.coordinates.lat}, {data.landDetails.coordinates.lng}</span>
            </div>

            {/* Map Container */}
            <div className="w-full h-80 bg-gray-200 relative rounded-2xl overflow-hidden mt-0">
              <iframe
                title="Satellite Field View"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://maps.google.com/maps?q=${data.landDetails.coordinates.lat},${data.landDetails.coordinates.lng}&t=k&z=19&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
              ></iframe>

              {/* Overlay UI */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-bold shadow-lg">
                NDVI Index: <span className="text-green-600">0.76 (Healthy)</span>
              </div>
            </div>
          </motion.div>

          {/* Advanced Soil Analytics (Charts) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <span className="bg-blue-100 p-2 rounded-lg text-blue-600 text-xl">🧪</span>
                Deep Soil Analytics
              </h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Ideal</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Actual</span>
              </div>
            </div>

            <div className="flex-grow min-h-[300px] flex items-center justify-center -ml-6">
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={soilChartData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Ideal Levels"
                    dataKey="B"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="#10b981"
                    fillOpacity={0.1}
                  />
                  <Radar
                    name="Your Soil"
                    dataKey="A"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="#3b82f6"
                    fillOpacity={0.4}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                <span className="text-xs text-red-500 font-bold uppercase">Critical Attention</span>
                <p className="font-semibold text-gray-800">Nitrogen Levels Low</p>
              </div>
              <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                <span className="text-xs text-green-500 font-bold uppercase">Optimal Status</span>
                <p className="font-semibold text-gray-800">Moisture & pH Good</p>
              </div>
            </div>
          </motion.div>

          {/* Soil Credits & Rewards */}
          <motion.div variants={itemVariants} className="col-span-1 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">🏆</span> Soil Health Credits
            </h3>

            <div className="text-center mb-6">
              <div className="inline-block p-4 rounded-full bg-gradient-to-tr from-yellow-200 to-amber-100 border-4 border-white shadow-lg mb-2 relative">
                <span className="text-4xl font-black text-amber-600">{mockSoilCredits.currentPoints}</span>
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">NEW</div>
              </div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">{mockSoilCredits.tier} Member</p>
            </div>

            <div className="h-32 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historyData}>
                  <defs>
                    <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="points" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorPoints)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <Link to="/schemes" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">📜</div>
                  <div className="text-sm font-semibold text-gray-700">Scheme Matches</div>
                </div>
                <span className="text-xs font-bold bg-purple-200 text-purple-800 px-2 py-1 rounded-md group-hover:scale-105 transition-transform">3 New</span>
              </Link>
              <Link to="/learning-center" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">📺</div>
                  <div className="text-sm font-semibold text-gray-700">New Technique Videos</div>
                </div>
                <span className="text-xs font-bold bg-blue-200 text-blue-800 px-2 py-1 rounded-md group-hover:scale-105 transition-transform">5+</span>
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;