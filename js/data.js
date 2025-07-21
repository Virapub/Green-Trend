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
    availability: "global",
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
    availability: "global",
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
    availability: "global",
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
  availability: "global",
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
  availability: "global",
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
  availability: "global",
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
  availability: "global",
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
  availability: "global",
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
    id: "electric-pooja-diffuser-01",
    title: "Electric Pooja Diffuser",
    description: "Smokeless electric diffuser for divine pooja ambience. Ideal for Ganesh Chaturthi & Naag Panchami.",
    images: ["assets/electric_pooja_diffuser.jpg"],
    priceINR: 999,
    priceUSD: 19,
    affiliate: {
      india: "https://amzn.to/3XYZDIFFUSER",
      us: "https://amazon.com/dp/B0DIFFUSER",
      global: "https://amazon.com/dp/B0DIFFUSER"
    },
    availability: "global",
    category: "budget",
    features: [
      "Smokeless and aromatic",
      "USB powered",
      "Perfect for home temples",
      "Festive fragrance control"
    ],
    tags: ["trending", "festival"]
  },
  {
    id: "modak-maker-02",
    title: "Modak Maker Machine",
    description: "Make perfect Modaks at home for Ganesh Chaturthi with this easy-to-use mold.",
    images: ["assets/modak_maker.jpg"],
    priceINR: 499,
    affiliate: {
      india: "https://amzn.to/3MODAK",
    },
    availability: "global",
    category: "budget",
    features: [
      "Easy shaping",
      "Food-grade material",
      "Perfect for festive cooking"
    ],
    tags: ["festival", "new"]
  },
  {
    id: "diyas-led-set-03",
    title: "Rechargeable LED Diyas (Set of 12)",
    description: "Brighten up your home safely with flameless LED diyas — perfect for Diwali & Karwa Chauth.",
    images: ["assets/led_diyas.jpg"],
    priceINR: 799,
    affiliate: {
      india: "https://amzn.to/3LEDDIYAS",
    },
    availability: "global",
    category: "budget",
    features: [
      "Rechargeable",
      "No fire risk",
      "Traditional look with modern tech"
    ],
    tags: ["trending", "festival"]
  },
  {
    id: "smart-chai-maker-04",
    title: "Smart Chai Maker",
    description: "Make your festive mornings easier with this one-touch automatic chai maker.",
    images: ["assets/smart_chai_maker.jpg"],
    priceINR: 3499,
    priceUSD: 45,
    affiliate: {
      india: "https://amzn.to/SMARTCHAI",
      us: "https://amazon.com/dp/B0CHAIMKR",
      global: "https://amazon.com/dp/B0CHAIMKR"
    },
    availability: "global",
    category: "midrange",
    features: [
      "Auto brew",
      "Boil control",
      "Portable & easy clean"
    ],
    tags: ["editors", "festival"]
  },
  {
    id: "mithai-box-sealer-05",
    title: "Mithai Box Sealer Machine",
    description: "Seal sweet boxes hygienically during Rakhi, Diwali & gifting season.",
    images: ["assets/box_sealer.jpg"],
    priceINR: 1299,
    affiliate: {
      india: "https://amzn.to/MITHAIPACK",
    },
    availability: "global",
    category: "budget",
    features: [
      "Air-tight sealing",
      "Compact and fast",
      "Gifting made easy"
    ],
    tags: ["festival"]
  },
  {
    id: "smart-thali-warmer-06",
    title: "Smart Thali Warmer",
    description: "Keep prasad or festive food warm automatically.",
    images: ["assets/thali_warmer.jpg"],
    priceINR: 2899,
    priceUSD: 39,
    affiliate: {
      india: "https://amzn.to/3THALIWRM",
      global: "https://amazon.com/dp/B0WARMTHALI"
    },
    availability: "global",
    category: "midrange",
    features: [
      "Auto temperature control",
      "Compact for puja tables",
      "Stainless steel plate support"
    ],
    tags: ["new", "festival"]
  },
  {
    id: "ganesha-digital-frame-07",
    title: "Digital Ganesha Frame (Aarti Mode)",
    description: "Displays rotating Ganesh images & plays aarti with remote.",
    images: ["assets/ganesh_frame.jpg"],
    priceINR: 1999,
    affiliate: {
      india: "https://amzn.to/GANESHFRAME",
    },
    availability: "global",
    category: "midrange",
    features: [
      "HD image rotation",
      "Built-in speaker",
      "Wall & desk mountable"
    ],
    tags: ["festival"]
  },
  {
    id: "diya-oil-dispenser-08",
    title: "Automatic Diya Oil Dispenser",
    description: "Dispense exact drops of oil for diyas — clean, fast, and mess-free.",
    images: ["assets/oil_dispenser.jpg"],
    priceINR: 899,
    affiliate: {
      india: "https://amzn.to/OILDISP",
    },
    availability: "global",
    category: "budget",
    features: [
      "One-touch operation",
      "Precise oil measurement",
      "Great for pooja prep"
    ],
    tags: ["trending", "festival"]
  },
  {
    id: "wireless-pooja-bell-09",
    title: "Wireless Pooja Bell",
    description: "Ring your digital pooja bell from across the room or via app!",
    images: ["assets/pooja_bell.jpg"],
    priceINR: 1499,
    priceUSD: 22,
    affiliate: {
      india: "https://amzn.to/POOJABELL",
      us: "https://amazon.com/dp/B0POOJABELL"
    },
    availability: "global",
    category: "midrange",
    features: [
      "Wireless + App controlled",
      "Multiple sound modes",
      "Ideal for NRI homes"
    ],
    tags: ["new", "festival"]
  },
  {
    id: "laddu-mixer-10",
    title: "Laddu Mixer Machine",
    description: "Blend perfect ladoo mix — dry fruit or besan — with no manual effort.",
    images: ["assets/laddu_mixer.jpg"],
    priceINR: 3499,
    affiliate: {
      india: "https://amzn.to/LADDUMIX",
    },
    availability: "global",
    category: "midrange",
    features: [
      "Heavy-duty motor",
      "Easy cleaning",
      "Multi-purpose usage"
    ],
    tags: ["festival", "editors"]
  },
  {
    id: "airfryer-touch-digital",
    title: "Smart Touch Air Fryer",
    description: "Healthy oil-free cooking for Diwali snacks or Christmas treats. App controlled & programmable.",
    images: ["assets/global/airfryer.jpg"],
    priceINR: 4999,
    priceUSD: 59,
    affiliate: {
      india: "https://amzn.to/3INDIAAIR",
      us: "https://amazon.com/dp/B0USAIRFRY",
      global: "https://amazon.com/dp/B0USAIRFRY"
    },
    availability: "global",
    category: "midrange",
    features: [
      "Rapid hot air tech",
      "App-based presets",
      "Great for festival snacks"
    ],
    tags: ["global", "festival", "trending"]
  },
  {
    id: "portable-smoothie-blender",
    title: "USB Rechargeable Smoothie Blender",
    description: "Perfect for travel, fitness & festive detox drinks — charge via USB, easy clean.",
    images: ["assets/global/portable_blender.jpg"],
    priceINR: 1299,
    priceUSD: 19,
    affiliate: {
      india: "https://amzn.to/INDIAPORTBLEND",
      us: "https://amazon.com/dp/B0PORTABLEBLND",
      global: "https://amazon.com/dp/B0PORTABLEBLND"
    },
    availability: "global",
    category: "budget",
    features: [
      "USB chargeable",
      "Fits in a cup holder",
      "Smoothies on-the-go"
    ],
    tags: ["global", "health", "trending"]
  },
  {
    id: "chai-latte-machine",
    title: "Automatic Chai & Latte Machine",
    description: "For authentic masala chai or spiced lattes during festive mornings. Loved by NRIs.",
    images: ["assets/global/chai_latte.jpg"],
    priceINR: 6999,
    priceUSD: 89,
    affiliate: {
      india: "https://amzn.to/CHAILATTEMKR",
      us: "https://amazon.com/dp/B0CHAILTTE",
      global: "https://amazon.com/dp/B0CHAILTTE"
    },
    availability: "global",
    category: "premium",
    features: [
      "Steams & brews automatically",
      "Detachable milk frother",
      "Perfect for festive guests"
    ],
    tags: ["festival", "chai", "premium", "global"]
  },
  {
    id: "samosa-maker",
    title: "Electric Samosa & Snack Maker",
    description: "Make crispy samosas, empanadas or dumplings in minutes — great for Holi & Diwali!",
    images: ["assets/global/samosa_maker.jpg"],
    priceINR: 2499,
    priceUSD: 32,
    affiliate: {
      india: "https://amzn.to/SAMOSAMKR",
      us: "https://amazon.com/dp/B0SAMOUSA",
      global: "https://amazon.com/dp/B0SAMOUSA"
    },
    availability: "global",
    category: "midrange",
    features: [
      "Non-stick plates",
      "Ready in 5 minutes",
      "Festival-friendly cooking"
    ],
    tags: ["festival", "trending", "global"]
  },
  {
    id: "ganesha-light-projector",
    title: "Ganesha LED Light Projector",
    description: "Light up walls or ceilings with rotating Ganesha or Diwali patterns. Magical for NRI homes!",
    images: ["assets/global/ganesha_projector.jpg"],
    priceINR: 1799,
    priceUSD: 24,
    affiliate: {
      india: "https://amzn.to/GANESHPROJ",
      us: "https://amazon.com/dp/B0GPROJNR",
      global: "https://amazon.com/dp/B0GPROJNR"
    },
    availability: "global",
    category: "budget",
    features: [
      "Festive light projections",
      "USB powered",
      "Auto-rotate feature"
    ],
    tags: ["festival", "nri", "diwali", "global"]
  },
  {
    id: "touch-kitchen-compost-bin",
    title: "Smart Touch Compost Bin",
    description: "Eco-friendly & odor-free waste disposal during festive cooking sessions.",
    images: ["assets/global/compost_bin.jpg"],
    priceINR: 2999,
    priceUSD: 38,
    affiliate: {
      india: "https://amzn.to/SMARTBIN",
      us: "https://amazon.com/dp/B0COMPOST",
      global: "https://amazon.com/dp/B0COMPOST"
    },
    availability: "global",
    category: "midrange",
    features: [
      "Touch-activated lid",
      "Charcoal filter",
      "Reduces festive kitchen waste"
    ],
    tags: ["eco", "festival", "trending"]
  },
  {
    id: "rotating-snack-tray",
    title: "Automatic Rotating Snack Tray",
    description: "Festive snacking meets automation — spins open like a flower for guests!",
    images: ["assets/global/snack_tray.jpg"],
    priceINR: 1899,
    priceUSD: 22,
    affiliate: {
      india: "https://amzn.to/SNACKROTATE",
      us: "https://amazon.com/dp/B0AUTOSNACK",
      global: "https://amazon.com/dp/B0AUTOSNACK"
    },
    availability: "global",
    category: "budget",
    features: [
      "One-touch opening",
      "6 sections",
      "Fun for Rakhi or Diwali gatherings"
    ],
    tags: ["festival", "viral", "global"]
  },
  {
    id: "electronic-masala-box",
    title: "Electronic Masala Box",
    description: "Digitally organized spice box for Indian and global kitchens. Auto open + sensor light.",
    images: ["assets/global/masala_box.jpg"],
    priceINR: 3499,
    priceUSD: 42,
    affiliate: {
      india: "https://amzn.to/MASALABOX",
      us: "https://amazon.com/dp/B0MASALA",
      global: "https://amazon.com/dp/B0MASALA"
    },
    availability: "global",
    category: "midrange",
    features: [
      "Sensor lid open",
      "7 compartments",
      "Ideal for festive cooking"
    ],
    tags: ["trending", "global", "spice"]
  },
  {
    id: "festival-cookie-press",
    title: "Festival Cookie & Mithai Press Kit",
    description: "Make designer sweets for Christmas or Diwali — includes multiple molds and press heads.",
    images: ["assets/global/cookie_press.jpg"],
    priceINR: 1099,
    priceUSD: 15,
    affiliate: {
      india: "https://amzn.to/COOKIEPRESS",
      us: "https://amazon.com/dp/B0COOKIPRESS",
      global: "https://amazon.com/dp/B0COOKIPRESS"
    },
    availability: "global",
    category: "budget",
    features: [
      "Interchangeable heads",
      "Food-safe material",
      "Great for holiday gifting"
    ],
    tags: ["holiday", "baking", "festival"]
  },
  {
    id: "usb-diya-fairy-string",
    title: "USB Diya & Fairy String Lights",
    description: "Decorate globally — festival-ready lighting for homes, balconies, pooja corners.",
    images: ["assets/global/diya_fairy.jpg"],
    priceINR: 899,
    priceUSD: 11,
    affiliate: {
      india: "https://amzn.to/DIYASTRING",
      us: "https://amazon.com/dp/B0DIYALED",
      global: "https://amazon.com/dp/B0DIYALED"
    },
    availability: "global",
    category: "budget",
    features: [
      "Warm diya glow",
      "USB + remote control",
      "Reusable for all occasions"
    ],
    tags: ["global", "diwali", "lighting"]
  }
  // Add more products as needed
];
