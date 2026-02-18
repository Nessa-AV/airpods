document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.page-header');
    if (!header) return;
    
    header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const moveX = (x - rect.width / 2) / 20;
        const moveY = (y - rect.height / 2) / 20;
        
        header.style.setProperty('--mouse-x', moveX);
        header.style.setProperty('--mouse-y', moveY);
    });
    
    header.addEventListener('mouseleave', () => {
        header.style.setProperty('--mouse-x', 0);
        header.style.setProperty('--mouse-y', 0);
    });
});