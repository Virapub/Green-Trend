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
  },
{
  id: "smart-induction-cooktop-04",
  title: "Smart Induction Cooktop",
  description: "A smart and innovative smart induction cooktop designed for modern kitchens.",
  images: ["assets/smart_induction_cooktop4.jpg"],
  priceINR: 3205,
  priceUSD: null,
  affiliate: {
    india: "https://amazon.in/dp/INPROD4",
    us: "https://amazon.com/dp/USPROD4",
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
  tags: ["editors"]
},
{
  id: "electric-chopper-05",
  title: "Electric Chopper",
  description: "A smart and innovative electric chopper designed for modern kitchens.",
  images: ["assets/electric_chopper5.jpg"],
  priceINR: null,
  priceUSD: 123,
  affiliate: {
    india: null,
    us: "https://amazon.com/dp/USPROD5",
    global: null
  },
  availability: "india",
  category: "premium",
  features: [
    "Smart control system",
    "Energy efficient",
    "Compact design",
    "App integration"
  ],
  tags: ["trending"]
},
{
  id: "wifi-air-purifier-06",
  title: "WiFi Air Purifier",
  description: "A smart and innovative wifi air purifier designed for modern kitchens.",
  images: ["assets/wifi_air_purifier6.jpg"],
  priceINR: 9503,
  priceUSD: null,
  affiliate: {
    india: "https://amazon.in/dp/INPROD6",
    us: null,
    global: "https://amazon.com/dp/GLOBPROD6"
  },
  availability: "us",
  category: "premium",
  features: [
    "Smart control system",
    "Energy efficient",
    "Compact design",
    "App integration"
  ],
  tags: ["editors"]
},
{
  id: "multi-function-toaster-07",
  title: "Multi-Function Toaster",
  description: "A smart and innovative multi-function toaster designed for modern kitchens.",
  images: ["assets/multi-function_toaster7.jpg"],
  priceINR: 9796,
  priceUSD: 101,
  affiliate: {
    india: "https://amazon.in/dp/INPROD7",
    us: "https://amazon.com/dp/USPROD7",
    global: "https://amazon.com/dp/GLOBPROD7"
  },
  availability: "us",
  category: "premium",
  features: [
    "Smart control system",
    "Energy efficient",
    "Compact design",
    "App integration"
  ],
  tags: ["bestseller"]
},
{
  id: "automatic-soap-dispenser-08",
  title: "Automatic Soap Dispenser",
  description: "A smart and innovative automatic soap dispenser designed for modern kitchens.",
  images: ["assets/automatic_soap_dispenser8.jpg"],
  priceINR: 1983,
  priceUSD: 63,
  affiliate: {
    india: "https://amazon.in/dp/INPROD8",
    us: null,
    global: null
  },
  availability: "us",
  category: "midrange",
  features: [
    "Smart control system",
    "Energy efficient",
    "Compact design",
    "App integration"
  ],
  tags: ["new"]
},
{
  id: "rechargeable-hand-mixer-09",
  title: "Rechargeable Hand Mixer",
  description: "A smart and innovative rechargeable hand mixer designed for modern kitchens.",
  images: ["assets/rechargeable_hand_mixer9.jpg"],
  priceINR: 5185,
  priceUSD: null,
  affiliate: {
    india: null,
    us: "https://amazon.com/dp/USPROD9",
    global: null
  },
  availability: "us",
  category: "midrange",
  features: [
    "Smart control system",
    "Energy efficient",
    "Compact design",
    "App integration"
  ],
  tags: ["editors"]
},
{
  id: "touchscreen-oven-10",
  title: "Touchscreen Oven",
  description: "A smart and innovative touchscreen oven designed for modern kitchens.",
  images: ["assets/touchscreen_oven10.jpg"],
  priceINR: null,
  priceUSD: null,
  affiliate: {
    india: "https://amazon.in/dp/INPROD10",
    us: null,
    global: "https://amazon.com/dp/GLOBPROD10"
  },
  availability: "india",
  category: "premium",
  features: [
    "Smart control system",
    "Energy efficient",
    "Compact design",
    "App integration"
  ],
  tags: ["bestseller"]
},
{
  id: "smart-pressure-cooker-11",
  title: "Smart Pressure Cooker",
  description: "A smart and innovative smart pressure cooker designed for modern kitchens.",
  images: ["assets/smart_pressure_cooker11.jpg"],
  priceINR: 5972,
  priceUSD: 167,
  affiliate: {
    india: "https://amazon.in/dp/INPROD11",
    us: "https://amazon.com/dp/USPROD11",
    global: null
  },
  availability: "india",
  category: "premium",
  features: [
    "Smart control system",
    "Energy efficient",
    "Compact design",
    "App integration"
  ],
  tags: ["new", "premium"]
}
  // Add more products as needed
];
