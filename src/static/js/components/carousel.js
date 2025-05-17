export function initCarousel() {
    // Initialize carousel functionality
    let currentSlide = 0;
    const slidesEl = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    // Show a specific slide
    function showSlide(index) {
        slidesEl.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        slidesEl[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slidesEl.length;
        showSlide(currentSlide);
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slidesEl.length) % slidesEl.length;
        showSlide(currentSlide);
    }

    // Set up event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });

    // Auto advance slides
    let interval = setInterval(nextSlide, 5000);

    // Pause auto advance on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => clearInterval(interval));
    carouselContainer.addEventListener('mouseleave', () => {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    });
}