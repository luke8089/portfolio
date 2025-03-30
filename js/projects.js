// projects.js - This will handle loading project data

document.addEventListener('DOMContentLoaded', function() {
    // Get project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    // Sample project data (replace with your actual data)
    const projects = {
        'east-africa': {
            title: "East Africa Packaging Hub",
            subtitle: "Modern e-commerce platform for packaging solutions",
            description: "Developed a comprehensive e-commerce platform for East Africa Packaging Hub, featuring product catalogs, shopping cart functionality, and secure payment processing. The platform was built with a focus on user experience and performance optimization.",
            category: "Web App",
            date: "March 2025",
            client: "East Africa Packaging Ltd",
            features: [
                "Responsive design for all devices",
                "Product catalog with advanced filtering",
                "Shopping cart and checkout system",
                "Payment gateway integration",
                "Admin dashboard for inventory management"
            ],
            challenges: "<h3>Challenge</h3><p>Integrating multiple payment gateways while maintaining PCI compliance was a significant challenge, especially with the client's requirement for both mobile money and credit card payments.</p><h3>Solution</h3><p>Implemented a secure payment processing system using Stripe for card payments and a custom integration with M-Pesa for mobile money transactions, all while ensuring full PCI compliance through tokenization.</p>",
            technologies: [
                { name: "React", icon: '<i class="fab fa-react"></i>' },
                { name: "Node.js", icon: '<i class="fab fa-node-js"></i>' },
                { name: "MongoDB", icon: '<i class="fas fa-database"></i>' },
                { name: "Stripe", icon: '<i class="fab fa-stripe"></i>' }
            ],
            images: [
                "images/eastafrica-1.jpg",
                "images/eastafrica-2.jpg",
                "images/eastafrica-3.jpg"
            ],
            results: [
                { number: "75%", label: "Increase in online sales" },
                { number: "40%", label: "Reduction in cart abandonment" },
                { number: "4.8", label: "Average user rating" }
            ],
            links: [
                { url: "http://packaging.kesug.com/index.php?i=1", text: "View Live Site", icon: "fas fa-external-link-alt", primary: true },
                { url: "https://github.com/luke8089", text: "GitHub Repository", icon: "fab fa-github", primary: false }
            ]
        },
        'cipher-movies': {
            title: "Cipher Movies",
            subtitle: "Interactive movie database with advanced search",
            description: "Created a movie discovery platform with comprehensive search functionality, personalized recommendations, and user ratings. The platform aggregates data from multiple sources to provide the most up-to-date movie information.",
            category: "Web App",
            date: "January 2023",
            client: "Cipher Movies",
            features: [
                "Advanced search with filters",
                "Personalized recommendations",
                "User rating system",
                "Watchlist functionality",
                "Responsive design"
            ],
            challenges: "<h3>Challenge</h3><p>Handling real-time data synchronization from multiple API sources while maintaining performance was challenging, especially with the large dataset of movies.</p><h3>Solution</h3><p>Implemented a caching layer with Redis to store API responses and reduce load times, along with a smart data synchronization strategy that updates only changed records.</p>",
            technologies: [
                { name: "Vue.js", icon: '<i class="fab fa-vuejs"></i>' },
                { name: "Firebase", icon: '<i class="fas fa-fire"></i>' },
                { name: "TMDB API", icon: '<i class="fas fa-film"></i>' }
            ],
            images: [
                "images/movie.png",
                "images/movie1.png",
                "images/movie2.png"
            ],
            results: [
                { number: "1K+", label: "Monthly active users" },
                { number: "92%", label: "Search accuracy" },
                { number: "4.7", label: "Average user rating" }
            ],
            links: [
                { url: "#", text: "View Live Site", icon: "fas fa-external-link-alt", primary: true },
                { url: "https://github.com/luke8089", text: "GitHub Repository", icon: "fab fa-github", primary: false }
            ]
        },
        'pari-investment': {
            title: "Pari Investment",
            subtitle: "HR Consultancy Firm Landing Page",
            description: "Designed and developed a modern, professional landing page for an HR consultancy firm. The website showcases their services, expertise, and client testimonials with a focus on lead generation and brand credibility.",
            category: "Web App",
            date: "February 2025",
            client: "Pari Investment Consultant Limited",
            features: [
                "Service showcase with interactive cards",
                "Client testimonials carousel",
                "Contact form with lead tracking",
                "Team member profiles",
                "Case studies section"
            ],
            challenges: "<h3>Challenge</h3><p>Creating a professional yet engaging design that effectively communicates the company's expertise while maintaining high conversion rates for lead generation.</p><h3>Solution</h3><p>Implemented a clean, modern design with clear call-to-actions, optimized form fields, and strategic content placement to guide visitors through the conversion funnel.</p>",
            technologies: [
                { name: "React", icon: '<i class="fab fa-react"></i>' },
                { name: "Tailwind CSS", icon: '<i class="fas fa-wind"></i>' },
                { name: "Node.js", icon: '<i class="fab fa-node-js"></i>' }
            ],
            images: [
                "images/hr.png",
                "images/hr.png",
                "images/hr.png"
            ],
            results: [
                { number: "200%", label: "Increase in lead generation" },
                { number: "45%", label: "Higher conversion rate" },
                { number: "3.2x", label: "Average time on site" }
            ],
            links: [
                { url: "https://luke8089.github.io/hrconsultancy/", text: "View Live Site", icon: "fas fa-external-link-alt", primary: true },
                { url: "https://github.com/luke8089", text: "GitHub Repository", icon: "fab fa-github", primary: false }
            ]
        },
        'fitness-tracker': {
            title: "Fitness Tracker App",
            subtitle: "Cross-platform Mobile Application",
            description: "Developed a comprehensive fitness tracking application that helps users monitor their workouts, track progress, and achieve their fitness goals. The app includes features for workout planning, progress tracking, and social sharing.",
            category: "Mobile App",
            date: "March 2024",
            client: "Personal Project",
            features: [
                "Workout planning and scheduling",
                "Progress tracking with charts",
                "Exercise library with videos",
                "Social sharing and community",
                "Offline functionality"
            ],
            challenges: "<h3>Challenge</h3><p>Implementing complex workout tracking features while ensuring smooth performance and offline capabilities across different devices.</p><h3>Solution</h3><p>Utilized Flutter for cross-platform development, implemented efficient data caching, and optimized the UI for various screen sizes and orientations.</p>",
            technologies: [
                { name: "Flutter", icon: '<i class="fas fa-code"></i>' },
                { name: "Firebase", icon: '<i class="fas fa-fire"></i>' },
                { name: "SQLite", icon: '<i class="fas fa-database"></i>' }
            ],
            images: [
                "images/tracker1.jpeg",
                "images/tracker2.jpeg",
                "images/tracker3.jpeg"
            ],
            results: [
                { number: "1K+", label: "App downloads" },
                { number: "4.8", label: "App store rating" },
                { number: "85%", label: "User retention" }
            ],
            links: [
                { url: "#", text: "View on App Store", icon: "fab fa-app-store-ios", primary: true },
                { url: "https://github.com/luke8089", text: "GitHub Repository", icon: "fab fa-github", primary: false }
            ]
        },
        'arthur-marcus': {
            title: "Arthur Marcus Trading",
            subtitle: "Construction Company Portfolio",
            description: "Created a modern portfolio website for a construction company showcasing their projects, expertise, and services. The website emphasizes visual appeal with project galleries and detailed service descriptions.",
            category: "Web App",
            date: "April 2023",
            client: "Arthur Marcus Trading",
            features: [
                "Project portfolio with filtering",
                "Service showcase",
                "Team member profiles",
                "Project timeline",
                "Contact and quote request"
            ],
            challenges: "<h3>Challenge</h3><p>Presenting construction projects in an engaging way while maintaining professional credibility and ensuring easy navigation through extensive project galleries.</p><h3>Solution</h3><p>Implemented a responsive grid layout with lazy loading for images, interactive project filters, and a clean, professional design that highlights the company's work.</p>",
            technologies: [
                { name: "Vue.js", icon: '<i class="fab fa-vuejs"></i>' },
                { name: "GSAP", icon: '<i class="fas fa-magic"></i>' },
                { name: "Node.js", icon: '<i class="fab fa-node-js"></i>' }
            ],
            images: [
                "images/arthur3.png",
                "images/arthur1.png",
                "images/arthur4.png"
            ],
            results: [
                { number: "90%", label: "Increase in inquiries" },
                { number: "2.5x", label: "Time on site" },
                { number: "45%", label: "Higher engagement" }
            ],
            links: [
                { url: "https://www.arthur-marcus.com/", text: "View Live Site", icon: "fas fa-external-link-alt", primary: true },
                { url: "https://github.com/luke8089", text: "GitHub Repository", icon: "fab fa-github", primary: false }
            ]
        },
        'cover-cloud': {
            title: "Cover Cloud Limited",
            subtitle: "IT Services Company Website",
            description: "Developed a modern website for an IT services company that showcases their technical expertise, services, and client success stories. The website features a clean, professional design with emphasis on technical capabilities.",
            category: "Web App",
            date: "May 2022",
            client: "Cover Cloud Limited",
            features: [
                "Service showcase",
                "Technical expertise section",
                "Client testimonials",
                "Case studies",
                "Team profiles"
            ],
            challenges: "<h3>Challenge</h3><p>Creating a technical yet accessible website that effectively communicates complex IT services while maintaining user engagement.</p><h3>Solution</h3><p>Implemented an intuitive navigation structure, clear service categorization, and interactive elements to make technical content more engaging and digestible.</p>",
            technologies: [
                { name: "React", icon: '<i class="fab fa-react"></i>' },
                { name: "Next.js", icon: '<i class="fab fa-react"></i>' },
                { name: "Tailwind CSS", icon: '<i class="fas fa-wind"></i>' }
            ],
            images: [
                "images/covercloud.png",
                "images/cover2.png",
                "images/cover1.png"
            ],
            results: [
                { number: "300%", label: "Increase in traffic" },
                { number: "60%", label: "Higher conversion rate" },
                { number: "4.5x", label: "Average time on site" }
            ],
            links: [
                { url: "https://covercloudlimited.com/", text: "View Live Site", icon: "fas fa-external-link-alt", primary: true },
                { url: "https://github.com/luke8089", text: "GitHub Repository", icon: "fab fa-github", primary: false }
            ]
        }
    };
    
    // Load project data
    if (projectId && projects[projectId]) {
        const project = projects[projectId];
        
        // Update page title
        document.title = `${project.title} | Portfolio`;
        
        // Update header
        document.querySelector('.project-title').textContent = project.title;
        document.querySelector('.project-subtitle').textContent = project.subtitle;
        
        // Update meta items
        const metaContainer = document.querySelector('.project-meta');
        metaContainer.innerHTML = `
            <div class="meta-item" data-aos="zoom-in">
                <i class="fas fa-layer-group"></i>
                <div class="meta-text">
                    <h4>Category</h4>
                    <p>${project.category}</p>
                </div>
            </div>
            <div class="meta-item" data-aos="zoom-in" data-aos-delay="100">
                <i class="far fa-calendar-alt"></i>
                <div class="meta-text">
                    <h4>Date</h4>
                    <p>${project.date}</p>
                </div>
            </div>
            <div class="meta-item" data-aos="zoom-in" data-aos-delay="200">
                <i class="far fa-user"></i>
                <div class="meta-text">
                    <h4>Client</h4>
                    <p>${project.client}</p>
                </div>
            </div>
        `;
        
        // Update description
        document.querySelector('.project-description').textContent = project.description;
        
        // Update features
        const featuresList = document.querySelector('.feature-list');
        featuresList.innerHTML = project.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
        
        // Update gallery
        const gallery = document.querySelector('.project-gallery');
        gallery.innerHTML = project.images.map(image => `
            <div class="gallery-item" data-aos="fade-up">
                <img src="${image}" alt="${project.title} screenshot">
            </div>
        `).join('');
        
        // Update challenges
        document.querySelector('.challenge').innerHTML = project.challenges;
        
        // Update tech stack
        const techStack = document.querySelector('.tech-stack');
        techStack.innerHTML = project.technologies.map(tech => `
            <div class="tech-item" data-aos="fade-up">
                ${tech.icon}
                <span>${tech.name}</span>
            </div>
        `).join('');
        
        // Update results
        const resultsGrid = document.querySelector('.results-grid');
        resultsGrid.innerHTML = project.results.map(result => `
            <div class="result-item" data-aos="fade-up">
                <div class="result-number">${result.number}</div>
                <div class="result-label">${result.label}</div>
            </div>
        `).join('');
        
        // Update links
        const projectLinks = document.querySelector('.project-links');
        projectLinks.innerHTML = project.links.map(link => `
            <a href="${link.url}" class="project-link ${link.primary ? 'primary' : 'secondary'}" data-aos="zoom-in">
                <i class="${link.icon}"></i>
                <span>${link.text}</span>
            </a>
        `).join('');
    } else {
        // Project not found, redirect to portfolio
        window.location.href = 'index.html#portfolio';
    }
});