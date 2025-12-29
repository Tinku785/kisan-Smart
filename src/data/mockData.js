// src/data/mockData.js
export const mockLandData = {
  landDetails: {
    owner: "Rajesh Kumar",
    village: "Ramnagar",
    pattaNumber: "124/B",
    area: "1.5 Hectares",
    coordinates: { lat: 16.5062, lng: 80.6480 } // Vijayawada/Amaravati region example
  },
  weather: {
    temp: 32,
    condition: "Partly Cloudy",
    advisory: "Good moisture levels. Optimal sowing window open for next 3 days.",
    isGoodForSowing: true
  },
  soilHealth: {
    nitrogen: { level: "Low", status: "critical" },   // critical = red
    phosphorus: { level: "Medium", status: "good" }, // good = green
    potassium: { level: "Medium", status: "good" },
    pH: { value: 7.2, status: "neutral" }
  },
  recommendation: {
    season: "Kharif 2024",
    currentCrop: "Paddy (Rice)",
    nextCrop: "Chickpea",
    reason: "Chickpea is a legume that will fix atmospheric nitrogen, naturally restoring soil fertility after the cereal crop. It also breaks the lifecycle of the stem borer pest prevalent last season.",
    sowingWindow: "June 15 - June 25",
    expectedBenefits: {
      yieldIncrease: "15-20%",
      costSaving: "₹2,500 per acre (less urea needed)"
    }
  }
};

export const mockVideos = [
  {
    id: 1,
    title: "Modern Paddy Sowing Techniques",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    url: "#",
    duration: "5:30",
    category: "Techniques"
  },
  {
    id: 2,
    title: "Drip Irrigation Setup",
    thumbnail: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0",
    url: "#",
    duration: "8:45",
    category: "Irrigation"
  },
  {
    id: 3,
    title: "Organic Pest Control",
    thumbnail: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d",
    url: "#",
    duration: "6:15",
    category: "Pest Control"
  }
];

export const mockSchemes = [
  {
    id: 1,
    name: "Pradhan Mantri Fasal Bima Yojana",
    category: "Insurance",
    eligibility: "All farmers growing notified crops",
    benefit: "Financial support in case of crop failure",
    probability: "95%"
  },
  {
    id: 2,
    name: "Soil Health Card Scheme",
    category: "Soil Health",
    eligibility: "Land holding farmers",
    benefit: "Soil testing and fertilizer recommendations",
    probability: "80%"
  },
  {
    id: 3,
    name: "PM-Kisan Samman Nidhi",
    category: "Direct Support",
    eligibility: "Small and marginal farmers",
    benefit: "₹6000 per year income support",
    probability: "90%"
  }
];

export const mockSoilCredits = {
  currentPoints: 850,
  history: [
    { date: "2024-05-01", change: "+50", reason: "Maintained optimal Nitrogen levels" },
    { date: "2024-04-15", change: "+30", reason: "Uploaded soil test report" },
    { date: "2024-03-20", change: "-10", reason: "Slight PH imbalance detected" }
  ],
  tier: "Gold Farmer"
};