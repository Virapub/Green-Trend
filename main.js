window.onload = async function () {
  const productGrid = document.getElementById('product-grid');

  // Get user's local currency
  const userCurrency = await getUserCurrencyCode();
  const exchangeRate = await fetchExchangeRate('USD', userCurrency);

  PRODUCTS.forEach(product => {
    const convertedPrice = (product.priceUSD * exchangeRate).toFixed(2);
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${product.images[0]}" alt="${product.title}" style="width:100%; height:200px; object-fit:cover;" />
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <ul>
        ${product.features.map(f => `<li>${f}</li>`).join("")}
      </ul>
      <p><strong>Price:</strong> ${getCurrencySymbol(userCurrency)} ${convertedPrice}</p>
      <a href="${product.affiliate}" target="_blank" class="buy-button">Buy Now</a>
    `;
    card.style.border = "1px solid #ccc";
    card.style.padding = "10px";
    card.style.backgroundColor = "#fff";
    productGrid.appendChild(card);
  });
};

function getCurrencySymbol(code) {
  const symbols = {
    USD: "$", INR: "₹", EUR: "€", GBP: "£", AUD: "A$", CAD: "C$"
  };
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
