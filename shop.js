// Shop Page JavaScript Functionality

// Shopping cart data
let cart = [];
let cartTotal = 0;

// Product data
const products = [
    {
        id: 1,
        name: "Button Mushroom Spawn",
        price: 150,
        category: "button",
        image: "https://via.placeholder.com/300x200/2c5530/ffffff?text=Button+Spawn",
        description: "High-quality spawn for button mushroom cultivation",
        rating: 5,
        reviews: 24
    },
    {
        id: 2,
        name: "Oyster Mushroom Spawn",
        price: 120,
        category: "oyster",
        image: "https://via.placeholder.com/300x200/4a7c59/ffffff?text=Oyster+Spawn",
        description: "Premium spawn for oyster mushroom production",
        rating: 4,
        reviews: 18
    },
    {
        id: 3,
        name: "Shiitake Mushroom Spawn",
        price: 200,
        category: "shiitake",
        image: "https://via.placeholder.com/300x200/2c5530/ffffff?text=Shiitake+Spawn",
        description: "Premium quality spawn for shiitake mushrooms",
        rating: 5,
        reviews: 31
    },
    {
        id: 4,
        name: "Reishi Mushroom Spawn",
        price: 180,
        category: "specialty",
        image: "https://via.placeholder.com/300x200/4a7c59/ffffff?text=Reishi+Spawn",
        description: "Medicinal mushroom spawn for health benefits",
        rating: 4,
        reviews: 12
    },
    {
        id: 5,
        name: "Portobello Mushroom Spawn",
        price: 160,
        category: "button",
        image: "https://via.placeholder.com/300x200/2c5530/ffffff?text=Portobello+Spawn",
        description: "Large button mushroom variety spawn",
        rating: 5,
        reviews: 15
    },
    {
        id: 6,
        name: "Pink Oyster Mushroom Spawn",
        price: 130,
        category: "oyster",
        image: "https://via.placeholder.com/300x200/4a7c59/ffffff?text=Pink+Oyster+Spawn",
        description: "Colorful variety of oyster mushroom spawn",
        rating: 4,
        reviews: 8
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize shop functionality
    initializeShop();
    updateCartDisplay();
    
    console.log('Shop page loaded successfully!');
});

function initializeShop() {
    // Filter functionality
    setupFilters();
    
    // Sort functionality
    setupSorting();
    
    // View toggle functionality
    setupViewToggle();
    
    // Cart functionality
    setupCart();
    
    // Product modal functionality
    setupProductModal();
    
    // Load more functionality
    setupLoadMore();
}

function setupFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const clearFiltersBtn = document.querySelector('.clear-filters');
    
    // Category filters
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    
    // Price range filter
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = this.value;
            filterProducts();
        });
    }
    
    // Clear filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            if (priceRange) {
                priceRange.value = 500;
                priceValue.textContent = '500';
            }
            filterProducts();
        });
    }
}

function setupSorting() {
    const sortSelect = document.getElementById('sortSelect');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
}

function setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('productsGrid');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update grid view
            if (view === 'list') {
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
            }
        });
    });
}

function setupCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCartBtn = document.querySelector('.close-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Open cart sidebar
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            cartSidebar.classList.add('open');
        });
    }
    
    // Close cart sidebar
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', function() {
            cartSidebar.classList.remove('open');
        });
    }
    
    // Checkout functionality
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                showNotification('Redirecting to checkout...', 'info');
                // In a real application, this would redirect to checkout page
            } else {
                showNotification('Your cart is empty!', 'error');
            }
        });
    }
    
    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (cartSidebar.classList.contains('open') && 
            !cartSidebar.contains(e.target) && 
            !cartIcon.contains(e.target)) {
            cartSidebar.classList.remove('open');
        }
    });
}

function setupProductModal() {
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const modal = document.getElementById('productModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const addToCartModalBtn = document.querySelector('.add-to-cart-modal');
    
    // Open modal
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product'));
            const product = products.find(p => p.id === productId);
            
            if (product) {
                openProductModal(product);
            }
        });
    });
    
    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.classList.remove('show');
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    // Add to cart from modal
    if (addToCartModalBtn) {
        addToCartModalBtn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product'));
            const quantity = parseInt(document.getElementById('modalQuantity').value);
            addToCart(productId, quantity);
            modal.classList.remove('show');
        });
    }
    
    // Quantity controls in modal
    const quantityMinus = document.querySelector('.quantity-btn.minus');
    const quantityPlus = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.getElementById('modalQuantity');
    
    if (quantityMinus) {
        quantityMinus.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }
    
    if (quantityPlus) {
        quantityPlus.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    }
}

function setupLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            showNotification('Loading more products...', 'info');
            // In a real application, this would load more products from server
        });
    }
}

function filterProducts() {
    const checkedCategories = Array.from(document.querySelectorAll('.filter-option input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
    const maxPrice = parseInt(document.getElementById('priceRange').value);
    const productItems = document.querySelectorAll('.product-item');
    let visibleCount = 0;
    
    productItems.forEach(item => {
        const category = item.getAttribute('data-category');
        const price = parseInt(item.getAttribute('data-price'));
        
        if (checkedCategories.includes(category) && price <= maxPrice) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // Update results count
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `${visibleCount} products found`;
    }
}

function sortProducts(sortBy) {
    const productsGrid = document.getElementById('productsGrid');
    const productItems = Array.from(document.querySelectorAll('.product-item'));
    
    productItems.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
            case 'price-low':
                return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
            case 'price-high':
                return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
            case 'popularity':
                // Sort by reviews count (simplified)
                const reviewsA = parseInt(a.querySelector('.product-rating span').textContent.match(/\d+/)[0]);
                const reviewsB = parseInt(b.querySelector('.product-rating span').textContent.match(/\d+/)[0]);
                return reviewsB - reviewsA;
            default:
                return 0;
        }
    });
    
    // Re-append sorted items
    productItems.forEach(item => {
        productsGrid.appendChild(item);
    });
}

function openProductModal(product) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalProductName = document.getElementById('modalProductName');
    const modalDescription = document.getElementById('modalDescription');
    const modalRating = document.getElementById('modalRating');
    const modalPrice = document.getElementById('modalPrice');
    const addToCartModalBtn = document.querySelector('.add-to-cart-modal');
    
    // Populate modal with product data
    modalTitle.textContent = product.name;
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalProductName.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `₹${product.price}/kg`;
    
    // Generate rating stars
    let ratingHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= product.rating) {
            ratingHTML += '<i class="fas fa-star"></i>';
        } else {
            ratingHTML += '<i class="far fa-star"></i>';
        }
    }
    ratingHTML += ` <span>(${product.reviews} reviews)</span>`;
    modalRating.innerHTML = ratingHTML;
    
    // Set product ID for add to cart
    addToCartModalBtn.setAttribute('data-product', product.id);
    
    // Reset quantity
    document.getElementById('modalQuantity').value = 1;
    
    // Show modal
    modal.classList.add('show');
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        updateCartDisplay();
        showNotification(`${product.name} added to cart!`, 'success');
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showNotification('Item removed from cart', 'info');
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Update cart total
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotalElement) {
        cartTotalElement.textContent = cartTotal;
    }
    
    // Update cart items display
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;">
                    <div class="cart-item-details">
                        <h5>${item.name}</h5>
                        <p>₹${item.price} × ${item.quantity}</p>
                        <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #ff6b6b; cursor: pointer; font-size: 0.9rem;">Remove</button>
                    </div>
                </div>
            `).join('');
        }
    }
}

// Add to cart buttons functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
        const button = e.target.classList.contains('add-to-cart-btn') ? e.target : e.target.closest('.add-to-cart-btn');
        const productId = parseInt(button.getAttribute('data-product'));
        addToCart(productId, 1);
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications if not already present
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
        
        .cart-item {
            display: flex;
            gap: 1rem;
            align-items: center;
            padding: 1rem 0;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .cart-item:last-child {
            border-bottom: none;
        }
        
        .cart-item-details h5 {
            margin-bottom: 0.5rem;
            color: #333;
            font-size: 0.9rem;
        }
        
        .cart-item-details p {
            color: #666;
            font-size: 0.8rem;
            margin-bottom: 0.5rem;
        }
    `;
    document.head.appendChild(style);
}
