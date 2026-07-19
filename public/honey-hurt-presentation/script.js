document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const progressBar = document.getElementById('progress');
    const navLeft = document.getElementById('nav-left');
    const navRight = document.getElementById('nav-right');
    const slideNumberDisplay = document.getElementById('slide-number');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function updatePresentation() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index < currentSlide) {
                slide.classList.add('prev');
            }
        });

        // Update progress bar
        const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Update slide number display
        if (slideNumberDisplay) {
            slideNumberDisplay.textContent = `${currentSlide + 1} / ${totalSlides}`;
        }
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updatePresentation();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updatePresentation();
        }
    }

    // Click Events (Navigate by clicking edges of screen)
    document.addEventListener('click', (e) => {
        // Prevent navigation if clicking on a button or link or input
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) return;
        
        const clickX = e.clientX;
        const width = window.innerWidth;
        
        // Left 15% goes back, right 15% goes forward
        if (clickX < width * 0.15) {
            prevSlide();
        } else if (clickX > width * 0.85) {
            nextSlide();
        }
    });

    // Keyboard Events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Touch Events (Swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    }

    // Initialize
    updatePresentation();
});
