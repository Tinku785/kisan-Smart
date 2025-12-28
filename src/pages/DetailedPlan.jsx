import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { mockLandData } from '../data/mockdata';

const DetailedPlan = () => {
  const data = mockLandData.recommendation;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4 max-w-xl">
        {/* Header with back button */}
        <div className="flex items-center gap-2 mb-6">
            <Link to="/dashboard" className="text-kisan-green font-bold">← Back to Dashboard</Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Detailed Plan</h1>
        <p className="text-lg text-gray-600 mb-6">{mockLandData.recommendation.currentCrop} followed by <span className="font-bold text-kisan-green">{mockLandData.recommendation.nextCrop}</span></p>

        {/* Sowing Window Card */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">🗓️ Optimal Sowing Time</h2>
          <div className="bg-kisan-light-green p-4 rounded-lg text-center border border-kisan-green">
              <p className="text-2xl font-bold text-kisan-green">{data.sowingWindow}</p>
              <p className="text-sm text-gray-600 mt-1">Based on monsoon forecast for your district.</p>
          </div>
        </div>

        {/* AI Rationale Card */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">🧠 AI Scientific Rationale</h2>
          <div className="flex gap-3">
              <div className="text-3xl">🌱</div>
              <p className="text-gray-700 leading-relaxed">{data.reason}</p>
          </div>
        </div>

         {/* Expected Benefits Card */}
         <div className="bg-white p-6 rounded-xl shadow-md mb-4 bg-gradient-to-r from-green-50 to-blue-50">
          <h2 className="text-xl font-bold mb-4 text-gray-800">💰 Expected Benefits</h2>
          <ul className="space-y-3">
              <li className="flex items-center gap-2">
                  <span className="text-green-600 text-xl">📈</span>
                  <span className="font-bold">{data.expectedBenefits.yieldIncrease}</span> increase in yield.
              </li>
              <li className="flex items-center gap-2">
                  <span className="text-green-600 text-xl">💵</span>
                  <span className="font-bold">{data.expectedBenefits.costSaving}</span> approx cost saving.
              </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default DetailedPlan;