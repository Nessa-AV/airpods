// Анимации - навешиваются после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Анимация для search button
    document.addEventListener('mousemove', function(e) {
        const searchBtn = document.querySelector('.nav-btn:first-child');
        if (searchBtn) {
            const rect = searchBtn.getBoundingClientRect();
            const dist = Math.hypot(
                e.clientX - (rect.left + rect.width/2),
                e.clientY - (rect.top + rect.height/2)
            );
            
            if (dist < 100) {
                const moveX = (e.clientX - (rect.left + rect.width/2)) * 0.3;
                const moveY = (e.clientY - (rect.top + rect.height/2)) * 0.3;
                searchBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                searchBtn.style.transform = 'translate(0, 0)';
            }
        }
    });

    // Анимация для cart button
    document.addEventListener('mousemove', function(e) {
        const cartBtn = document.querySelector('.nav-btn:nth-child(2)');
        if (cartBtn) {
            const rect = cartBtn.getBoundingClientRect();
            const dist = Math.hypot(
                e.clientX - (rect.left + rect.width/2),
                e.clientY - (rect.top + rect.height/2)
            );
            
            if (dist < 100) {
                const moveX = (e.clientX - (rect.left + rect.width/2)) * 0.3;
                const moveY = (e.clientY - (rect.top + rect.height/2)) * 0.3;
                cartBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                cartBtn.style.transform = 'translate(0, 0)';
            }
        }
    });

    // Анимация для buy button
    document.addEventListener('mousemove', function(e) {
        const buyBtn = document.querySelector('.btn-primary');
        if (buyBtn) {
            const rect = buyBtn.getBoundingClientRect();
            const dist = Math.hypot(
                e.clientX - (rect.left + rect.width/2),
                e.clientY - (rect.top + rect.height/2)
            );
            
            if (dist < 100) {
                const moveX = (e.clientX - (rect.left + rect.width/2)) * 0.3;
                const moveY = (e.clientY - (rect.top + rect.height/2)) * 0.3;
                buyBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                buyBtn.style.transform = 'translate(0, 0)';
            }
        }
    });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
});