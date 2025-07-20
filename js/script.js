// Global variable for current currency and user region preference
let currentCurrency = 'USD';
let userRegion = 'US'; // Default user region

// Function to get user's approximate country for initial currency setting
function determineUserRegion() {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.includes('en-IN') || userLang.includes('hi-IN')) {
        return 'IN';
    }
    // You could try more advanced IP geolocation (via a free API) here,
    // but for a purely static site, navigator.language is the simplest.
    // Otherwise, default to US.
    return 'US';
}

// Function to format price based on currency
function formatPrice(price, currency) {
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

    let affiliateLink = '#'; // Default to a placeholder if no link is suitable
    let linkText = 'View on Amazon';
    let linkClass = ''; // For styling disabled links

    if (userRegion === 'US' && product.amazonLinkUS) {
        affiliateLink = product.amazonLinkUS;
        linkText = 'Buy on Amazon US';
    } else if (userRegion === 'IN' && product.amazonLinkIN) {
        affiliateLink = product.amazonLinkIN;
        linkText = 'Buy on Amazon IN';
    } else if (product.amazonLinkUS) { // Fallback if userRegion is not explicit or no matching link
        affiliateLink = product.amazonLinkUS;
        linkText = 'Buy on Amazon US';
        console.warn(`No specific IN link or region not detected for ${product.name}. Defaulting to US link.`);
    } else if (product.amazonLinkIN) {
        affiliateLink = product.amazonLinkIN;
        linkText = 'Buy on Amazon IN';
        console.warn(`No specific US link or region not detected for ${product.name}. Defaulting to IN link.`);
    } else {
        linkClass = 'disabled'; // No affiliate link available at all
        linkText = 'Link Unavailable';
    }

    return `
        <div class="product-card">
            <a href="product-detail.html?id=${product.id}" aria-label="View details for ${product.name}">
                <img src="${product.image}" alt="${product.name}">
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

// Function to filter products by category and search term
function getFilteredProducts(category = 'all', searchTerm = '') {
    let filtered = products;

    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            p.description.toLowerCase().includes(lowerCaseSearchTerm) ||
            p.category.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }
    return filtered;
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
            userRegion = currentCurrency === 'INR' ? 'IN' : 'US'; // Align userRegion with currency selection
            currencyToggleButton.textContent = `${currentCurrency === 'USD' ? 'USD' : 'INR'} / ${currentCurrency === 'USD' ? 'INR' : 'USD'}`;
            
            // Re-render products on current page to update prices and links
            if (document.getElementById('all-products-grid')) {
                const activeCategoryButton = document.querySelector('.filter-button.active');
                const currentCategory = activeCategoryButton ? activeCategoryButton.dataset.category : 'all';
                const currentSearchTerm = document.getElementById('product-search').value;
                renderProducts(getFilteredProducts(currentCategory, currentSearchTerm), 'all-products-grid');
            } else if (document.getElementById('featured-products-grid')) {
                renderProducts(products.slice(0, 4), 'featured-products-grid'); // Re-render featured
            } else if (document.getElementById('product-detail-section')) {
                const urlParams = new URLSearchParams(window.location.search);
                const productId = parseInt(urlParams.get('id'));
                if (productId) {
                    displayProductDetail(productId);
                }
            }
        });
    }

    // Homepage Specific Logic
    if (document.getElementById('featured-products-grid')) {
        // Display a few featured products (e.g., first 4)
        renderProducts(products.slice(0, 4), 'featured-products-grid');
    }

    // Products Page Specific Logic
    if (document.getElementById('all-products-grid')) {
        const urlParams = new URLSearchParams(window.location.search);
        const initialCategory = urlParams.get('category') || 'all';

        renderProducts(getFilteredProducts(initialCategory), 'all-products-grid');

        // Highlight initial category button
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
                // Update URL for sharing (optional for static, but good practice)
                const newUrl = new URL(window.location.origin + window.location.pathname);
                if (category !== 'all') {
                    newUrl.searchParams.set('category', category);
                }
                history.pushState({}, '', newUrl); // Changes URL without reloading
            });
        });

        // Search functionality
        const searchInput = document.getElementById('product-search');
        if (searchInput) {
            searchInput.addEventListener('keyup', (event) => {
                const currentCategory = document.querySelector('.filter-button.active').dataset.category;
                const searchTerm = event.target.value;
                renderProducts(getFilteredProducts(currentCategory, searchTerm), 'all-products-grid');
            });
        }
    }

    // Product Detail Page Specific Logic
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

// Function to display individual product details
function displayProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    const detailContainer = document.getElementById('product-detail-section');

    if (product) {
        const price = currentCurrency === 'USD' ? product.priceUSD : product.priceINR;
        const formattedPrice = formatPrice(price, currentCurrency);

        let affiliateLink = '#';
        let linkText = 'View on Amazon';
        let linkClass = '';

        if (userRegion === 'US' && product.amazonLinkUS) {
            affiliateLink = product.amazonLinkUS;
            linkText = 'Buy on Amazon US';
        } else if (userRegion === 'IN' && product.amazonLinkIN) {
            affiliateLink = product.amazonLinkIN;
            linkText = 'Buy on Amazon IN';
        } else if (product.amazonLinkUS) { // Fallback if userRegion is not explicit or no matching link
            affiliateLink = product.amazonLinkUS;
            linkText = 'Buy on Amazon US';
            console.warn(`No specific IN link or region not detected for ${product.name}. Defaulting to US link.`);
        } else if (product.amazonLinkIN) {
            affiliateLink = product.amazonLinkIN;
            linkText = 'Buy on Amazon IN';
            console.warn(`No specific US link or region not detected for ${product.name}. Defaulting to IN link.`);
        } else {
            linkClass = 'disabled'; // No affiliate link available at all
            linkText = 'Link Unavailable';
        }

        detailContainer.innerHTML = `
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
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
        document.getElementById('product-detail-description').setAttribute('content', product.description.substring(0, 160)); // Keep description concise for meta
        document.getElementById('product-detail-keywords').setAttribute('content', `${product.name}, ${product.category}, smart kitchen gadgets, GreenTrend, kitchen tech`);
        
        // Ensure absolute paths for OG images for social media crawlers
        const ogImageUrl = new URL(product.image, window.location.origin).href;
        const ogUrl = new URL(window.location.href).href;

        document.getElementById('og-title').setAttribute('content', product.name);
        document.getElementById('og-description').setAttribute('content', product.description.substring(0, 200) + '...');
        document.getElementById('og-image').setAttribute('content', ogImageUrl);
        document.getElementById('og-url').setAttribute('content', ogUrl);

    } else {
        detailContainer.innerHTML = '<p style="text-align: center; font-size: 1.2rem; color: #cc0000;">Product not found. Please go back to the <a href="products.html">products page</a>.</p>';
    }
}
