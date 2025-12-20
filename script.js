'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

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
