// Product data with affiliate links
const AFFILIATE_PRODUCTS = [
  {
    id: "smart-mug-01",
    title: "Self-Heating Smart Mug",
    description: "Keeps your tea or coffee warm with intelligent temperature control. Features auto shut-off and temperature presets.",
    images: ["https://m.media-amazon.com/images/I/71SnYmRZ3aL._SL1500_.jpg"],
    priceUSD: 49.99,
    originalPrice: 59.99,
    affiliate: "https://amzn.to/4f4oaEF",
    features: ["Auto temperature control", "USB charging", "Leak-proof lid", "Battery indicator"],
    rating: 4.5,
    reviews: 128,
    category: "kitchen"
  },
  {
    id: "airfryer-03",
    title: "Touch Control Air Fryer",
    description: "Oil-free frying with 7 pre-sets and touch panel. Healthy cooking made easy with this compact appliance.",
    images: ["https://m.media-amazon.com/images/I/71Xk5Z4n0QL._SL1500_.jpg"],
    priceUSD: 79.00,
    originalPrice: 99.99,
    affiliate: "https://amzn.to/3xY8HjP",
    features: ["7 cooking modes", "Digital touch control", "60-minute timer", "Non-stick basket"],
    rating: 4.7,
    reviews: 342,
    category: "kitchen"
  }
];

// Global variables
let currentCurrency = 'USD';
let exchangeRate = 1;

window.onload = async function () {
  // Get user's currency
  currentCurrency = await getUserCurrencyCode();
  exchangeRate = await fetchExchangeRate('USD', currentCurrency);
  
  // Load products on homepage
  if (document.getElementById('product-grid')) {
    displayProductCards(AFFILIATE_PRODUCTS);
  }
  
  // Load product detail if on product page
  if (window.location.pathname.includes('product-detail.html')) {
    loadProductDetail();
  }
};

// Display product cards on homepage
function displayProductCards(products) {
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = '';

  products.forEach(product => {
    const price = (product.priceUSD * exchangeRate).toFixed(2);
    const originalPrice = product.originalPrice ? (product.originalPrice * exchangeRate).toFixed(2) : null;
    const currencySymbol = getCurrencySymbol(currentCurrency);

    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${product.images[0]}" alt="${product.title}" class="product-image" />
      <h3>${product.title}</h3>
      <p class="product-description">${product.description.substring(0, 100)}...</p>
      <div class="product-price">
        ${currencySymbol}${price}
        ${originalPrice ? `<span class="original-price">${currencySymbol}${originalPrice}</span>` : ''}
      </div>
      <div class="product-rating">${generateStarRating(product.rating)} (${product.reviews})</div>
      <a href="product-detail.html?id=${product.id}" class="view-details-btn">View Details</a>
    `;
    productGrid.appendChild(card);
  });
}

// Load product detail page
function loadProductDetail() {
  const productId = new URLSearchParams(window.location.search).get('id');
  const product = AFFILIATE_PRODUCTS.find(p => p.id === productId);
  
  if (product && document.getElementById('product-detail')) {
    const price = (product.priceUSD * exchangeRate).toFixed(2);
    const originalPrice = product.originalPrice ? (product.originalPrice * exchangeRate).toFixed(2) : null;
    const currencySymbol = getCurrencySymbol(currentCurrency);
    
    document.getElementById('product-detail').innerHTML = `
      <div class="product-detail-container">
        <div class="product-images">
          <img src="${product.images[0]}" alt="${product.title}" class="main-image" />
        </div>
        <div class="product-info">
          <h1>${product.title}</h1>
          <div class="product-rating">
            ${generateStarRating(product.rating)} (${product.reviews} reviews)
          </div>
          <div class="product-price">
            <span class="current-price">${currencySymbol}${price}</span>
            ${originalPrice ? `<span class="original-price">${currencySymbol}${originalPrice}</span>` : ''}
          </div>
          <p class="product-description">${product.description}</p>
          
          <div class="product-features">
            <h3>Key Features:</h3>
            <ul>
              ${product.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>
          
          <a href="${product.affiliate}" target="_blank" class="buy-now-btn">Buy Now on Amazon</a>
        </div>
      </div>
    `;
  }
}

/* Helper functions (keep these from your original code) */
function getCurrencySymbol(code) {
  const symbols = { USD: "$", INR: "₹", EUR: "€", GBP: "£" };
  return symbols[code] || code + " ";
}

async function getUserCurrencyCode() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.currency || "USD";
  } catch {
    return "USD";
  }
}

async function fetchExchangeRate(from, to) {
  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    return data.rates[to] || 1;
  } catch {
    return 1;
  }
}

function generateStarRating(rating) {
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
}
