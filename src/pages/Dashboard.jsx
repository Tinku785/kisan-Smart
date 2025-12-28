import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
// Import the fake data
import { mockLandData } from '../data/mockData';

const Dashboard = () => {
  const data = mockLandData;

  // Helper for soil status colors
  const getStatusColor = (status) => {
    if (status === 'critical' || status === 'low') return 'bg-red-500';
    if (status === 'good' || status === 'neutral') return 'bg-green-500';
    return 'bg-yellow-500';
  };

  const getStatusText = (status) => {
    if (status === 'critical' || status === 'low') return 'text-red-600 font-bold';
    if (status === 'good' || status === 'neutral') return 'text-green-600 font-bold';
    return 'text-yellow-600 font-bold';
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-24 max-w-5xl">
        {/* Header Context */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b pb-4 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Hello, {data.landDetails.owner} 👋</h1>
            <p className="text-gray-500 mt-1">Village: <span className="font-semibold text-gray-700">{data.landDetails.village}</span> • Land ID: {data.landDetails.pattaNumber}</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 text-sm">
            <span className="text-gray-500">Season:</span> <span className="font-bold text-green-700">{data.recommendation.season}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Weather Widget (Span 1) */}
          <div className={`col-span-1 p-6 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 ${data.weather.isGoodForSowing ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' : 'bg-red-50 text-red-700'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold opacity-90">Weather Forecast</h3>
              <span className="text-3xl">🌤️</span>
            </div>
            <div className="text-4xl font-bold mb-1">{data.weather.temp}°C</div>
            <div className="text-lg font-medium opacity-90 mb-4">{data.weather.condition}</div>
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-lg text-sm leading-relaxed">
              {data.weather.advisory}
            </div>
          </div>

          {/* Main Recommendation Card (Span 2) */}
          <div className="col-span-1 md:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16"></div>

            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-green-500 rounded-full"></span> Best Rotation Plan
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">Current</p>
                <p className="text-2xl font-bold text-gray-700">🌾 {data.recommendation.currentCrop}</p>
              </div>

              <div className="flex-1 border-t-2 border-dashed border-gray-200 relative mx-4 hidden md:block">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-green-500 text-xl font-bold">➔</div>
              </div>
              <div className="md:hidden text-2xl text-green-500">⬇️</div>

              <div className="text-center md:text-right">
                <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">Recommended</p>
                <p className="text-3xl font-bold text-green-600">🌱 {data.recommendation.nextCrop}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-gray-700 italic border-l-4 border-green-500 pl-4">
                "{data.recommendation.reason.substring(0, 120)}..."
              </p>
            </div>

            <Link to="/detailed-plan" className="inline-flex items-center justify-center w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition duration-300 shadow-md">
              View Comprehensive Plan & Benefits ➔
            </Link>
          </div>

          {/* Soil Health Snapshot (Span 3 - Full Row) */}
          <div className="col-span-1 md:col-span-3 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="text-2xl">🧪</span> Quick Soil Analysis
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* N */}
              <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all">
                <p className="text-gray-500 text-sm font-medium mb-2">Nitrogen (N)</p>
                <div className="relative h-3 w-full bg-gray-200 rounded-full mb-2 overflow-hidden">
                  <div className={`absolute left-0 top-0 h-full ${getStatusColor(data.soilHealth.nitrogen.status)}`} style={{ width: '30%' }}></div>
                </div>
                <p className={`${getStatusText(data.soilHealth.nitrogen.status)}`}>{data.soilHealth.nitrogen.level}</p>
              </div>

              {/* P */}
              <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all">
                <p className="text-gray-500 text-sm font-medium mb-2">Phosphorus (P)</p>
                <div className="relative h-3 w-full bg-gray-200 rounded-full mb-2 overflow-hidden">
                  <div className={`absolute left-0 top-0 h-full ${getStatusColor(data.soilHealth.phosphorus.status)}`} style={{ width: '70%' }}></div>
                </div>
                <p className={`${getStatusText(data.soilHealth.phosphorus.status)}`}>{data.soilHealth.phosphorus.level}</p>
              </div>

              {/* K */}
              <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all">
                <p className="text-gray-500 text-sm font-medium mb-2">Potassium (K)</p>
                <div className="relative h-3 w-full bg-gray-200 rounded-full mb-2 overflow-hidden">
                  <div className={`absolute left-0 top-0 h-full ${getStatusColor(data.soilHealth.potassium.status)}`} style={{ width: '60%' }}></div>
                </div>
                <p className={`${getStatusText(data.soilHealth.potassium.status)}`}>{data.soilHealth.potassium.level}</p>
              </div>

              {/* pH */}
              <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all">
                <p className="text-gray-500 text-sm font-medium mb-2">pH Level</p>
                <div className="text-2xl font-bold text-gray-800 mb-1">{data.soilHealth.pH.value}</div>
                <span className="px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-700 uppercase">
                  {data.soilHealth.pH.status}
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;