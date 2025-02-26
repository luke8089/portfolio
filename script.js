document.addEventListener('DOMContentLoaded', function () {
	// About Section Toggle
	const aboutText = document.querySelector('.about-text');
	const aboutClose = document.querySelector('.about-close');
	const aboutSection = document.querySelector('.about-section');
  
	if (aboutText && aboutClose && aboutSection) {
	  aboutText.addEventListener('click', () => {
		aboutSection.style.transform = 'translateX(0)';
		aboutSection.style.opacity = '1';
		aboutSection.style.visibility = 'visible';
		aboutSection.style.overflowY = 'auto';
	  });
  
	  aboutClose.addEventListener('click', () => {
		aboutSection.style.transform = 'translateX(-100%)';
		aboutSection.style.opacity = '0';
		aboutSection.style.visibility = 'hidden';
		aboutSection.style.overflowY = 'hidden';
	  });
	} else {
	  console.error('One or more elements for the About section are missing in the DOM.');
	}
  
	// Contact Section Toggle
	const contactText = document.querySelector('.contact-text');
	const contactClose = document.querySelector('.contact-close');
	const contactSection = document.querySelector('.contact-section');
  
	if (contactText && contactClose && contactSection) {
	  contactText.addEventListener('click', () => {
		contactSection.style.transform = 'translateX(0)';
		contactSection.style.opacity = '1';
		contactSection.style.visibility = 'visible';
		contactSection.style.overflowY = 'auto';
	  });
  
	  contactClose.addEventListener('click', () => {
		contactSection.style.transform = 'translateX(100%)';
		contactSection.style.opacity = '0';
		contactSection.style.visibility = 'hidden';
		contactSection.style.overflowY = 'hidden';
	  });
	} else {
	  console.error('One or more elements for the Contact section are missing in the DOM.');
	}
  
	// Services Section Toggle
	const servicesText = document.querySelector('.services1');
	const servicesClose = document.querySelector('.services1-close');
	const servicesSection = document.querySelector('.services1-section');
  
	if (servicesText && servicesClose && servicesSection) {
	  servicesText.addEventListener('click', () => {
		servicesSection.style.top = '0';
	  });
  
	  servicesClose.addEventListener('click', () => {
		servicesSection.style.top = '100%';
	  });
	} else {
	  console.error('One or more elements for the Services section are missing in the DOM.');
	}
  
	// Blog Section Toggle
	const blogText = document.querySelector('.blog');
	const blogClose = document.querySelector('.blog-close');
	const blogSection = document.querySelector('.blog-section');
  
	if (blogText && blogClose && blogSection) {
	  blogText.addEventListener('click', () => {
		blogSection.style.top = '0';
	  });
  
	  blogClose.addEventListener('click', () => {
		blogSection.style.top = '100%';
	  });
	} else {
	  console.error('One or more elements for the Blog section are missing in the DOM.');
	}
  
	// Tech Stack Section Toggle
	const techText = document.querySelector('.tech');
	const techClose = document.querySelector('.tech-close');
	const techSection = document.querySelector('.tech-section');
  
	if (techText && techClose && techSection) {
	  techText.addEventListener('click', () => {
		techSection.style.top = '0';
	  });
  
	  techClose.addEventListener('click', () => {
		techSection.style.top = '100%';
	  });
	} else {
	  console.error('One or more elements for the Tech Stack section are missing in the DOM.');
	}
  });
