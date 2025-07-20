// Modern JavaScript with better organization
import { getCurrencySymbol, convertPrice, formatPrice } from './utils.js';

// DOM Elements
const elements = {
  mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
  navbar: document.querySelector('.navbar'),
  currencySelect: document.getElementById('currency-select'),
  searchInput: document.getElementById('search-input'),
  featuredProducts: document.getElementById('featured-products'),
  categoryList: document.getElementById('category-list'),
  newsletterForm: document.getElementById('newsletter-form')
};

// State
const state = {
  currency: localStorage.getItem('currency') || 'IN',
  products: [], // Will be populated with actual products
  categories: [] // Will be populated with actual categories
};

// Initialize the app
function init() {
  setupEventListeners();
  loadData();
  renderUI();
}

// Set up event listeners
function setupEventListeners() {
  // Mobile menu toggle
  if (elements.mobileMenuToggle) {
    elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }

  // Currency change
  if (elements.currencySelect) {
    elements.currencySelect.addEventListener('change', handleCurrencyChange);
    elements.currencySelect.value = state.currency;
  }

  // Search functionality
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', debounce(handleSearch, 300));
  }

  // Newsletter form
  if (elements.newsletterForm) {
    elements.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  elements.navbar.classList.toggle('active');
}

// Handle currency change
function handleCurrencyChange(e) {
  state.currency = e.target.value;
  localStorage.setItem('currency', state.currency);
  renderProducts();
}

// Handle search
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = state.products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) &&
    product.availability.includes(state.currency)
  );
  renderProducts(filtered);
}

// Handle newsletter submission
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  // Here you would typically send this to your backend
  alert(`Thanks for subscribing with ${email}!`);
  e.target.reset();
}

// Load data (mock - replace with actual API calls)
function loadData() {
  // In a real app, you would fetch this from an API
  state.products = [
    // Sample product data
    {
      id: '1',
      name: 'Smart Blender',
      price: 2999,
      image: 'images/products/blender.jpg',
      category: 'appliances',
      availability: ['IN', 'US'],
      description: 'High-powered blender with smart features'
    },
    // More products...
  ];
  
  state.categories = [
    {
      id: '1',
      name: 'Appliances',
      slug: 'appliances',
      image: 'images/categories/appliances.jpg'
    },
    // More categories...
  ];
}

// Render UI
function renderUI() {
  renderFeaturedProducts();
  renderCategories();
}

// Render featured products
function renderFeaturedProducts(productsToRender = state.products) {
  if (!elements.featuredProducts) return;
  
  const filtered = productsToRender
    .filter(p => p.availability.includes(state.currency))
    .slice(0, 6); // Show only 6 featured products

  if (filtered.length === 0) {
    elements.featuredProducts.innerHTML = '<p class="no-products">No featured products available for your region.</p>';
    return;
  }

  elements.featuredProducts.innerHTML = filtered.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <div class="info">
        <h3>${product.name}</h3>
        <p class="price">${formatPrice(product.price, state.currency)}</p>
        <p class="desc">${product.description || ''}</p>
        <a href="product.html?id=${product.id}" class="btn btn-primary">View Details</a>
      </div>
    </div>
  `).join('');
}

// Render categories
function renderCategories() {
  if (!elements.categoryList) return;
  
  elements.categoryList.innerHTML = state.categories.map(category => `
    <div class="category-card" data-category="${category.slug}">
      <img src="${category.image}" alt="${category.name}" loading="lazy">
      <div class="info">
        <h3>${category.name}</h3>
        <a href="products.html?category=${category.slug}" class="btn btn-secondary">Browse</a>
      </div>
    </div>
  `).join('');
}

// Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
