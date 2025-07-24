// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(el => el.textContent = count);
}

// Add to cart
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.priceUSD,
      image: product.images[0],
      quantity: quantity
    });
  }
  
  saveCart();
  updateCartCount();
  showNotification(`${product.title} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, newQuantity);
    saveCart();
    renderCart();
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Render cart page
function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  if (!cartContainer) return;
  
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything to your cart yet</p>
        <a href="products.html" class="btn btn-primary">Continue Shopping</a>
      </div>
    `;
    return;
  }
  
  let subtotal = 0;
  
  cartContainer.innerHTML = `
    <div class="cart-items">
      ${cart.map(item => {
        const product = products.find(p => p.id === item.id) || item;
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
