// Initialize currency and products
let currentCurrency = 'USD';
let exchangeRate = 1;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', async function() {
  // Set currency
  currentCurrency = await getUserCurrencyCode();
  exchangeRate = await fetchExchangeRate('USD', currentCurrency);
  
  // Load featured products
  loadFeaturedProducts();
  
  // Load trending products
  loadTrendingProducts();
  
  // Update cart count
  updateCartCount();
  
  // Search functionality
  document.getElementById('search-btn').addEventListener('click', searchProducts);
  document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchProducts();
  });
  
  // Category filtering
  document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      filterProducts(this.textContent.trim());
    });
  });
});

// Get user's currency
async function getUserCurrencyCode() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.currency || "USD";
  } catch {
    return "USD";
  }
}

// Fetch exchange rates
async function fetchExchangeRate(from, to) {
  if (from === to) return 1;
  
  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    return data.rates[to] || 1;
  } catch {
    return 1;
  }
}

// Load featured products
function loadFeaturedProducts() {
  const featuredProducts = products.filter(product => product.tags.includes('featured') || product.category === 'premium');
  displayProducts(featuredProducts, 'featured-grid');
}

// Load trending products
function loadTrendingProducts() {
  const trendingProducts = products.filter(product => product.tags.includes('trending'));
  displayProducts(trendingProducts, 'trending-grid');
}

// Display products
function displayProducts(productsToDisplay, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  productsToDisplay.forEach(product => {
    const price = (product.priceUSD * exchangeRate).toFixed(2);
    const currencySymbol = getCurrencySymbol(currentCurrency);
    
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    // Add badge if product is on sale or new
    let badge = '';
    if (product.tags.includes('new')) {
      badge = '<span class="product-badge">New</span>';
    } else if (product.tags.includes('sale')) {
      badge = '<span class="product-badge" style="background-color: var(--success)">Sale</span>';
    }
    
    productCard.innerHTML = `
      ${badge}
      <a href="product-detail.html?id=${product.id}">
        <img src="${product.images[0]}" alt="${product.title}" class="product-image">
      </a>
      <div class="product-info">
        <a href="product-detail.html?id=${product.id}" class="product-title">${product.title}</a>
        <div class="product-price">
          ${currencySymbol}${price}
          ${product.originalPrice ? `<span class="original-price">${currencySymbol}${(product.originalPrice * exchangeRate).toFixed(2)}</span>` : ''}
        </div>
        <div class="product-rating">
          ${generateStarRating(product.rating || 4)} (${product.reviews || '0'})
        </div>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    
    container.appendChild(productCard);
  });
  
  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      addToCart(productId);
    });
  });
}

// Generate star rating
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  
  return '★'.repeat(fullStars) + 
         (halfStar ? '½' : '') + 
         '☆'.repeat(emptyStars);
}

// Get currency symbol
function getCurrencySymbol(code) {
  const symbols = {
    USD: "$", INR: "₹", EUR: "€", GBP: "£", 
    AUD: "A$", CAD: "C$", JPY: "¥", CNY: "¥"
  };
  return symbols[code] || code + " ";
}

// Add to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  
  if (product) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.priceUSD,
        image: product.images[0],
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    showNotification(`${product.title} added to cart!`);
  }
}

// Update cart count
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.cart-count').textContent = count;
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Search products
function searchProducts() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  if (!searchTerm) return;
  
  const results = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
  
  if (results.length > 0) {
    displayProducts(results, 'featured-grid');
    document.getElementById('featured-products').scrollIntoView({
      behavior: 'smooth'
    });
  } else {
    document.getElementById('featured-grid').innerHTML = `
      <div class="no-results">
        <p>No products found for "${searchTerm}"</p>
        <button class="btn btn-primary" onclick="loadFeaturedProducts()">Show All Products</button>
      </div>
    `;
  }
}

// Filter products by category
function filterProducts(category) {
  let filteredProducts = [];
  
  if (category === 'All Products') {
    filteredProducts = products;
  } else if (category === 'Budget') {
    filteredProducts = products.filter(p => p.category === 'budget');
  } else if (category === 'Mid-range') {
    filteredProducts = products.filter(p => p.category === 'midrange');
  } else if (category === 'Premium') {
    filteredProducts = products.filter(p => p.category === 'premium');
  } else if (category === 'Festival Deals') {
    filteredProducts = products.filter(p => p.tags.includes('festival'));
  } else if (category === 'Trending') {
    filteredProducts = products.filter(p => p.tags.includes('trending'));
  } else if (category === 'New Arrivals') {
    filteredProducts = products.filter(p => p.tags.includes('new'));
  }
  
  displayProducts(filteredProducts, 'featured-grid');
  
  // Update active category
  document.querySelectorAll('.category-link').forEach(link => {
    link.classList.remove('active');
    if (link.textContent.trim() === category) {
      link.classList.add('active');
    }
  });
}
