// Product data with affiliate links
const AFFILIATE_PRODUCTS = [
  {
    id: "smart-mug-01",
    title: "Self-Heating Smart Mug",
    description: "Keeps your tea or coffee warm with intelligent temperature control. Features auto shut-off and temperature presets.",
    images: ["https://m.media-amazon.com/images/I/71SnYmRZ3aL._SL1500_.jpg"],
    priceUSD: 49.99,
    originalPrice: 59.99,
    affiliate: "https://amzn.to/3xY4JtK",
    features: [
      "Auto temperature control",
      "USB charging",
      "Leak-proof lid",
      "Battery indicator"
    ],
    rating: 4.5,
    reviews: 128,
    category: "kitchen"
  },
  {
    id: "airfryer-03",
    title: "Touch Control Air Fryer",
    description: "Oil-free frying with 7 pre-sets and touch panel. Healthy cooking made easy with this compact appliance.",
    images: ["https://m.edia-amazon.com/images/I/71Xk5Z4n0QL._SL1500_.jpg"],
    priceUSD: 79.00,
    originalPrice: 99.99,
    affiliate: "https://amzn.to/3xY8HjP",
    features: [
      "7 cooking modes",
      "Digital touch control",
      "60-minute timer",
      "Non-stick basket"
    ],
    rating: 4.7,
    reviews: 342,
    category: "kitchen"
  }
];

// Global variables
let currentCurrency = 'USD';
let exchangeRates = {
  USD: 1,
  EUR: 0.85,
  INR: 75.0,
  GBP: 0.75
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  // Set up currency selector
  const currencySelect = document.getElementById('currency-select');
  if (currencySelect) {
    currencySelect.value = currentCurrency;
    currencySelect.addEventListener('change', function() {
      currentCurrency = this.value;
      if (window.location.pathname.includes('product.html')) {
        loadProductDetail();
      } else {
        loadProductGrid();
      }
    });
  }

  // Check if we're on the product detail page
  if (window.location.pathname.includes('product.html')) {
    loadProductDetail();
  } else {
    loadProductGrid();
  }
});

// Load product grid on homepage
function loadProductGrid() {
  const productGrid = document.getElementById('product-grid');
  if (!productGrid) return;

  productGrid.innerHTML = '';

  AFFILIATE_PRODUCTS.forEach(product => {
    const price = convertCurrency(product.priceUSD, currentCurrency);
    const originalPrice = product.originalPrice ? convertCurrency(product.originalPrice, currentCurrency) : null;
    const currencySymbol = getCurrencySymbol(currentCurrency);

    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.images[0]}" alt="${product.title}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-price">
          ${currencySymbol}${price.toFixed(2)}
          ${originalPrice ? `<span class="original-price">${currencySymbol}${originalPrice.toFixed(2)}</span>` : ''}
        </div>
        <div class="product-rating">${generateStarRating(product.rating)} (${product.reviews})</div>
        <a href="product.html?id=${product.id}" class="view-details-btn">View Details</a>
      </div>
    `;
    productGrid.appendChild(productCard);
  });
}

// Load product detail page
function loadProductDetail() {
  const productId = new URLSearchParams(window.location.search).get('id');
  const product = AFFILIATE_PRODUCTS.find(p => p.id === productId);
  const productDetail = document.getElementById('product-detail');

  if (!product || !productDetail) {
    productDetail.innerHTML = '<p>Product not found. <a href="index.html">Return to homepage</a></p>';
    return;
  }

  const price = convertCurrency(product.priceUSD, currentCurrency);
  const originalPrice = product.originalPrice ? convertCurrency(product.originalPrice, currentCurrency) : null;
  const currencySymbol = getCurrencySymbol(currentCurrency);

  productDetail.innerHTML = `
    <div class="product-detail-container">
      <div class="product-images">
        <img src="${product.images[0]}" alt="${product.title}" class="main-image">
      </div>
      <div class="product-details">
        <h1>${product.title}</h1>
        <div class="product-rating">${generateStarRating(product.rating)} (${product.reviews} reviews)</div>
        <div class="current-price">${currencySymbol}${price.toFixed(2)}
          ${originalPrice ? `<span class="original-price">${currencySymbol}${originalPrice.toFixed(2)}</span>` : ''}
        </div>
        <p>${product.description}</p>
        
        <div class="product-features">
          <h3>Key Features:</h3>
          <ul>
            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        
        <a href="${product.affiliate}" target="_blank" class="buy-now-btn">Buy Now on Amazon</a>
        <a href="index.html" class="back-btn">← Back to Products</a>
      </div>
    </div>
  `;
}

/* Helper functions */
function convertCurrency(amount, toCurrency) {
  return amount * exchangeRates[toCurrency];
}

function getCurrencySymbol(currency) {
  const symbols = {
    USD: "$",
    EUR: "€",
    INR: "₹",
    GBP: "£"
  };
  return symbols[currency] || currency;
}

function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  
  return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

// Fetch real exchange rates (optional)
async function fetchExchangeRates() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    exchangeRates = {
      USD: 1,
      EUR: data.rates.EUR || 0.85,
      INR: data.rates.INR || 75.0,
      GBP: data.rates.GBP || 0.75
    };
  } catch (error) {
    console.log("Using default exchange rates");
  }
}

// Initialize with real exchange rates
fetchExchangeRates();
