// src/data/mockData.js
export const mockLandData = {
  landDetails: {
    owner: "Rajesh Kumar",
    village: "Ramnagar",
    pattaNumber: "124/B",
    area: "1.5 Hectares"
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