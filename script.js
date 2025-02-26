(function($) {
	"use strict";
  
	// Fade-in effect on scroll
	$(window).on("scroll", function() {
	  $(".fade-in").each(function() {
		var position = $(this).offset().top;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
  
		if (scroll > position - windowHeight + 100) {
		  $(this).addClass("visible");
		}
	  });
	});
  
	// About Section Animation
	$(".about-text").on("click", function() {
	  $("body").addClass("about-on");
	  $(".about-section").fadeIn(500);
	});
  
	$(".about-close").on("click", function() {
	  $("body").removeClass("about-on");
	  $(".about-section").fadeOut(500);
	});
  
	// Contact Section Animation
	$(".contact-text").on("click", function() {
	  $("body").addClass("contact-on");
	  $(".contact-section").fadeIn(500);
	});
  
	$(".contact-close").on("click", function() {
	  $("body").removeClass("contact-on");
	  $(".contact-section").fadeOut(500);
	});
  
  })(jQuery);
  

(function($) {
	"use strict";
  
	// About page
	$(".about-text").on('click', () => $("body").addClass("about-on"));
	$(".about-close").on('click', () => $("body").removeClass("about-on"));
  
	// Contact page
	$(".contact-text").on('click', () => $("body").addClass("contact-on"));
	$(".contact-close").on('click', () => $("body").removeClass("contact-on"));
  
	// services1 portfolio page
	$(".services1").on('click', () => $("body").addClass("services1-on"));
	$(".services1-close").on('click', () => $("body").removeClass("services1-on"));
  
	// blog portfolio page
	$(".blog").on('click', () => $("body").addClass("blog-on"));
	$(".blog-close").on('click', () => $("body").removeClass("blog-on"));
  
	// tech portfolio page
	$(".tech").on('click', () => $("body").addClass("tech-on"));
	$(".tech-close").on('click', () => $("body").removeClass("tech-on"));
  })(jQuery);

  
  $(document).ready(function () {
    // Open About Section
    $(".about-text").on("click", function () {
        $(".about-section").css({
            transform: "translateX(0)",
            opacity: "1",
            visibility: "visible",
            overflowY: "auto" // Allow scrolling when opened
        }).scrollTop(0); // Reset scroll position when opening
    });

    // Close About Section
    $(".about-close").on("click", function () {
        $(".about-section").css({
            transform: "translateX(-100%)",
            opacity: "0",
            visibility: "hidden",
            overflowY: "hidden" // Prevent scroll when closed
        });
    });
});
