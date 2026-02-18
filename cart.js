// Функции корзины - ГЛОБАЛЬНЫЕ

function getCartItemId(productId, colorName) {
    return `${productId}-${colorName}`;
}

function updateCartBadge() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = count;
        badge.classList.toggle('show', count > 0);
    }
}

function showNotification(msg) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}

function addToCart(productId, color, quantity = 1) {
    const product = productDetails[productId];
    const itemId = getCartItemId(productId, color.name);
    
    const existing = cart.find(item => item.id === itemId);
    if (existing) {
        existing.qty += quantity;
    } else {
        cart.push({
            id: itemId,
            productId,
            name: product.name,
            price: product.basePrice,
            qty: quantity,
            image: color.image,
            color: color.name,
            colorCode: color.code
        });
    }
    
    updateCartBadge();
    showNotification('Added to cart!');
}

function addToCartFromDetail(productId) {
    addToCart(productId, selectedColors[productId], quantities[productId]);
    quantities[productId] = 1;
    updateProductDetailUI(productId);
}

function updateCartUI() {
    const empty = document.getElementById('cartEmpty');
    const content = document.getElementById('cartContent');
    const items = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        if (empty) empty.style.display = 'block';
        if (content) content.style.display = 'none';
        return;
    }
    
    if (empty) empty.style.display = 'none';
    if (content) content.style.display = 'block';
    
    if (items) {
        items.innerHTML = cart.map((item, i) => `
            <div class="cart-item">
                <img src="${item.image}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">
                        ${item.name}
                        <span class="cart-color-indicator" style="background: ${item.colorCode};" title="${item.color}"></span>
                    </div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div style="font-size: 12px; color: #86868b;">Color: ${item.color}</div>
                </div>
                <div class="quantity-control">
                    <button class="qty-btn" onclick="updateCartQty(${i}, -1)">−</button>
                    <div class="qty-value">${item.qty}</div>
                    <button class="qty-btn" onclick="updateCartQty(${i}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeCartItem(${i})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </div>
        `).join('');
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal}`;
    if (totalEl) totalEl.textContent = `$${subtotal}`;
}

function updateCartQty(index, change) {
    if (cart[index]) {
        cart[index].qty = Math.max(1, cart[index].qty + change);
        updateCartUI();
        updateCartBadge();
    }
}

function removeCartItem(index) {
    cart.splice(index, 1);
    updateCartUI();
    updateCartBadge();
}

function checkout() {
    const totalEl = document.getElementById('cartTotal');
    if (cart.length === 0) {
        showNotification('Cart is empty');
    } else if (totalEl) {
        showNotification(`Checkout total: ${totalEl.textContent}`);
    }
}