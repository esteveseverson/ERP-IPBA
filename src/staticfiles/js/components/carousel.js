export function initCarousel() {
    const carousel = document.getElementById('carousel');

    // Carousel content
    const slides = [
        {
            image: 'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            title: 'Nossa Fundação',
            text: 'A Igreja Presbiteriana do Brasil foi fundada pelo missionário americano Ashbel Green Simonton, que chegou ao Rio de Janeiro em 12 de agosto de 1859. A primeira igreja foi organizada em 12 de janeiro de 1862.'
        },
        {
            image: 'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            title: 'A Expansão',
            text: 'Ao longo dos anos, a igreja expandiu-se por todo o Brasil, levando a mensagem do evangelho e os princípios da fé reformada a todas as regiões do país, fundando escolas, seminários e instituições de assistência social.'
        },
        {
            image: 'https://images.pexels.com/photos/13832895/pexels-photo-13832895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            title: 'A Igreja Hoje',
            text: 'Hoje, a Igreja Presbiteriana do Brasil conta com milhares de igrejas em todo o território nacional, mantendo-se fiel à Palavra de Deus e aos princípios da Reforma Protestante, promovendo a educação cristã e o serviço ao próximo.'
        }
    ];

    // Generate carousel HTML
    carousel.innerHTML = `
      <div class="carousel-container rounded-lg overflow-hidden shadow-xl animate-on-scroll mb-12">
        <div class="carousel-slides h-96 md:h-[500px]">
          ${slides.map((slide, index) => `
            <div class="carousel-slide ${index === 0 ? 'active' : ''}">
              <div class="flex flex-col md:flex-row h-full">
                <div class="w-full md:w-1/2 h-48 md:h-full">
                  <img 
                    src="${slide.image}" 
                    alt="${slide.title}" 
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
                  <h3 class="text-2xl font-serif font-bold text-primary mb-4">${slide.title}</h3>
                  <p class="text-gray-700">${slide.text}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <!-- Navigation Arrows -->
        <button class="carousel-prev absolute top-1/2 left-4 transform -translate-y-1/2 bg-white opacity-25 hover:opacity-100 rounded-full p-2 focus:outline-none transition duration-300 shadow-md">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button class="carousel-next absolute top-1/2 right-4 transform -translate-y-1/2 bg-white opacity-25 hover:opacity-100 rounded-full p-2 focus:outline-none transition duration-300 shadow-md">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
        
        <!-- Indicators -->
        <div class="flex justify-center mt-4 mb-4 space-x-2">
          ${slides.map((_, index) => `
            <button class="carousel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
          `).join('')}
        </div>
      </div>
    `;
    console.log(carousel.innerHTML)

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