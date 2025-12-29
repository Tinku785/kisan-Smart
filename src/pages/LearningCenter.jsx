import React from 'react';
import Navbar from '../components/Navbar';
import { mockVideos } from '../data/mockData';

const LearningCenter = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-24 max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning Center</h1>
                <p className="text-gray-500 mb-8">Curated agricultural practices and techniques for you.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockVideos.map((video) => (
                        <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="relative h-48 bg-gray-200">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-10 transition-all cursor-pointer">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center pl-1 shadow-lg">
                                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                    {video.duration}
                                </span>
                            </div>
                            <div className="p-4">
                                <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full mb-2">
                                    {video.category}
                                </span>
                                <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{video.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default LearningCenter;
