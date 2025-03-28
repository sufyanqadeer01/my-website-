// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the typing effect
    const textArray = ["Frontend Developer", "UI/UX Designer", "Backend Developer", "Mobile Developer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;
    let erasingDelay = 100;
    let newTextDelay = 2000; // Delay between typing new text
    
    function typeEffect() {
        const typedTextSpan = document.querySelector(".typed-text");
        const currentText = textArray[textIndex];

        if (isDeleting) {
            // Removing text
            typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            // Adding text
            typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 200;
        }

        if (!isDeleting && charIndex === currentText.length) {
            // Text is fully typed, start deleting after delay
            isDeleting = true;
            typingDelay = newTextDelay;
        } else if (isDeleting && charIndex === 0) {
            // Text is fully deleted, start typing next text
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
        }

        setTimeout(typeEffect, typingDelay);
    }

    // Start the typing effect
    setTimeout(typeEffect, 1000);
    
    // Handle header style on scroll
    const header = document.querySelector(".header");
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Mobile Menu Toggle
    const burgerMenu = document.querySelector(".burger-menu");
    const navbar = document.querySelector(".navbar");
    
    burgerMenu.addEventListener("click", function() {
        burgerMenu.classList.toggle("active");
        navbar.classList.toggle("show");
    });

    // Close mobile menu when clicking on a navigation link
    const navLinks = document.querySelectorAll(".navbar a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            burgerMenu.classList.remove("active");
            navbar.classList.remove("show");
        });
    });

    // Active Link Highlighting
    function highlightActiveLink() {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".navbar a");
        
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", highlightActiveLink);
    
    // Portfolio Filter
    const filterBtns = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons and add to clicked button
            filterBtns.forEach(filterBtn => filterBtn.classList.remove("active"));
            btn.classList.add("active");
            
            const filterValue = btn.getAttribute("data-filter");
            
            portfolioItems.forEach(item => {
                if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                    item.style.display = "block";
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.transform = "scale(1)";
                    }, 100);
                } else {
                    item.style.opacity = 0;
                    item.style.transform = "scale(0.8)";
                    setTimeout(() => {
                        item.style.display = "none";
                    }, 300);
                }
            });
        });
    });

    // Testimonial Slider
    const testimonialDots = document.querySelectorAll(".dot");
    const testimonialSlides = document.querySelectorAll(".testimonial-slide");

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            // Hide all slides
            testimonialSlides.forEach(slide => {
                slide.classList.remove("active");
            });
            
            // Remove active class from all dots
            testimonialDots.forEach(dot => {
                dot.classList.remove("active");
            });
            
            // Show the selected slide and highlight its dot
            testimonialSlides[index].classList.add("active");
            dot.classList.add("active");
        });
    });

    // Auto advance testimonials
    let testimonialIndex = 0;
    function autoAdvanceTestimonials() {
        testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
        
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove("active");
        });
        
        // Remove active class from all dots
        testimonialDots.forEach(dot => {
            dot.classList.remove("active");
        });
        
        // Show the selected slide and highlight its dot
        testimonialSlides[testimonialIndex].classList.add("active");
        testimonialDots[testimonialIndex].classList.add("active");
        
        setTimeout(autoAdvanceTestimonials, 5000);
    }
    
    setTimeout(autoAdvanceTestimonials, 5000);

    // Portfolio Modal
    const portfolioLinks = document.querySelectorAll(".portfolio-preview");
    const modal = document.querySelector(".portfolio-modal");
    const modalClose = document.querySelector(".modal-close");
    const modalBody = document.querySelector(".modal-body");

    portfolioLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Get the portfolio item information
            const portfolioItem = this.closest(".portfolio-item");
            const imgSrc = portfolioItem.querySelector("img").getAttribute("src");
            const title = portfolioItem.querySelector("h3").textContent;
            const category = portfolioItem.querySelector("p").textContent;
            
            // Create modal content
            modalBody.innerHTML = `
                <div class="modal-img">
                    <img src="${imgSrc}" alt="${title}">
                </div>
                <div class="modal-project-info">
                    <h2>${title}</h2>
                    <p class="category">${category}</p>
                    <div class="project-description">
                        <h3>Project Overview</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque, velit ut interdum ullamcorper, massa nisl cursus sapien, at interdum diam erat ac enim.</p>
                        <p>Phasellus ultricies felis at mi condimentum, vel sollicitudin ipsum fermentum. Donec dignissim enim at semper ultrices.</p>
                        <h3>Project Details</h3>
                        <ul>
                            <li><strong>Client:</strong> Example Client</li>
                            <li><strong>Date:</strong> July 2023</li>
                            <li><strong>Technologies:</strong> HTML, CSS, JavaScript</li>
                        </ul>
                        <a href="#" class="btn btn-primary">View Project</a>
                    </div>
                </div>
            `;
            
            // Open modal
            modal.classList.add("open");
            document.body.style.overflow = "hidden";
        });
    });

    // Close modal
    modalClose.addEventListener("click", () => {
        modal.classList.remove("open");
        document.body.style.overflow = "auto";
    });

    // Close modal on click outside content
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("open");
            document.body.style.overflow = "auto";
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById("contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;
            
            // Simulate form submission (in a real site, this would be an AJAX request)
            console.log("Form submitted:", { name, email, subject, message });
            
            // Show success message (in a real implementation)
            alert("Thanks for your message! I'll get back to you soon.");
            contactForm.reset();
        });
    }

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-bar, .service-card, .portfolio-item, .about-image, .about-text');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});