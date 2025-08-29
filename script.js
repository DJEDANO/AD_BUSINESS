// Données des produits
const products = [
    {
        id: 1,
        name: "Ordinateur Portable HP 15s",
        category: "ordinateurs",
        price: 350000,
        image: "./Assets/produit1.jpeg",
        description: "Ordinateur portable HP 15s avec processeur Intel Core i5, 8GB RAM, 512GB SSD."
    },
    {
        id: 2,
        name: "Samsung Galaxy A54",
        category: "telephones",
        price: 180000,
        image: "./Assets/produit2.jpeg",
        description: "Smartphone Samsung Galaxy A54 avec écran 6.4\", 128GB de stockage, appareil photo 50MP."
    },
    {
        id: 3,
        name: "Powerbank Xiaomi 20000mAh",
        category: "powerbanks",
        price: 25000,
        image: "./Assets/produit3.jpeg",
        description: "Powerbank haute capacité Xiaomi 20000mAh avec charge rapide et double port USB."
    },
    {
        id: 4,
        name: "Disque Dur Externe Seagate 1TB",
        category: "stockage",
        price: 45000,
        image: "./Assets/produit4.jpeg",
        description: "Disque dur externe Seagate 1TB portable, compatible USB 3.0."
    },
    {
        id: 5,
        name: "Clé USB Sandisk 64GB",
        category: "stockage",
        price: 12000,
        image: "./Assets/produit5.jpeg",
        description: "Clé USB Sandisk Ultra Flair 64GB avec transfert de données rapide."
    },
    {
        id: 6,
        name: "iPhone 13 Reconditionné",
        category: "telephones",
        price: 300000,
        image: "./Assets/produit6.jpeg",
        description: "iPhone 13 reconditionné avec garantie, écran 6.1\", 128GB."
    },
    {
        id: 7,
        name: "Souris Sans Fil Logitech",
        category: "accessoires",
        price: 5000,
        image: "./Assets/produit7.jpeg",
        description: "Souris sans fil Logitech M170, design ergonomique, portée 10m."
    },
    {
        id: 8,
        name: "Casque Bluetooth JBL",
        category: "accessoires",
        price: 15000,
        image: "./Assets/produit8.jpeg",
        description: "Casque audio Bluetooth JBL T460BT, pliable, autonomie 11h."
    },
    {
        id: 9,
        name: "Adaptateur USB-C Multiport",
        category: "accessoires",
        price: 18000,
        image: "./Assets/produit9.jpeg",
        description: "Adaptateur USB-C vers HDMI, USB 3.0 et charge pour MacBook et autres appareils."
    },
    {
        id: 10,
        name: "Ordinateur Bureau Dell Optiplex",
        category: "ordinateurs",
        price: 280000,
        image: "./Assets/produit10.jpeg",
        description: "Tour Dell Optiplex avec processeur Intel Core i5, 8GB RAM, 256GB SSD."
    },
    {
        id: 11,
        name: "Powerbank Anker 10000mAh",
        category: "powerbanks",
        price: 20000,
        image: "./Assets/produit11.jpeg",
        description: "Powerbank compact Anker 10000mAh avec technologie PowerIQ pour charge rapide."
    },
    {
        id: 12,
        name: "Tecno Spark 10 Pro",
        category: "telephones",
        price: 120000,
        image: "./Assets/produit12.jpeg",
        description: "Smartphone Tecno Spark 10 Pro avec écran 6.8\", 8GB RAM, 256GB stockage."
    }
];

// Panier
let cart = [];
let cartCount = 0;

// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Slider functionality
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

// Create dots for slider
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Function to go to specific slide
function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Next slide
nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
});

// Previous slide
prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
});

// Auto slide
let slideInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
}, 5000);

// Pause auto slide when hovering over slider
const slider = document.querySelector('.slider-container');
slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
});

// Afficher les produits
function displayProducts(category = 'all') {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)} FCFA</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Ajouter
                    </button>
                    <button class="view-details" data-id="${product.id}">
                        Détails
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Ajouter les événements aux boutons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
            addToCart(productId);
        });
    });
    
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.view-details').dataset.id);
            showProductDetails(productId);
        });
    });
}

// Filtrer les produits
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        displayProducts(filter);
    });
});

// Format du prix
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Ajouter au panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${product.name} ajouté au panier`);
}

// Mettre à jour le compteur du panier
function updateCartCount() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

// Afficher une notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `
        <p>${message}</p>
    `;
    
    // Style de la notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--accent-green)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = 'var(--border-radius)';
    notification.style.boxShadow = 'var(--box-shadow)';
    notification.style.zIndex = '3000';
    notification.style.animation = 'fadeIn 0.5s, fadeOut 0.5s 2.5s forwards';
    
    document.body.appendChild(notification);
    
    // Supprimer la notification après 3 secondes
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Afficher les détails du produit
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    
    // Créer un modal pour les détails du produit
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Détails du produit</h2>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="product-details">
                    <div class="product-details-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-details-info">
                        <h3>${product.name}</h3>
                        <div class="product-details-category">${product.category}</div>
                        <div class="product-details-price">${formatPrice(product.price)} FCFA</div>
                        <p class="product-details-description">${product.description}</p>
                        <button class="btn primary-btn add-to-cart-details" data-id="${product.id}">
                            <i class="fas fa-cart-plus"></i> Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Afficher le modal
    modal.style.display = 'block';
    
    // Fermer le modal
    modal.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none';
        modal.remove();
    });
    
    // Ajouter au panier depuis le modal
    modal.querySelector('.add-to-cart-details').addEventListener('click', () => {
        addToCart(productId);
        modal.style.display = 'none';
        modal.remove();
    });
    
    // Fermer le modal en cliquant à l'extérieur
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    });
}

// Panier modal
const cartModal = document.getElementById('panier-modal');
const cartLink = document.querySelector('.cart-link');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout');

// Ouvrir le panier
cartLink.addEventListener('click', (e) => {
    e.preventDefault();
    updateCartModal();
    cartModal.style.display = 'block';
});

// Fermer le panier
closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Merci pour votre commande ! Nous vous contacterons bientôt pour finaliser votre achat.');
        cart = [];
        updateCartCount();
        updateCartModal();
        cartModal.style.display = 'none';
    } else {
        alert('Votre panier est vide. Ajoutez des produits avant de commander.');
    }
});

// Fermer le modal en cliquant à l'extérieur
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Mettre à jour le modal du panier
function updateCartModal() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide.</p>';
        cartTotalPrice.textContent = '0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)} FCFA x ${item.quantity}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
                <span class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></span>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotalPrice.textContent = formatPrice(total);
    
    // Ajouter les événements aux boutons de quantité
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.increase').dataset.id);
            const item = cart.find(item => item.id === productId);
            item.quantity += 1;
            updateCartModal();
            updateCartCount();
        });
    });
    
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.decrease').dataset.id);
            const item = cart.find(item => item.id === productId);
            
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== productId);
            }
            
            updateCartModal();
            updateCartCount();
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.remove-item').dataset.id);
            cart = cart.filter(item => item.id !== productId);
            updateCartModal();
            updateCartCount();
        });
    });
}

// Form validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Reset error states
    [name, email, subject, message].forEach(field => {
        field.style.borderColor = '#ddd';
    });
    
    // Validate name
    if (!name.value.trim()) {
        name.style.borderColor = 'red';
        isValid = false;
    }
    
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
        email.style.borderColor = 'red';
        isValid = false;
    }
    
    // Validate subject
    if (!subject.value) {
        subject.style.borderColor = 'red';
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        message.style.borderColor = 'red';
        isValid = false;
    }
    
    if (isValid) {
        // Here you would typically send the form data to a server
        alert('Merci pour votre message ! Nous vous contacterons bientôt.');
        contactForm.reset();
    }
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    
    if (emailInput.value) {
        alert('Merci de vous être abonné à notre newsletter !');
        emailInput.value = '';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card, .gallery-item, .stat, .info-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animated elements
document.querySelectorAll('.product-card, .gallery-item, .stat, .info-item').forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Trigger once on load
window.addEventListener('load', animateOnScroll);

// Filtrer les produits depuis le footer
document.querySelectorAll('.footer-section a[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = link.getAttribute('data-filter');
        
        // Mettre à jour les boutons de filtre
        filterBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.filter-btn[data-filter="${filter}"]`).classList.add('active');
        
        // Afficher les produits filtrés
        displayProducts(filter);
        
        // Faire défiler jusqu'au catalogue
        const catalogueSection = document.getElementById('catalogue');
        window.scrollTo({
            top: catalogueSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Initialiser la page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
});