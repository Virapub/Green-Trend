// Get product slug from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Get product by ID
const selectedProduct = products.find(p => p.id === productId);

// Get current user country
const userCountry = localStorage.getItem('userCountry') || 'IN';
const currencySymbol = { IN: '₹', US: '$' };

// Format price
function formatPrice(price, country) {
  const rate = country === 'US' ? 0.012 : 1;
  return `${currencySymbol[country]}${Math.round(price * rate)}`;
}

// Render product details
function renderProductDetails(product) {
  const container = document.getElementById('single-product');

  if (!product || !product.availability.includes(userCountry)) {
    container.innerHTML = `<p>Sorry, this product is not available in your region.</p>`;
    return;
  }

  const link = product.link[userCountry] || '#';

  container.innerHTML = `
    <div class="product-detail">
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h2>${product.name}</h2>
        <p class="price">${formatPrice(product.price, userCountry)}</p>
        <p class="desc">${product.description || 'No description available.'}</p>
        <a href="${link}" target="_blank" class="buy-btn">Buy on Amazon</a>
      </div>
    </div>
  `;
}

// Call render
document.addEventListener('DOMContentLoaded', () => {
  renderProductDetails(selectedProduct);
});
