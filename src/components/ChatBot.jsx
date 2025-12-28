import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { mockLandData } from '../data/mockData';

const ChatBot = () => {
    const { t, language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am your Kisan Assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const text = inputText;
        setInputText('');

        // Add user message
        const userMessage = { id: Date.now(), text: text, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        // Simulate network delay for realism
        setTimeout(() => {
            const responseText = generateResponse(userMessage.text.toLowerCase());
            const botMessage = { id: Date.now() + 1, text: responseText, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    // Context-aware AI responses based on farmer's data (Offline Mode)
    const generateResponse = (text) => {
        // Import data directly or use context
        const data = mockLandData;

        if (text.includes('weather') || text.includes('rain') || text.includes('temperature')) {
            return `Currently at your farm in ${data.landDetails.village}, it is ${data.weather.temp}°C and ${data.weather.condition}. ${data.weather.advisory}`;
        }
        if (text.includes('soil') || text.includes('health')) {
            return `Your soil report for Survey No. ${data.landDetails.pattaNumber} shows Nitrogen is ${data.soilHealth.nitrogen.level} and pH is ${data.soilHealth.pH.value}. We recommend focusing on nitrogen fixation.`;
        }
        if (text.includes('crop') || text.includes('grow') || text.includes('plant') || text.includes('sow')) {
            return `Since you are currently growing ${data.recommendation.currentCrop}, the best next crop for the ${data.recommendation.season} season is ${data.recommendation.nextCrop}. This will improve soil health and break pest cycles.`;
        }
        if (text.includes('price') || text.includes('rate') || text.includes('mandi')) {
            return `The estimated cost saving for the recommended plan is ${data.recommendation.expectedBenefits.costSaving}. Local mandi prices for ${data.recommendation.nextCrop} are currently favourable.`;
        }
        if (text.includes('hello') || text.includes('hi')) {
            return `Namaste ${data.landDetails.owner}! 🙏 I have your latest soil health card ready. What would you like to know?`;
        }
        return "I can help you with your Weather, Soil Health, or Crop Recommendations based on your latest data. What specifically would you like to know? (Try asking about: weather, soil, current crop, mandi prices, etc.)";
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden mb-4 border border-gray-200 animate-fade-in-up flex flex-col h-[500px]">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                                🤖
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Kisan Assistant</h3>
                                <span className="text-xs text-green-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span> Online
                                </span>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="text-white hover:bg-white/20 rounded-full p-1 transition">
                            ✕
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow p-4 overflow-y-auto bg-gray-50 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                    ? 'bg-green-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Ask me anything about farming..."
                            className="flex-grow bg-gray-100 text-gray-800 text-sm rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-green-500/50 transition"
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim()}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center transition shadow-md"
                        >
                            ➤
                        </button>
                    </form>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={toggleChat}
                className="group bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center relative"
            >
                <span className="text-3xl">💬</span>
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-white animate-bounce">1</span>
                )}
            </button>
        </div>
    );
};

export default ChatBot;
