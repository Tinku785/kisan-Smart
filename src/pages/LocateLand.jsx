import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const LocateLand = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('input'); // input, scanning, found, error
  const [log, setLog] = useState('Ready to initialize GPS...');
  const [coords, setCoords] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Function to Get Real Location
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      return;
    }

    setStatus('scanning');
    setLog('Requesting permissions...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success Callback
        const { latitude, longitude } = position.coords;
        setLog(`Locked: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setCoords({ lat: latitude, lng: longitude });

        // Simulate further satellite handshake for effect
        setTimeout(() => setLog('Triangulating local satellites...'), 800);
        setTimeout(() => setLog('Fetching Soil Database...'), 1600);
        setTimeout(() => setStatus('found'), 2500);
      },
      (error) => {
        // Error Callback
        setStatus('error');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMsg("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMsg("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setErrorMsg("The request to get user location timed out.");
            break;
          default:
            setErrorMsg("An unknown error occurred.");
            break;
        }
      },
      {
        enableHighAccuracy: true, // Request best possible results (GPS)
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    if (status === 'found') {
      // Auto redirect after found
      const redirectTimer = setTimeout(() => {
        navigate('/dashboard');
      }, 4000);
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

      <div className="flex-grow flex flex-col items-center justify-center p-4 text-center z-10 mt-16 max-w-2xl mx-auto w-full">

        {/* Status: ERROR */}
        {status === 'error' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-900/20 border border-red-500 p-8 rounded-2xl backdrop-blur-md">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-400 mb-2">GPS Signal Lost</h2>
            <p className="text-gray-300 mb-6">{errorMsg}</p>
            <button
              onClick={() => setStatus('input')}
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-bold transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Step 1: Manual Input or GPS */}
        {status === 'input' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-gray-800/60 p-8 rounded-3xl border border-gray-700 backdrop-blur-xl shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 mb-6 tracking-tight">Locate Your Farm</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl border border-gray-700 text-left">
                  <label className="text-xs text-green-400 font-bold uppercase tracking-widest block mb-1">Use GPS Satellite</label>
                  <p className="text-gray-400 text-sm mb-4">Auto-detect location using device sensors.</p>
                  <button
                    onClick={handleUseLocation}
                    className="w-full group bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2"
                  >
                    <span>Get Current Location</span>
                    <span className="group-hover:animate-ping text-xs">📍</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center md:hidden">
                  <span className="bg-gray-800 text-gray-400 px-2 text-sm">OR</span>
                </div>
                <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 flex-col items-center h-full justify-center">
                  <div className="h-full w-px bg-gray-700"></div>
                </div>

                <div className="text-left md:pl-4">
                  <label className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2 block">Enter Patta Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 124/B"
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none font-mono tracking-widest mb-3 transition-colors"
                  />
                  <button
                    onClick={() => { setStatus('scanning'); setLog('Searching Database...'); setTimeout(() => setStatus('found'), 2000); }}
                    className="w-full border border-gray-600 hover:bg-gray-700 text-gray-300 font-bold py-3 rounded-lg transition-all"
                  >
                    Manual Search
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {status === 'scanning' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            {/* Radar Animation */}
            <div className="relative w-64 h-64 mb-10 flex items-center justify-center">
              <div className="absolute inset-0 border border-green-500/30 rounded-full animate-ping shadow-[0_0_50px_rgba(34,197,94,0.2)]"></div>
              <div className="absolute inset-8 border border-green-500/50 rounded-full animate-pulse"></div>
              {/* Spinning Radar Line */}
              <div className="absolute inset-0 rounded-full overflow-hidden animate-spin-slow">
                <div className="h-1/2 w-full bg-gradient-to-t from-green-500/20 to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl filter drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">🛰️</span>
              </div>
            </div>

            <h2 className="text-4xl font-black text-white mb-4 tracking-widest uppercase glitch-text">Establishing Link</h2>

            <div className="w-full max-w-sm bg-black/40 rounded-lg border border-green-900/50 p-4 font-mono text-sm text-green-400">
              <span className="mr-2 text-green-600">$</span>
              <span className="typing-effect">{log}</span>
              <span className="animate-blink">_</span>
            </div>
          </motion.div>
        )}

        {status === 'found' && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-lg bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
            {/* Map Placeholder or Real Map Frame */}
            <div className="h-48 bg-gray-700 relative overflow-hidden group">
              {/* Simulated Map View */}
              {coords ? (
                <iframe
                  title="Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.01}%2C${coords.lat - 0.01}%2C${coords.lng + 0.01}%2C${coords.lat + 0.01}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`}
                  className="opacity-80 group-hover:opacity-100 transition-opacity"
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500">Map Data Simulated</div>
              )}
              <div className="absolute inset-0 pointer-events-none border-t-4 border-b-4 border-l-4 border-r-4 border-transparent/50"></div>
            </div>

            <div className="p-8 text-center bg-gray-900/90 backdrop-blur-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-6 shadow-[0_0_30px_rgba(34,197,94,0.6)]">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">Location Verified</h2>

              {coords && (
                <div className="mb-4 inline-block bg-gray-800 px-3 py-1 rounded text-xs text-gray-400 font-mono">
                  LAT: {coords.lat.toFixed(6)} | LNG: {coords.lng.toFixed(6)}
                </div>
              )}

              <div className="bg-green-900/20 p-4 rounded-xl border border-green-800/50 mb-6">
                <p className="text-xl text-green-400 font-bold mb-1">Ramnagar Field #4</p>
                <p className="text-gray-400 text-sm">Soil Profile Loaded Successfully</p>
              </div>

              <p className="text-gray-500 text-sm animate-pulse">Redirecting to Dashboard...</p>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default LocateLand;