export function initNavbar() {
    const navbar = document.getElementById('navbar');

    // Handle scroll effect on navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 50) {
            navbar.classList.add('py-2');
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('py-2');
            navbar.classList.remove('shadow-lg');
        }
    });

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        if (hamburger.classList.contains('open')) {
            mobileMenu.classList.remove('max-h-0');
            mobileMenu.classList.add('max-h-screen');
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        } else {
            mobileMenu.classList.remove('max-h-screen');
            mobileMenu.classList.add('max-h-0');
            mobileMenu.style.maxHeight = '0';
        }
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.style.maxHeight = '0';
        });
    });
}