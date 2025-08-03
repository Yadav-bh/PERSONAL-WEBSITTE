/**
 * Image Slider Functionality
 * Displays two images at a time with auto-sliding and navigation controls
 */

document.addEventListener('DOMContentLoaded', function() {
    // Slider elements
    const slider = document.querySelector('.slider');
    const sliderTrack = document.querySelector('.slider-track');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    
    // Image paths array - using the provided images
    const images = [
        'ChatGPT Image Aug 2, 2025, 01_24_51 PM.png',
        'download (1).jpeg',
        'download.jpeg',
        'download.jpg',
        'images (1).jpg',
        'images (2).jpg',
        'images (3).jpg',
        'images (4).jpg',
        'images (5).jpg',
        'images (6).jpg',
        'images (7).jpg',
        'images (9).jpg',
        'images (10).jpg',
        'images.jpg',
        'images.png'
    ];
    
    let currentIndex = 0;
    const SLIDE_DURATION = 5000; // 5 seconds
    let autoSlideInterval;
    
    // Create slider HTML structure
    function initializeSlider() {
        // Create slide container if it doesn't exist
        if (!sliderTrack) {
            console.error('Slider track element not found');
            return;
        }
        
        // Clear existing content
        sliderTrack.innerHTML = '';
        
        // Create a single slide container for two images
        const slide = document.createElement('div');
        slide.className = 'slider-slide';
        
        // Create two image elements
        const img1 = document.createElement('img');
        img1.className = 'slider-image';
        img1.alt = 'Slide 1';
        
        const img2 = document.createElement('img');
        img2.className = 'slider-image';
        img2.alt = 'Slide 2';
        
        // Add images to slide
        slide.appendChild(img1);
        slide.appendChild(img2);
        
        // Add slide to track
        sliderTrack.appendChild(slide);
        
        // Set initial images
        updateVisibleImages();
        
        // Add event listeners
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }
        
        // Pause on hover
        if (slider) {
            slider.addEventListener('mouseenter', stopAutoSlide);
            slider.addEventListener('mouseleave', startAutoSlide);
        }
        
        // Start auto-sliding
        startAutoSlide();
    }
    
    // Update the two visible images
    function updateVisibleImages() {
        const imageElements = document.querySelectorAll('.slider-image');
        if (imageElements.length < 2) {
            console.error('Not enough slider images found');
            return;
        }
        
        if (images.length < 2) {
            console.error('Not enough images in the images array');
            return;
        }
        
        // Make sure we have valid indices
        const firstIndex = currentIndex % images.length;
        const secondIndex = (firstIndex + 1) % images.length;
        
        console.log('Updating slider images:', {
            firstIndex,
            secondIndex,
            firstImage: images[firstIndex],
            secondImage: images[secondIndex]
        });
        
        // Set image sources using the global images array
        imageElements[0].src = images[firstIndex];
        imageElements[0].alt = 'Slide ' + (firstIndex + 1);
        
        imageElements[1].src = images[secondIndex];
        imageElements[1].alt = 'Slide ' + (secondIndex + 1);
    }
    
    // Go to next slide
    function nextSlide() {
        if (images.length < 2) return;
        
        currentIndex = (currentIndex + 2) % images.length;
        console.log('Next slide - currentIndex:', currentIndex);
        updateVisibleImages();
    }
    
    // Go to previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 2 + images.length) % images.length;
        updateVisibleImages();
        resetAutoSlide();
    }
    
    // Start auto sliding
    function startAutoSlide() {
        if (!autoSlideInterval) {
            autoSlideInterval = setInterval(nextSlide, SLIDE_DURATION);
        }
    }
    
    // Stop auto sliding
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    // Reset auto slide timer
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Initialize the slider when the DOM is ready
    function init() {
        console.log('Initializing slider...');
        initializeSlider();
        
        // Make sure we have images to work with
        if (images.length < 2) {
            console.error('Not enough images in the slider. At least 2 images are required.');
            return;
        }
        
        console.log('Slider initialized with', images.length, 'images');
        
        // Start auto-slide after a short delay to ensure everything is ready
        setTimeout(() => {
            console.log('Starting auto-slide...');
            startAutoSlide();
        }, 1000);
    }

    // Start the initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM is already ready
        setTimeout(init, 0);
    }
});
