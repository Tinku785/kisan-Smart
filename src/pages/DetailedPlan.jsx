import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { mockLandData } from '../data/mockData';
import { motion } from 'framer-motion';

const DetailedPlan = () => {
  const data = mockLandData.recommendation;
  const land = mockLandData.landDetails;

  // Simulated Timeline Data for the visual plan
  const planTimeline = [
    {
      phase: "Soil Preparation",
      date: "May 20 - June 10",
      action: "Deep ploughing & Rhizobium treatment",
      detail: "Apply 2 tons/acre farmyard manure. Treat seeds with Rhizobium culture to enhance nitrogen fixation.",
      icon: "🚜"
    },
    {
      phase: "Sowing",
      date: data.sowingWindow,
      action: "Seed Sowing",
      detail: "Maintain 30cm x 10cm spacing. Ideal depth 3-5cm for optimal germination.",
      icon: "🌱"
    },
    {
      phase: "Irrigation",
      date: "Critical Stages",
      action: "Life saving irrigation",
      detail: "Ensure moisture during flowering and pod development stages to prevent yield loss.",
      icon: "💧"
    },
    {
      phase: "Harvest",
      date: "Oct 15 - Oct 30",
      action: "Reaping & Storage",
      detail: "Harvest when pods turn straw color. Store at <10% moisture content.",
      icon: "🌾"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 font-sans overflow-x-hidden">
      <Navbar />

      <main className="container mx-auto px-4 py-24 max-w-5xl">

        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 transition-colors font-semibold group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Dashboard
          </Link>
        </motion.div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl border border-green-100 p-8 md:p-12 mb-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-bl-full -mr-16 -mt-16 z-0"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">AI Generated Plan</span>
                <span className="text-gray-400 text-sm">for {land.owner}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-2">
                {data.nextCrop} <span className="font-light text-gray-400">Strategy</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Comprehensive roadmap to maximize yield for the {data.season} season.
              </p>
            </div>

            <div className="bg-green-600 text-white p-4 rounded-2xl shadow-lg text-center min-w-[150px]">
              <div className="text-xs uppercase font-bold opacity-80 mb-1">Expected Yield</div>
              <div className="text-3xl font-black">{data.expectedBenefits.yieldIncrease}</div>
              <div className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full inline-block mt-1">Boost</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >

          {/* Left Column: Timeline (Span 8) */}
          <div className="md:col-span-8 space-y-8">

            {/* AI Rationale (Featured) */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <svg width="150" height="150" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" /></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">🧠</span> Why this crop?
              </h3>
              <p className="text-lg leading-relaxed opacity-95 relative z-10 border-l-4 border-white/30 pl-6">
                "{data.reason}"
              </p>
              <div className="mt-6 flex gap-4 text-sm font-semibold opacity-80">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <span>🌱</span> Nitrogen Fixation
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <span>🦟</span> Pest Lifecycle Break
                </div>
              </div>
            </motion.div>

            {/* Timeline Guide */}
            <div className="relative">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-sm">📅</span>
                Action Timeline
              </h2>

              <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gray-200"></div>

              <div className="space-y-6">
                {planTimeline.map((step, index) => (
                  <motion.div
                    variants={itemVariants}
                    key={index}
                    className="relative pl-20"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 w-8 h-8 bg-white border-4 border-green-500 rounded-full z-10 flex items-center justify-center shadow-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                          {step.icon} {step.phase}
                        </h3>
                        <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full mt-2 sm:mt-0 w-fit">
                          {step.date}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-700 mb-2">{step.action}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Key Stats & Info (Span 4) */}
          <div className="md:col-span-4 space-y-6">

            {/* Cost Saving Card */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Estimated Savings</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full text-2xl">💰</div>
                <div>
                  <div className="text-3xl font-black text-gray-800">{data.expectedBenefits.costSaving}</div>
                  <div className="text-xs text-gray-400">per acre</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-xl">
                Reduced need for Urea due to natural nitrogen fixation by legume crop.
              </p>
            </motion.div>

            {/* Sowing Window Widget */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-center">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-4">Optimal Sowing Window</h3>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-400"></div>
                <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">🗓️</div>
                <div className="text-xl font-bold text-green-800 mb-1">{data.sowingWindow}</div>
                <div className="text-xs text-green-600 font-medium">Monsoon Dependent</div>
              </div>
            </motion.div>

            {/* Support Box */}
            <motion.div variants={itemVariants} className="bg-gray-900 rounded-3xl p-6 text-white text-center">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-gray-400 text-sm mb-4">Have questions about seed varieties or spacing?</p>
              <div className="bg-white/10 rounded-xl p-3 cursor-pointer hover:bg-white/20 transition-colors">
                <span className="font-bold">Chat with KisanBot 🤖</span>
              </div>
            </motion.div>

          </div>

        </motion.div>
      </main>
    </div>
  );
};

export default DetailedPlan;