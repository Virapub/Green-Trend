// Global variable for current currency and user region preference
let currentCurrency = 'USD';
let userRegion = 'US'; // Default user region

// Function to get user's approximate country for initial currency setting
function determineUserRegion() {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.includes('en-IN') || userLang.includes('hi-IN')) {
        return 'IN';
    }
    return 'US';
}

// Function to format price based on currency
function formatPrice(price, currency) {
    if (price === null || price === undefined) return "Price not available";
    const options = {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };
    return price.toLocaleString(undefined, options);
}

// Function to create product card HTML
function createProductCard(product) {
    const price = currentCurrency === 'USD' ? product.priceUSD : product.priceINR;
    const formattedPrice = formatPrice(price, currentCurrency);

    let affiliateLink = '#';
    let linkText = 'View on Amazon';
    let linkClass = '';

    if (userRegion === 'US' && product.affiliate?.us) {
        affiliateLink = product.affiliate.us;
        linkText = 'Buy on Amazon US';
    } else if (userRegion === 'IN' && product.affiliate?.india) {
        affiliateLink = product.affiliate.india;
        linkText = 'Buy on Amazon IN';
    } else if (product.affiliate?.global) {
        affiliateLink = product.affiliate.global;
        linkText = 'Buy on Amazon Global';
    } else {
        linkClass = 'disabled';
        linkText = 'Link Unavailable';
    }

    return `
        <div class="product-card">
            <a href="product-detail.html?id=${product.id}" aria-label="View details for ${product.name}">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="product-card-content">
                    <h3>${product.name}</h3>
                    <p>${product.description.substring(0, 100)}...</p>
                    <p class="price">${formattedPrice}</p>
                </div>
            </a>
            <a href="${affiliateLink}" class="buy-button ${linkClass}" target="_blank" rel="noopener noreferrer nofollow"
               ${linkClass ? 'aria-disabled="true"' : ''}>${linkText}</a>
        </div>
    `;
}

// Function to render products into a specified grid
function renderProducts(productsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (productsToRender.length === 0) {
        container.innerHTML = '';
        document.getElementById('no-results').style.display = 'block';
    } else {
        container.innerHTML = productsToRender.map(createProductCard).join('');
        document.getElementById('no-results').style.display = 'none';
    }
}

// Function to get 2 random products from the entire list
function getRandomProducts(count = 2) {
    // Shuffle array and pick first 'count' elements
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Event Listeners for Currency Toggle and Page-Specific Logic
document.addEventListener('DOMContentLoaded', () => {
    // Initialize user region and currency
    userRegion = determineUserRegion();
    currentCurrency = userRegion === 'IN' ? 'INR' : 'USD';

    const currencyToggleButton = document.getElementById('currency-toggle');
    if (currencyToggleButton) {
        currencyToggleButton.textContent = `${currentCurrency === 'USD' ? 'USD' : 'INR'} / ${currentCurrency === 'USD' ? 'INR' : 'USD'}`;

        currencyToggleButton.addEventListener('click', () => {
            currentCurrency = currentCurrency === 'USD' ? 'INR' : 'USD';
            userRegion = currentCurrency === 'INR' ? 'IN' : 'US';
            currencyToggleButton.textContent = `${currentCurrency === 'USD' ? 'USD' : 'INR'} / ${currentCurrency === 'USD' ? 'INR' : 'USD'}`;
            
            // Re-render products on current page
            if (document.getElementById('all-products-grid')) {
                const activeCategoryButton = document.querySelector('.filter-button.active');
                const currentCategory = activeCategoryButton ? activeCategoryButton.dataset.category : 'all';
                const currentSearchTerm = document.getElementById('product-search').value;
                renderProducts(getFilteredProducts(currentCategory, currentSearchTerm), 'all-products-grid');
            } else if (document.getElementById('featured-products-grid')) {
                renderProducts(getRandomProducts(), 'featured-products-grid'); // Re-render with 2 random products
            } else if (document.getElementById('product-detail-section')) {
                const urlParams = new URLSearchParams(window.location.search);
                const productId = parseInt(urlParams.get('id'));
                if (productId) {
                    displayProductDetail(productId);
                }
            }
        });
    }

    // Homepage Specific Logic - Show only 2 random products
    if (document.getElementById('featured-products-grid')) {
        renderProducts(getRandomProducts(), 'featured-products-grid');
    }

    // Products Page Specific Logic (unchanged)
    if (document.getElementById('all-products-grid')) {
        const urlParams = new URLSearchParams(window.location.search);
        const initialCategory = urlParams.get('category') || 'all';

        renderProducts(getFilteredProducts(initialCategory), 'all-products-grid');

        const filterButtons = document.querySelectorAll('.filter-button');
        filterButtons.forEach(button => {
            if (button.dataset.category === initialCategory) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.dataset.category;
                const currentSearchTerm = document.getElementById('product-search').value;
                renderProducts(getFilteredProducts(category, currentSearchTerm), 'all-products-grid');
                const newUrl = new URL(window.location.origin + window.location.pathname);
                if (category !== 'all') {
                    newUrl.searchParams.set('category', category);
                }
                history.pushState({}, '', newUrl);
            });
        });

        const searchInput = document.getElementById('product-search');
        if (searchInput) {
            searchInput.addEventListener('keyup', (event) => {
                const currentCategory = document.querySelector('.filter-button.active').dataset.category;
                const searchTerm = event.target.value;
                renderProducts(getFilteredProducts(currentCategory, searchTerm), 'all-products-grid');
            });
        }
    }

    // Product Detail Page Specific Logic (unchanged)
    if (document.getElementById('product-detail-section')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        if (productId) {
            displayProductDetail(productId);
        } else {
            document.getElementById('product-detail-section').innerHTML = '<p style="text-align: center; font-size: 1.2rem; color: #cc0000;">Product not found. Please go back to the <a href="products.html">products page</a>.</p>';
        }
    }
});

// Function to display individual product details (unchanged)
function displayProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    const detailContainer = document.getElementById('product-detail-section');

    if (product) {
        const price = currentCurrency === 'USD' ? product.priceUSD : product.priceINR;
        const formattedPrice = formatPrice(price, currentCurrency);

        let affiliateLink = '#';
        let linkText = 'View on Amazon';
        let linkClass = '';

        if (userRegion === 'US' && product.affiliate?.us) {
            affiliateLink = product.affiliate.us;
            linkText = 'Buy on Amazon US';
        } else if (userRegion === 'IN' && product.affiliate?.india) {
            affiliateLink = product.affiliate.india;
            linkText = 'Buy on Amazon IN';
        } else if (product.affiliate?.global) {
            affiliateLink = product.affiliate.global;
            linkText = 'Buy on Amazon Global';
        } else {
            linkClass = 'disabled';
            linkText = 'Link Unavailable';
        }

        detailContainer.innerHTML = `
            <div class="product-detail-image">
                <img src="${product.images[0]}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <p class="category">${product.category.replace('-', ' ')}</p>
                <p class="description">${product.description}</p>
                <p class="price">${formattedPrice}</p>
                <a href="${affiliateLink}" class="affiliate-link ${linkClass}" target="_blank" rel="noopener noreferrer nofollow"
                   ${linkClass ? 'aria-disabled="true"' : ''}>${linkText}</a>
            </div>
        `;

        // Update meta tags for SEO/social sharing
        document.getElementById('product-detail-title').textContent = `${product.name} - GreenTrend`;
        document.getElementById('product-detail-description').setAttribute('content', product.description.substring(0, 160));
        document.getElementById('product-detail-keywords').setAttribute('content', `${product.name}, ${product.category}, smart kitchen gadgets, GreenTrend, kitchen tech`);
        
        const ogImageUrl = new URL(product.images[0], window.location.origin).href;
        const ogUrl = new URL(window.location.href).href;

        document.getElementById('og-title').setAttribute('content', product.name);
        document.getElementById('og-description').setAttribute('content', product.description.substring(0, 200) + '...');
        document.getElementById('og-image').setAttribute('content', ogImageUrl);
        document.getElementById('og-url').setAttribute('content', ogUrl);

    } else {
        detailContainer.innerHTML = '<p style="text-align: center; font-size: 1.2rem; color: #cc0000;">Product not found. Please go back to the <a href="products.html">products page</a>.</p>';
    }
                                                               }
