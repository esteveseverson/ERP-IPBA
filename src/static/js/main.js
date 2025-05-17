import { initNavbar } from "./components/navbar.js";
import { initCarousel } from "./components/carousel.js";
import { initMap } from "./components/map.js";

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    console.log('iniciou navbar')
    initMap();
    console.log('iniciou mapa')
    initCarousel();
    console.log('iniciou carrossel')

    
    // initSchedule();
    // initContact();

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        console.log('iniciou ancora')
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
});