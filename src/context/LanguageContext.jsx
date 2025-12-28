import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default to English

    const translations = {
        en: {
            appName: 'KisanSmart',
            home: {
                heroBadge: 'AI-POWERED AGRICULTURE',
                heroTitle1: 'Smart Decisions for',
                heroTitle2: 'Better Harvests',
                heroSubtitle: 'Unlock the potential of your land with scientific crop rotation and real-time soil health analytics.',
                cta: 'Get Free Advice',
                features: {
                    yield: { title: 'Increase Yield', desc: 'Boost your production by up to 20% by choosing the scientifically correct crop for next season.' },
                    weather: { title: 'Weather Resilient', desc: 'Sowing windows adapted to real-time monsoon forecasts to minimize loss risks.' },
                    soil: { title: 'Soil Health', desc: 'Restore your soil\'s organic carbon and NPK balance with natural legume rotation.' }
                }
            }
        },
        hi: {
            appName: 'किसान स्मार्ट',
            home: {
                heroBadge: 'एआई-संचालित कृषि',
                heroTitle1: 'स्मार्ट निर्णय',
                heroTitle2: 'बेहतर फसल के लिए',
                heroSubtitle: 'वैज्ञानिक फसल चक्र और वास्तविक समय की मृदा स्वास्थ्य विश्लेषण के साथ अपनी भूमि की क्षमता को अनलॉक करें।',
                cta: 'मुफ्त सलाह प्राप्त करें',
                features: {
                    yield: { title: 'पैदावार बढ़ाएं', desc: 'अगले सीजन के लिए वैज्ञानिक रूप से सही फसल चुनकर अपने उत्पादन को 20% तक बढ़ाएं।' },
                    weather: { title: 'मौसम अनुकूल', desc: 'नुकसान के जोखिम को कम करने के लिए वास्तविक समय के मानसून पूर्वानुमानों के अनुकूल बुवाई का समय।' },
                    soil: { title: 'मृदा स्वास्थ्य', desc: 'प्राकृतिक फलियां रोटेशन के साथ अपनी मिट्टी के जैविक कार्बन और NPK संतुलन को बहाल करें।' }
                }
            }
        }
    };

    const t = (path) => {
        const keys = path.split('.');
        let current = translations[language];
        for (let key of keys) {
            if (current[key] === undefined) return path;
            current = current[key];
        }
        return current;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
