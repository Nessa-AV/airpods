// script.js - ЕДИНСТВЕННАЯ ВЕРСИЯ

// Навигация
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
});

function showPage(pageId) {
    console.log('Opening page:', pageId);
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
        window.scrollTo(0, 0);
        if (pageId === 'cart') updateCartUI();
    } else {
        // Если страница не найдена на index.html, переходим на shop.html
        if (pageId === 'shop') {
            window.location.href = 'shop.html';
        } else {
            console.log('Page not found:', pageId);
        }
    }
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Если секции нет на текущей странице, переходим на features.html или tech.html
        if (id === 'features') {
            window.location.href = 'features.html';
        } else if (id === 'tech') {
            window.location.href = 'tech.html';
        } else {
            window.location.href = 'index.html#' + id;
        }
    }
}

// Поиск
function toggleSearch() {
    const overlay = document.getElementById('searchOverlay');
    if (!overlay) return;
    
    if (overlay.style.opacity === '1') {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 300);
    } else {
        overlay.style.display = 'block';
        setTimeout(() => {
            overlay.style.opacity = '1';
            const input = overlay.querySelector('input');
            if (input) input.focus();
        }, 10);
    }
}

// Продукты
function showProductDetail(productId) {
    if (!productDetails || !productDetails[productId]) {
        console.error('Product not found:', productId);
        return;
    }
    
    currentProductId = productId;
    quantities[productId] = 1;
    selectedColors[productId] = productDetails[productId].colors[0];
    
    // Проверяем находимся ли мы на index.html
    if (window.location.pathname.includes('index.html') || 
        window.location.pathname === '/' || 
        window.location.pathname.endsWith('/')) {
        updateProductDetailUI(productId);
        showPage(`product-${productId}`);
    } else {
        // Если мы на другой странице, переходим на index.html
        window.location.href = 'index.html#product-' + productId;
    }
}

function updateProductDetailUI(productId) {
    const cap = productId.charAt(0).toUpperCase() + productId.slice(1);
    const product = productDetails[productId];
    const color = selectedColors[productId];
    
    const nameEl = document.getElementById(`detailName${cap}`);
    const priceEl = document.getElementById(`detailPrice${cap}`);
    const imageEl = document.getElementById(`detailImage${cap}`);
    const qtyEl = document.getElementById(`qtyValue${cap}`);
    const totalEl = document.getElementById(`totalPrice${cap}`);
    
    if (nameEl) nameEl.textContent = product.name;
    if (priceEl) priceEl.textContent = `$${product.basePrice}`;
    if (imageEl) imageEl.src = color.image;
    if (qtyEl) qtyEl.textContent = quantities[productId];
    if (totalEl) totalEl.textContent = product.basePrice * quantities[productId];
    
    const colorBtns = document.querySelectorAll(`#product-${productId} .color-btn`);
    colorBtns.forEach((btn, i) => {
        btn.classList.toggle('active', product.colors[i].name === color.name);
    });
}

function selectColor(btn, productId) {
    const parent = btn.parentNode;
    const index = Array.from(parent.children).indexOf(btn);
    selectedColors[productId] = productDetails[productId].colors[index];
    updateProductDetailUI(productId);
}

function changeImage(thumb, productId) {
    const parent = thumb.parentNode;
    const index = Array.from(parent.children).indexOf(thumb);
    selectedColors[productId] = productDetails[productId].colors[index];
    updateProductDetailUI(productId);
}

function updateQty(change, productId) {
    quantities[productId] = Math.max(1, quantities[productId] + change);
    updateProductDetailUI(productId);
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Исправляем кнопку Buy Now в навигации
    const buyNowBtn = document.querySelector('.btn-primary');
    if (buyNowBtn) {
        buyNowBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'shop.html';
        };
    }
    
    // Исправляем кнопки Buy Now в hero
    document.querySelectorAll('.btn-large.btn-black').forEach(btn => {
        if (btn.textContent.includes('Buy Now')) {
            btn.onclick = function(e) {
                e.preventDefault();
                window.location.href = 'shop.html';
            };
        }
    });
    
    // Исправляем кнопки Learn More
    document.querySelectorAll('.btn-large.btn-outline').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'features.html';
        };
    });
    
    // Добавляем клик на Features секцию
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.addEventListener('click', function(e) {
            // Не срабатывать при клике на кнопки внутри
            if (!e.target.closest('button')) {
                window.location.href = 'features.html';
            }
        });
        featuresSection.style.cursor = 'pointer';
    }
    
    // Добавляем клик на Tech секцию
    const techSection = document.getElementById('tech');
    if (techSection) {
        techSection.addEventListener('click', function(e) {
            if (!e.target.closest('.tech-card')) {
                window.location.href = 'tech.html';
            }
        });
        techSection.style.cursor = 'pointer';
    }
    
    // Клик на tech-card тоже открывает tech.html
    document.querySelectorAll('.tech-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            window.location.href = 'tech.html';
        });
        card.style.cursor = 'pointer';
    });
    
    // Инициализация страницы
    if (document.getElementById('home')) {
        showPage('home');
    }
    
    updateCartBadge();
    
    // Обработка хэша
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if (hash.startsWith('product-')) {
            const productId = hash.replace('product-', '');
            if (productDetails[productId]) {
                setTimeout(() => showProductDetail(productId), 100);
            }
        }
    }
});

// Для открытия features.html
function openFeatures() {
    window.location.href = 'features.html';
}

// Для открытия tech.html  
function openTech() {
    window.location.href = 'tech.html';
}


