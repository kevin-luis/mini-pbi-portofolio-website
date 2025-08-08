// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Loading Screen
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hide');
    }, 1000);
});

// Navbar Scroll Effect & Scroll Progress
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');

function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    // Navbar scroll effect
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update scroll progress
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100;
    scrollProgress.style.width = Math.min(scrollPercent, 100) + '%';

    // Handle scroll-to-top button
    handleScrollToTopButton(scrollY);
}

// Scroll-to-Top Button Implementation
let scrollToTopBtn = null;

function createScrollToTopButton() {
    // Check if button already exists
    if (scrollToTopBtn) return;

    scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.title = 'Kembali ke atas';

    // Add click handler
    scrollToTopBtn.addEventListener('click', scrollToTop);

    // Append to body
    document.body.appendChild(scrollToTopBtn);
}

function handleScrollToTopButton(scrollY) {
    if (!scrollToTopBtn) return;

    if (scrollY > 500) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
}

function scrollToTop() {
    // Add loading state
    const originalContent = scrollToTopBtn.innerHTML;
    scrollToTopBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Reset icon after animation
    setTimeout(() => {
        scrollToTopBtn.innerHTML = originalContent;
    }, 600);
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Skills Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 300);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Reset errors
    document.querySelectorAll('.form-error').forEach(error => {
        error.style.display = 'none';
    });

    let isValid = true;

    // Validate name
    if (!name) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    // Validate message
    if (!message) {
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;

        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
            submitBtn.style.background = '#10B981';

            // Reset form
            contactForm.reset();

            // Show success message
            alert('Pesan Anda berhasil dikirim! Saya akan segera merespon.');

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);

        } catch (error) {
            // Error handling
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            submitBtn.style.background = '#EF4444';

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    }
});

// Download CV functionality
document.getElementById('downloadCV').addEventListener('click', function (e) {
    e.preventDefault();
    alert('Fitur download CV akan segera tersedia! Silakan hubungi saya melalui kontak untuk mendapatkan CV.');
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    createScrollToTopButton();
    animateProgressBars();
    handleScroll();
});

// Also initialize on window load as backup
window.addEventListener('load', function () {
    if (!scrollToTopBtn) {
        createScrollToTopButton();
        handleScroll();
    }
});