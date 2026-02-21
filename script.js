'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const sidebarInfo = document.querySelector(".sidebar-info");

sidebarBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    elementToggleFunc(sidebar);
});

// Make entire sidebar-info clickable on mobile (screens <= 1250px)
sidebarInfo.addEventListener("click", function(e) {
    // Only work on mobile/tablet
    if (window.innerWidth <= 1250) {
        // Prevent triggering if clicking on links or buttons
        if (!e.target.closest('a') && !e.target.closest('button')) {
            elementToggleFunc(sidebar);
        }
    }
});

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}
// Avatar Image Zoom Modal

const avatarImg = document.querySelector('.avatar-box img');
const avatarModal = document.createElement('div');
avatarModal.className = 'avatar-modal';
avatarModal.innerHTML = `
    <div class="avatar-modal-overlay"></div>
    <div class="avatar-modal-content">
        <button class="avatar-modal-close">&times;</button>
        <img src="" alt="Edwin Meiteikini">
    </div>
`;
document.body.appendChild(avatarModal);

const avatarModalOverlay = avatarModal.querySelector('.avatar-modal-overlay');
const avatarModalClose = avatarModal.querySelector('.avatar-modal-close');
const avatarModalImg = avatarModal.querySelector('.avatar-modal-content img');

// Open avatar modal
avatarImg.addEventListener('click', function() {
    avatarModalImg.src = this.src;
    avatarModalImg.alt = this.alt;
    avatarModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close avatar modal
function closeAvatarModal() {
    avatarModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

avatarModalClose.addEventListener('click', closeAvatarModal);
avatarModalOverlay.addEventListener('click', closeAvatarModal);

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && avatarModal.classList.contains('active')) {
        closeAvatarModal();
    }
});
// Handle form submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    formBtn.innerHTML = '<span>Sending...</span>';
    formBtn.setAttribute('disabled', '');
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });
        
        const result = await response.json();
        
        if (result.success) {
            formBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon><span>Message Sent!</span>';
            form.reset();
            setTimeout(() => {
                formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
            }, 3000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formBtn.innerHTML = '<span>Error! Try Again</span>';
        setTimeout(() => {
            formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
            formBtn.removeAttribute('disabled');
        }, 3000);
    }
});

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        for(let i = 0; i < pages.length; i++) {
            if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                pages[i].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove('active');
                navigationLinks[i]. classList.remove('active');
            }
        }
    });
}
// Modern Scroll Animation Observer

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Special handling for skills progress bars
            if (entry.target.classList.contains('skills-item')) {
                const progressBar = entry.target.querySelector('.skills-progress-fill');
                if (progressBar) {
                    const width = progressBar.style.width;
                    progressBar.style.setProperty('--progress-width', width);
                }
            }
        }
    });
}, observerOptions);

// Initialize animations when page loads
function initScrollAnimations() {
    // Animate sections
    const sections = document.querySelectorAll('.about-text, .service, .testimonials, .clients, .timeline, .skill, .projects, .blog-posts, .contact-form, .mapbox');
    sections.forEach((section, index) => {
        section.classList.add('animate-on-scroll', `stagger-delay-${index % 7}`);
        animateOnScroll.observe(section);
    });

    // Animate service items with slide
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        item.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right', `stagger-delay-${index % 7}`);
        animateOnScroll.observe(item);
    });

    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll', `stagger-delay-${index % 7}`);
        animateOnScroll.observe(item);
    });

    // Animate skills items
    const skillsItems = document.querySelectorAll('.skills-item');
    skillsItems.forEach((item, index) => {
        item.classList.add('slide-in-right', `stagger-delay-${index % 7}`);
        animateOnScroll.observe(item);
    });

    // Animate project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        item.classList.add('scale-in', `stagger-delay-${index % 7}`);
        animateOnScroll.observe(item);
    });

    // Animate blog items
    const blogItems = document.querySelectorAll('.blog-post-item');
    blogItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll', `stagger-delay-${index % 7}`);
        animateOnScroll.observe(item);
    });

    // Animate testimonials
    const testimonialItems = document.querySelectorAll('.testimonials-item');
    testimonialItems.forEach((item, index) => {
        item.classList.add('fade-in', `stagger-delay-${index % 7}`);
        animateOnScroll.observe(item);
    });

    // Animate client logos
    const clientItems = document.querySelectorAll('.clients-item');
    clientItems.forEach((item, index) => {
        item.classList.add('scale-in', `stagger-delay-${index % 7}`);
        animateOnScroll.observe(item);
    });
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// Re-observe elements when changing pages
navigationLinks.forEach(link => {
    const originalClick = link.onclick;
    link.addEventListener('click', function() {
        setTimeout(() => {
            initScrollAnimations();
        }, 100);
    });
});

// ===============================
// IMAGE PROTECTION
// ===============================

// Disable right-click on protected images
document.querySelectorAll('.protected-image').forEach(function(element) {
    element.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
});

// Disable drag on all images in protected containers
document.querySelectorAll('.protected-image img').forEach(function(img) {
    img.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
});

// Prevent keyboard shortcuts for saving images (Ctrl+S, Ctrl+Shift+S)
document.addEventListener('keydown', function(e) {
    // Check if focused on protected image area or lightbox is open
    const lightbox = document.querySelector('[data-image-lightbox]');
    if (e.target.closest('.protected-image') || lightbox.classList.contains('active')) {
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            return false;
        }
    }
    // Close lightbox on Escape key
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
    }
});

// ===============================
// IMAGE LIGHTBOX
// ===============================

const avatarTrigger = document.querySelector('[data-avatar-trigger]');
const imageLightbox = document.querySelector('[data-image-lightbox]');
const lightboxCloseButtons = document.querySelectorAll('[data-lightbox-close]');

// Open lightbox when avatar is clicked
if (avatarTrigger && imageLightbox) {
    avatarTrigger.addEventListener('click', function() {
        imageLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close lightbox
    lightboxCloseButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            imageLightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Prevent right-click on lightbox
    imageLightbox.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
}



// Performance: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Page visibility API for analytics
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('User left the page');
    } else {
        console.log('User returned to the page');
    }
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Add loading state
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Print optimization
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// Cookie Consent Management
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookies = document.getElementById('acceptCookies');
const declineCookies = document.getElementById('declineCookies');
const cookiePreferencesBtn = document.getElementById('cookiePreferencesBtn');

// Check if user has already made a choice
const cookieChoice = localStorage.getItem('cookieConsent');

if (!cookieChoice) {
    // Show banner after 2 seconds if no choice made
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 2000);
}

// If cookies were accepted, initialize analytics
if (cookieChoice === 'accepted') {
    if (typeof initAnalytics === 'function') {
        initAnalytics();
    }
}

// Store consent timestamp for legal compliance
function recordConsent(choice) {
    localStorage.setItem('cookieConsent', choice);
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
}

acceptCookies.addEventListener('click', function() {
    recordConsent('accepted');
    cookieConsent.classList.remove('show');
    
    // Initialize Google Analytics
    if (typeof initAnalytics === 'function') {
        initAnalytics();
    }
    
    // Track consent
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }
});

declineCookies.addEventListener('click', function() {
    recordConsent('declined');
    cookieConsent.classList.remove('show');
    
    // Disable analytics
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
    }
});

// Cookie Preferences button - let users change their choice
if (cookiePreferencesBtn) {
    cookiePreferencesBtn.addEventListener('click', function() {
        // Clear previous choice and show banner again
        localStorage.removeItem('cookieConsent');
        localStorage.removeItem('cookieConsentDate');
        cookieConsent.classList.add('show');
        
        // Disable analytics until new consent
        window['ga-disable-G-61TSWEFZQL'] = true;
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    });
}

// Scroll to Top Button
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

scrollTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Performance Monitoring
if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.renderTime || entry.loadTime);
                }
            }
        });
        perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        console.log('Performance monitoring not available');
    }
}

// Network Status Detection
window.addEventListener('online', function() {
    console.log('Back online');
    // You can show a notification here
});

window.addEventListener('offline', function() {
    console.log('No internet connection');
    // You can show a notification here
});

// Accessibility: Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = 'position:absolute;top:-40px;left:0;background:#000;color:#fff;padding:8px;z-index:100;';
skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});
skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Add id to main for skip link
const mainContent = document.querySelector('main');
if (mainContent && !mainContent.id) {
    mainContent.id = 'main-content';
    mainContent.setAttribute('tabindex', '-1');
}
