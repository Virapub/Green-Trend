// utils.js

// Get currency symbol
export function getCurrencySymbol(currency) {
  return currency === 'USD' ? '$' : '₹';
}

// Convert price based on selected currency
export function convertPrice(priceINR, currency) {
  const exchangeRate = 0.012; // 1 INR = 0.012 USD approx
  return currency === 'USD'
    ? (priceINR * exchangeRate).toFixed(2)
    : priceINR;
}

// Get current user's region (mock, can be replaced by IP API)
export function getRegion() {
  // Example logic: fallback to India
  const region = localStorage.getItem('region');
  return region === 'US' ? 'US' : 'IN';
}

// Set user region (from dropdown or detection)
export function setRegion(region) {
  localStorage.setItem('region', region);
}

// Format price string
export function formatPrice(price, currency) {
  const symbol = getCurrencySymbol(currency);
  return currency === 'USD'
    ? `${symbol}${price}`
    : `${symbol}${Number(price).toLocaleString('en-IN')}`;
}
