import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LocateLand = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('input'); // input, scanning, found
  const [log, setLog] = useState('Initializing GPS module...');

  useEffect(() => {
    if (status === 'scanning') {
      // Simulate finding location and logs
      const logTimer1 = setTimeout(() => setLog('Triangulating satellites [3/4]...'), 500);
      const logTimer2 = setTimeout(() => setLog('Fetching Soil Health Card #AP-8822...'), 1000);

      const scanTimer = setTimeout(() => {
        setStatus('found');
      }, 1500);

      return () => {
        clearTimeout(logTimer1);
        clearTimeout(logTimer2);
        clearTimeout(scanTimer);
      };
    }

    if (status === 'found') {
      // Auto redirect after found
      const redirectTimer = setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      return () => clearTimeout(redirectTimer);
    }
  }, [status, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-mono relative overflow-hidden">
      {/* Abstract Background Tech Grid */}
      <div className="absolute inset-0 z-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, #2E7D32 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center p-4 text-center z-10 mt-16">

        {/* Step 1: Manual Input (New) */}
        {status === 'input' && (
          <div className="animate-fade-in-up w-full max-w-md bg-gray-800/50 p-8 rounded-2xl border border-gray-700 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-green-400 mb-6">Enter Land Details</h2>
            <p className="text-gray-400 mb-6 text-sm">Please enter your Patta Number / Survey Number to locate your farm record.</p>

            <div className="flex flex-col gap-4 text-left">
              <div>
                <label className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2 block">Patta Number</label>
                <input
                  type="text"
                  placeholder="e.g. 124/B"
                  className="w-full bg-gray-900 border border-green-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-green-500 outline-none font-mono tracking-widest"
                />
              </div>
              <button
                onClick={() => setStatus('scanning')}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)] mt-2"
              >
                SEARCH SATELLITE RECORDS 🛰️
              </button>
            </div>
          </div>
        )}

        {status === 'scanning' && (
          <div className="animate-fade-in flex flex-col items-center">
            {/* Same scanning logic as before */}
            <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-green-900 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-t-2 border-r-2 border-green-500 rounded-full animate-spin duration-1000"></div>
              <div className="absolute inset-4 border-b-2 border-l-2 border-green-400 rounded-full animate-spin duration-[2s] direction-reverse"></div>
              <div className="text-6xl animate-pulse">🛰️</div>
            </div>
            <h2 className="text-3xl font-bold text-green-400 mb-2 tracking-widest">LOCATING LAND</h2>
            <p className="text-gray-400 text-sm bg-black/30 px-4 py-2 rounded border border-green-800 font-mono">
              {`> ${log}`}
            </p>
          </div>
        )}

        {status === 'found' && (
          // Same found logic as before
          <div className="animate-fade-in-up flex flex-col items-center">
            <div className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center text-6xl mb-6 mx-auto border-2 border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.4)]">
              ✅
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">Target Acquired</h2>
            <div className="bg-green-900/40 p-6 rounded-xl border border-green-700 m-4 backdrop-blur-sm">
              <p className="text-2xl text-green-300 font-bold mb-1">Ramnagar</p>
              <p className="text-gray-400 text-sm">Survey No. 124/B • 1.5 Hectares</p>
            </div>
            <p className="text-gray-500 mt-4 text-sm animate-pulse">Redirecting to command center...</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default LocateLand;