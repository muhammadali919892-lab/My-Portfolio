// ===== Navigation Functionality =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Skill Bar Animation =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

animateSkillBars();

// ===== Scroll Animations =====
function revealOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

revealOnScroll();

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

    try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // Show success message
            showMessage('success', `Thank you, ${formData.get('name')}! Your message has been sent successfully. I'll get back to you soon at ${formData.get('email')}.`);
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Show error message
        showMessage('error', 'Oops! Something went wrong. Please try again or email me directly at muhammadali919892@gmail.com');
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

function showMessage(type, text) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();

    const message = document.createElement('div');
    message.className = `form-message form-message-${type}`;

    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const bgColor = type === 'success'
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';

    message.innerHTML = `
        <i class="fas ${icon}"></i>
        <p>${text}</p>
    `;
    message.style.cssText = `
        background: ${bgColor};
        color: white;
        padding: 1.5rem;
        border-radius: 12px;
        margin-top: 1rem;
        text-align: center;
        animation: slideIn 0.5s ease;
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
    `;

    // Add animation
    if (!document.querySelector('style[data-form-animation]')) {
        const style = document.createElement('style');
        style.setAttribute('data-form-animation', 'true');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    contactForm.appendChild(message);

    // Remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// ===== Typing Effect for Hero Title =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    const originalText = element.innerHTML;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.innerHTML = originalText;
        }
    }

    type();
}

// ===== Particle Background Animation =====
function createParticles() {
    const particles = document.querySelector('.hero-particles');
    if (!particles) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.8), transparent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particles.appendChild(particle);
    }
}

// Add particle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

createParticles();

// ===== Smooth Scrolling for All Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Counter Animation for Stats =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent.replace('+', '');
                const isPlus = counter.textContent.includes('+');
                let count = 0;
                const increment = target / 50;

                const updateCounter = () => {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count) + (isPlus ? '+' : '');
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.textContent = target + (isPlus ? '+' : '');
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

animateCounters();

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image, .image-glow');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Cursor Trail Effect (Optional) =====
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// ===== Initialize on Page Load =====
window.addEventListener('load', () => {
    // Add loaded class to body for any load-specific animations
    document.body.classList.add('loaded');

    // Update active nav link on load
    updateActiveLink();
});

// ===== Dynamic Year in Footer =====
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}

// ===== Project Card Tilt Effect =====
document.querySelectorAll('.project-card, .specialty-card, .soft-skill-card').forEach(card => {
    card.addEventListener('mouseenter', function (e) {
        this.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transition = 'transform 0.3s ease';
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Console Welcome Message =====
console.log('%c👋 Welcome to Muhammad Hasnat\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cInterested in the code? Feel free to reach out!', 'font-size: 14px; color: #764ba2;');
console.log('%c📧 muhammadali919892@gmail.com', 'font-size: 14px; color: #4a5568;');
