document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile navigation
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or system preference
    function checkTheme() {
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-theme');
            if (themeToggle) {
                themeToggle.querySelector('svg').setAttribute('fill', '#fff');
            }
        } else {
            document.body.classList.remove('dark-theme');
            if (themeToggle) {
                themeToggle.querySelector('svg').removeAttribute('fill');
            }
        }
    }

    // Initialize theme on page load
    checkTheme();

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (document.body.classList.contains('dark-theme')) {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
                this.querySelector('svg').removeAttribute('fill');
            } else {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
                this.querySelector('svg').setAttribute('fill', '#fff');
            }
        });
    }

    // Watch for system theme changes
    prefersDarkScheme.addListener((e) => {
        // Only react if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            checkTheme();
        }
    });

    // Scroll behavior for navigation
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Highlight active section in navigation
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Text rotation animation in hero section
    class TxtRotate {
        constructor(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        }
        
        tick() {
            const i = this.loopNum % this.toRotate.length;
            const fullTxt = this.toRotate[i];
            
            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
            
            this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
            
            let delta = 200 - Math.random() * 100;
            
            if (this.isDeleting) {
                delta /= 2;
            }
            
            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }
            
            setTimeout(() => {
                this.tick();
            }, delta);
        }
    }
    
    const elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const form = document.getElementById('form');
    if (form) {
        // Initialize EmailJS
        emailjs.init('_ivRMPZ1Vb4rcUZCD');

        const btn = document.getElementById('button');
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            emailjs.sendForm('default_service', 'template_2x5ihom', this)
                .then(() => {
                    btn.textContent = 'Submit Inquiry';
                    btn.disabled = false;
                    
                    // Success Alert
                    Swal.fire({
                        icon: 'success',
                        title: 'Message Sent!',
                        text: 'Thank you for reaching out. I will get back to you soon.',
                        confirmButtonText: 'Got it!',
                        confirmButtonColor: '#8e44ad',
                        background: '#ffffff',
                        color: '#333333',
                        customClass: {
                            popup: 'swal2-popup-custom',
                            title: 'swal2-title-custom',
                            confirmButton: 'swal2-confirm-custom',
                            htmlContainer: 'swal2-html-container-custom'
                        },
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    });

                    this.reset(); // Reset the form
                })
                .catch((err) => {
                    btn.textContent = 'Submit Inquiry';
                    btn.disabled = false;

                    // Error Alert
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops!',
                        text: 'Something went wrong. Please try again later.',
                        confirmButtonText: 'Try Again',
                        confirmButtonColor: '#c0392b',
                        background: '#ffffff',
                        color: '#333333',
                        customClass: {
                            popup: 'swal2-popup-custom',
                            title: 'swal2-title-custom',
                            confirmButton: 'swal2-confirm-custom',
                            htmlContainer: 'swal2-html-container-custom'
                        },
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    });
                });
        });
    }

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate elements on scroll
    gsap.utils.toArray('.animate-on-scroll').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Add touch feedback for buttons
    document.querySelectorAll('.btn, .filter-btn, .portfolio-link').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        button.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });

    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Project Details Loading
    function loadProjectDetails() {
        const projectDetailsContainer = document.querySelector('.project-details');
        if (!projectDetailsContainer) return;

        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');

        if (!projectId || !projects[projectId]) {
            window.location.href = 'index.html#portfolio';
            return;
        }

        const project = projects[projectId];

        // Update page title
        document.title = `${project.title} | Portfolio`;

        // Update header section
        const titleElement = document.querySelector('.project-title');
        const subtitleElement = document.querySelector('.project-subtitle');
        const metaContainer = document.querySelector('.project-meta');

        if (titleElement) titleElement.textContent = project.title;
        if (subtitleElement) subtitleElement.textContent = project.subtitle;
        if (metaContainer) {
            metaContainer.innerHTML = `
                <div class="meta-item">
                    <span class="meta-label">Client:</span>
                    <span class="meta-value">${project.client}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Category:</span>
                    <span class="meta-value">${project.category}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Date:</span>
                    <span class="meta-value">${project.date}</span>
                </div>
            `;
        }

        // Update project description
        const descriptionElement = document.querySelector('.project-description');
        if (descriptionElement) {
            descriptionElement.textContent = project.description;
        }

        // Update gallery
        const galleryContainer = document.querySelector('.project-gallery');
        if (galleryContainer) {
            galleryContainer.innerHTML = project.images.map(image => `
                <div class="gallery-item">
                    <img src="${image}" alt="${project.title}" loading="lazy">
                </div>
            `).join('');
        }

        // Update tech stack
        const techStackContainer = document.querySelector('.tech-stack');
        if (techStackContainer) {
            techStackContainer.innerHTML = project.technologies.map(tech => `
                <span class="tech-tag">${tech}</span>
            `).join('');
        }

        // Update project links
        const linksContainer = document.querySelector('.project-links');
        if (linksContainer) {
            linksContainer.innerHTML = `
                ${project.liveUrl ? `
                    <a href="${project.liveUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                ` : ''}
                ${project.githubUrl ? `
                    <a href="${project.githubUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> View Code
                    </a>
                ` : ''}
            `;
        }
    }

    // Initialize project details if on project details page
    if (document.querySelector('.project-details')) {
        loadProjectDetails();
    }
});