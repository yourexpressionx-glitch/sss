// Siliguri Security Services - Main JavaScript
// Performance Optimized

// Lazy Load Images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Defer non-critical operations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveElements);
} else {
    initInteractiveElements();
}

function initInteractiveElements() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');

            // Close other FAQs
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.nextElementSibling.classList.remove('active');
                    q.querySelector('.faq-toggle').classList.remove('active');
                }
            });

            // Toggle current FAQ
            answer.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    });

    // Form Submission
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleFormSubmit);
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation based on current page
    updateActiveNav();

    // Animate numbers on scroll
    animateNumbersOnScroll();

    // Add scroll event listener for nav styling (throttled)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 10px rgba(0, 51, 102, 0.15)';
            } else {
                header.style.boxShadow = '0 2px 5px rgba(0, 51, 102, 0.1)';
            }
            scrollTimeout = null;
        }, 100);
    }, { passive: true });
}

// Handle Form Submission
function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    
    // Validate form
    if (!validateForm(form)) {
        alert('Please fill in all required fields correctly.');
        return;
    }

    // Create WhatsApp message
    const message = createWhatsAppMessage(formData);
    
    // Show success message
    showSuccessMessage();

    // Reset form
    form.reset();

    // Optionally open WhatsApp
    const whatsappNumber = '919547253232';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    // Uncomment the next line to open WhatsApp automatically
    // window.open(whatsappURL, '_blank');
}

// Validate Form
function validateForm(form) {
    const email = form.querySelector('input[type="email"]');
    const phone = form.querySelector('input[type="tel"]');

    if (email && !isValidEmail(email.value)) {
        return false;
    }

    if (phone && !isValidPhone(phone.value)) {
        return false;
    }

    return true;
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone Validation
function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Create WhatsApp Message
function createWhatsAppMessage(formData) {
    let message = 'Hello, I am interested in your security services.\n\n';
    
    const fields = {
        'company_name': 'Company Name',
        'location': 'Location',
        'guards_required': 'Number of Guards Required',
        'service_type': 'Service Type',
        'duration': 'Contract Duration',
        'site_type': 'Site Type',
        'contact_person': 'Contact Person',
        'phone': 'Phone',
        'email': 'Email'
    };

    for (const [key, label] of Object.entries(fields)) {
        if (formData.has(key)) {
            message += `${label}: ${formData.get(key)}\n`;
        }
    }

    return message;
}

// Show Success Message
function showSuccessMessage() {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = '<p>Thank you! We will contact you shortly. You can also reach us on WhatsApp for faster response.</p>';
    successMsg.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 20px 30px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(successMsg);

    setTimeout(() => {
        successMsg.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => successMsg.remove(), 300);
    }, 5000);
}

// Update Active Navigation
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.style.color = 'var(--primary-light)';
            link.style.fontWeight = '700';
        }
    });
}

// Animate Numbers on Scroll
function animateNumbersOnScroll() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    statNumbers.forEach(num => observer.observe(num));
}

// Animate Individual Number
function animateNumber(element) {
    const finalValue = parseInt(element.textContent);
    const duration = 2000;
    const startTime = Date.now();

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(finalValue * progress);
        element.textContent = currentValue + (element.textContent.includes('+') ? '+' : '');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    update();
}

// WhatsApp Direct Message
function whatsappMessage(message) {
    const whatsappNumber = '919547253232';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Call Direct
function initiate() {
    window.location.href = 'tel:+919547253232';
}

// Email Direct
function emailDirect() {
    window.location.href = 'mailto:siliguri.security.services@gmail.com';
}

// Add CSS Animation Styles
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .menu-toggle {
        display: none;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .menu-toggle {
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--primary-dark);
            cursor: pointer;
        }

        nav ul {
            position: static !important;
            display: none;
            flex-direction: column;
            gap: 0;
            background: white;
            box-shadow: none;
            padding: 0;
        }

        nav ul.active {
            display: flex;
            padding: 20px;
        }

        nav a {
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
        }
    }
`;
document.head.appendChild(style);

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
