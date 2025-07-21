const PRODUCTS = [
  {
    id: "smart-blender-01",
    title: "Smart Blender Pro",
    description: "A powerful smart blender with app connectivity and multiple pre-set modes.",
    images: ["assets/blender1.jpg"],
    priceINR: 5999,
    priceUSD: 79,
    affiliate: {
      india: "https://amzn.to/3IQTDxY",
      us: "https://amazon.com/dp/B08XYZ/",
      global: "https://amazon.com/dp/B08XYZ/"
    },
    availability: "global", // "india", "us", "global"
    category: "midrange",
    features: [
      "1200W motor",
      "Bluetooth app control",
      "Stainless steel blades",
      "Self-cleaning mode"
    ],
    tags: ["editors", "trending"]
  },
  {
    id: "wifi-scale-01",
    title: "WiFi Kitchen Scale",
    description: "Track your ingredients with instant syncing to your smartphone.",
    images: ["assets/scale1.jpg"],
    priceINR: 2499,
    affiliate: {
      india: "https://amazon.in/dp/B08ABC/"
    },
    availability: "india",
    category: "budget",
    features: [
      "WiFi + Bluetooth",
      "Mobile app integration",
      "Precision sensors"
    ],
    tags: ["new"]
  },
  {
    id: "us-coffee-01",
    title: "US Smart Coffee Maker",
    description: "Make perfect coffee with Alexa integration.",
    images: ["assets/coffee1.jpg"],
    priceUSD: 99,
    affiliate: {
      us: "https://amazon.com/dp/B07USCOFFEE/"
    },
    availability: "us",
    category: "premium",
    features: [
      "Alexa integration",
      "Programmable schedules",
      "Temperature control"
    ],
    tags: ["new", "premium"]
  },
     {
    id: "smart-air-fryer-01",
    title: "Smart Air Fryer",
    description: "A smart and innovative smart air fryer designed for modern kitchens.",
    images: ["assets/smart_air_fryer1.jpg"],
    priceINR: 2785,
    priceUSD: null,
    affiliate: {
      india: null,
      us: null,
      global: "https://amazon.com/dp/GLOBPROD1"
    },
    availability: "us",
    category: "budget",
    features: [
      "Smart control system",
      "Energy efficient",
      "Compact design",
      "App integration"
    ],
    tags: ["trending", "editors"]
  },
  {
    id: "digital-rice-cooker-02",
    title: "Digital Rice Cooker",
    description: "A smart and innovative digital rice cooker designed for modern kitchens.",
    images: ["assets/digital_rice_cooker2.jpg"],
    priceINR: null,
    priceUSD: null,
    affiliate: {
      india: "https://amazon.in/dp/INPROD2",
      us: null,
      global: "https://amazon.com/dp/GLOBPROD2"
    },
    availability: "global",
    category: "premium",
    features: [
      "Smart control system",
      "Energy efficient",
      "Compact design",
      "App integration"
    ],
    tags: ["new", "premium"]
  },
  {
    id: "portable-smoothie-blender-03",
    title: "Portable Smoothie Blender",
    description: "A smart and innovative portable smoothie blender designed for modern kitchens.",
    images: ["assets/portable_smoothie_blender3.jpg"],
    priceINR: null,
    priceUSD: 61,
    affiliate: {
      india: null,
      us: null,
      global: null
    },
    availability: "global",
    category: "midrange",
    features: [
      "Smart control system",
      "Energy efficient",
      "Compact design",
      "App integration"
    ],
    tags: ["bestseller"]
  }
  // Add more products as needed
];
