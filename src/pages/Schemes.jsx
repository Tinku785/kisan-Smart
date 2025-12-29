import React from 'react';
import Navbar from '../components/Navbar';
import { mockSchemes, mockLandData } from '../data/mockData';

const Schemes = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-24 max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Recommended Schemes</h1>
                <p className="text-gray-500 mb-8">
                    Personalized government scheme suggestions for <strong>{mockLandData.landDetails.owner}</strong>.
                </p>

                <div className="space-y-6">
                    {mockSchemes.map((scheme) => (
                        <div key={scheme.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase rounded-full tracking-wide">
                                            {scheme.category}
                                        </span>
                                        <span className="text-sm text-gray-400 font-medium">Match Probability: <span className="text-green-600 font-bold">{scheme.probability}</span></span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-2">{scheme.name}</h2>
                                    <p className="text-gray-600 mb-4">{scheme.benefit}</p>

                                    <div className="bg-gray-50 rounded-lg p-3 text-sm border-l-4 border-blue-400">
                                        <span className="font-semibold text-gray-700">Eligibility:</span> {scheme.eligibility}
                                    </div>
                                </div>
                                <div className="flex-shrink-0 w-full md:w-auto">
                                    <button className="w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition-colors">
                                        Check Eligibility
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Schemes;
