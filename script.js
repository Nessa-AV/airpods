// Навигация
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
});

function showPage(pageId) {
    console.log('Opening page:', pageId); // для отладки
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
        window.scrollTo(0, 0);
        if (pageId === 'cart') updateCartUI();
    } else {
        console.log('Page not found:', pageId);
        // Если страница не найдена, откройте главную
        const homePage = document.getElementById('home') || document.getElementById('shop');
        if (homePage) homePage.classList.add('active');
    }
}

// Остальной код без изменений...

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Попробуйте открыть shop или home
    const firstPage = document.getElementById('shop') || document.getElementById('home') || document.querySelector('.page');
    if (firstPage) {
        showPage(firstPage.id);
    }
    updateCartBadge();
});

// Принудительно добавить класс после загрузки
document.addEventListener('DOMContentLoaded', function() {
    const span = document.querySelector('.hero-text h1 span');
    if (span) {
        span.style.background = 'linear-gradient(135deg, #0071e3, #af52de)';
        span.style.webkitBackgroundClip = 'text';
        span.style.webkitTextFillColor = 'transparent';
        span.style.backgroundClip = 'text';
    }
});