// ----------- COUNTRY DETECTION -------------
function getUserCountry() {
  try {
    // Most browsers return "en-IN", "en-US", etc.
    const lang = navigator.language || navigator.userLanguage || "";
    if (lang.toLowerCase().includes("in")) return "india";
    if (lang.toLowerCase().includes("us")) return "us";
  } catch(e) {}
  return "global"; // Default: global (other countries)
}

// Allow manual switch
let userCountry = localStorage.getItem("userCountry") || getUserCountry();
document.addEventListener("DOMContentLoaded", () => {
  // Country switch dropdown
  const countryToggle = document.getElementById("countryToggle");
  if (countryToggle) {
    countryToggle.value = userCountry;
    countryToggle.addEventListener("change", (e) => {
      userCountry = e.target.value;
      localStorage.setItem("userCountry", userCountry);
      renderAllSections();
    });
  }

  // Currency toggle
  let currentCurrency = localStorage.getItem("currency") || (userCountry === "india" ? "INR" : "USD");
  const currencyToggle = document.getElementById("currencyToggle");
  if (currencyToggle) {
    currencyToggle.value = currentCurrency;
    currencyToggle.addEventListener("change", (e) => {
      currentCurrency = e.target.value;
      localStorage.setItem("currency", currentCurrency);
      renderAllSections();
    });
  }

  // Search bar
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const filterText = e.target.value.toLowerCase();
      renderAllProducts(
        filterProductsForUser(PRODUCTS).filter(p =>
          p.title.toLowerCase().includes(filterText) ||
          p.description.toLowerCase().includes(filterText)
        )
      );
    });
  }
  renderAllSections();
});

// ------------ FILTER PRODUCTS -------------
function filterProductsForUser(products) {
  return products.filter(p =>
    p.availability === "global" ||
    p.availability === userCountry
  );
}

// ------------ RENDER CARD ---------------
function productCardHTML(product) {
  let img = product.images && product.images.length ? product.images[0] : "assets/placeholder.jpg";
  let price =
    userCountry === "india" && product.priceINR ? `₹${product.priceINR}` :
    userCountry === "us" && product.priceUSD ? `$${product.priceUSD}` :
    product.priceUSD ? `$${product.priceUSD}` : "";
  return `
    <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'" style="cursor:pointer;">
      <img src="${img}" alt="${product.title}">
      <div class="product-title">${product.title}</div>
      <div class="product-desc">${product.description}</div>
      <div class="product-price">${price}</div>
      <div class="buy-buttons" onclick="event.stopPropagation();">
        <button class="buy-btn" onclick="event.stopPropagation(); window.location.href='product.html?id=${product.id}'">Buy Now</button>
      </div>
    </div>
  `;
}

// ------------ RENDER SECTIONS -----------
function renderAllSections() {
  if (document.getElementById("editorsPicksList")) renderSection("editors", "editorsPicksList");
  if (document.getElementById("trendingList")) renderSection("trending", "trendingList");
  if (document.getElementById("newArrivalsList")) renderSection("new", "newArrivalsList");
  if (document.getElementById("allProductsList")) renderAllProducts(filterProductsForUser(PRODUCTS));
  if (document.getElementById("categoryProductsList")) renderCategoryPage();
  if (document.getElementById("productDetails")) renderProductPage();
}

function renderSection(tag, elementId) {
  const list = filterProductsForUser(PRODUCTS).filter(p => p.tags && p.tags.includes(tag));
  document.getElementById(elementId).innerHTML = list.map(productCardHTML).join('');
}

function renderAllProducts(list) {
  document.getElementById("allProductsList").innerHTML = list.map(productCardHTML).join('');
}

function renderCategoryPage() {
  const url = new URL(window.location.href);
  const cat = url.searchParams.get("cat");
  const mapping = {
    budget: "Budget-Friendly Finds",
    midrange: "Mid-Range Marvels",
    premium: "Premium Innovations"
  };
  document.getElementById("categoryTitle").textContent = mapping[cat] || "Category";
  const products = filterProductsForUser(PRODUCTS).filter(p => p.category === cat);
  document.getElementById("categoryProductsList").innerHTML = products.map(productCardHTML).join('');
}

// ------------ PRODUCT DETAIL PAGE ----------
function renderProductPage() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) {
    document.getElementById("productDetails").innerHTML = "<p>Product not found.</p>";
    return;
  }
  let price =
    userCountry === "india" && product.priceINR ? `₹${product.priceINR}` :
    userCountry === "us" && product.priceUSD ? `$${product.priceUSD}` :
    product.priceUSD ? `$${product.priceUSD}` : "";
  // Countrywise buy link
  let affiliateLink = "#";
  if (userCountry === "india" && product.affiliate.india) {
    affiliateLink = product.affiliate.india;
  } else if (userCountry === "us" && product.affiliate.us) {
    affiliateLink = product.affiliate.us;
  } else if (product.affiliate.global) {
    affiliateLink = product.affiliate.global;
  }
  let gallery = product.images.map(img => `<img src="${img}" alt="${product.title}">`).join('');
  let features = product.features ? `<ul class="features">${product.features.map(f => `<li>${f}</li>`).join('')}</ul>` : '';
  document.getElementById("productDetails").innerHTML = `
    <div class="product-card">
      <div class="product-gallery">${gallery}</div>
      <div class="product-title">${product.title}</div>
      <div class="product-desc">${product.description}</div>
      <div class="product-price">${price}</div>
      <div class="buy-buttons">
        <a class="buy-btn" href="${affiliateLink}" target="_blank">Buy Now</a>
      </div>
      ${features}
    </div>
  `;
}
