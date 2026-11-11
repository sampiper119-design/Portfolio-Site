// Vertical Tab JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.cs-section');
    const navLinks = document.querySelectorAll('.sticky-tab-nav a');

    if (!sections.length || !navLinks.length) return;

    const tabList = document.querySelector('.sticky-tab-nav ul');

    // Horizontal tab bar (half-screen + mobile): slide the active tab into view
    const scrollTabIntoView = (link) => {
        if (tabList.scrollWidth <= tabList.clientWidth) return; // vertical sidebar, or all tabs fit
        const linkBox = link.getBoundingClientRect();
        const listBox = tabList.getBoundingClientRect();
        tabList.scrollTo({
            left: tabList.scrollLeft + (linkBox.left - listBox.left) - 16,
            behavior: 'smooth'
        });
    };

    // Fade the right edge while more tabs are hidden off-screen
    const updateTabFade = () => {
        const moreToRight = tabList.scrollLeft + tabList.clientWidth < tabList.scrollWidth - 4;
        tabList.classList.toggle('has-more', moreToRight);
    };
    tabList.addEventListener('scroll', updateTabFade);
    window.addEventListener('resize', updateTabFade);
    updateTabFade();

    // Configuration for the scroll observer
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Triggers active state when section reaches upper middle viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    const linkTarget = link.getAttribute('href').replace('#', '');

                    if (linkTarget === currentId) {
                        link.classList.add('active');
                        scrollTabIntoView(link);
                    } else {
                        link.classList.remove('active');
                        scrollTabIntoView(link);
                    }
                });
            }
        });
    }, observerOptions);

    // Observe each case study section
    sections.forEach(section => observer.observe(section));

    // Smooth scroll handling when clicking a tab link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').replace('#', '');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Update active class immediately on click
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Smoothly scroll to the section taking top navbar height into account
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - 90;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// -------------- StudyScape Carousel JavaScript --------------------------
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button-right');
    const prevButton = document.querySelector('.carousel-button-left');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    let currentIndex = 0;

    // Position slides side-by-side
    const updateSlidePosition = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Update active dot styling
    const updateDots = (targetIndex) => {
        dots.forEach(dot => dot.classList.remove('current-slide'));
        if (dots[targetIndex]) {
            dots[targetIndex].classList.add('current-slide');
        }
    };

    // Next Button Click
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
        updateDots(currentIndex);
    });

    // Previous Button Click
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlidePosition();
        updateDots(currentIndex);
    });

    // Dot Indicators Click
    dotsNav.addEventListener('click', (e) => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        currentIndex = dots.indexOf(targetDot);
        updateSlidePosition();
        updateDots(currentIndex);
    });

    // Touch Swipe Support for Mobile
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 40) {
            if (diffX > 0) {
                // Swiped left -> next
                currentIndex = (currentIndex + 1) % slides.length;
            } else {
                // Swiped right -> prev
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            }
            updateSlidePosition();
            updateDots(currentIndex);
        }
    });
});

// ------------ Lightbox Modal JavaScript -------------------------
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!lightbox) return;

    let currentGallery = [];
    let currentIndex = 0;

    const updateLightboxImage = () => {
        lightboxImg.src = currentGallery[currentIndex];
        lightboxCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;

        // Hide arrows if only 1 image exists
        if (currentGallery.length <= 1) {
            lightbox.classList.add('single-image-mode');
        } else {
            lightbox.classList.remove('single-image-mode');
        }
    };

    // Open Lightbox when clicking any process image
    document.querySelectorAll('.process-step-card img').forEach(img => {
        img.addEventListener('click', () => {
            try {
                currentGallery = JSON.parse(img.getAttribute('data-gallery'));
            } catch (e) {
                currentGallery = [img.src];
            }
            currentIndex = 0;

            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Carousel Controls
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxImage();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateLightboxImage();
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });
});