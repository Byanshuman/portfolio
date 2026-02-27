document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initContactForm();
    highlightActiveLink();
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        if (icon) icon.className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
        if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('nav ul');
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.className = navLinks.classList.contains('show') ? 'fas fa-times' : 'fas fa-bars';
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            const icon = menuBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxRzommTL2k5jHbKNnZ1q-mBc18v1patcdja_loc3PwBuhbJq6EO23_r1UIk4Pfc1hRow/exec';

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';

        if (formMessage) {
            formMessage.style.display = 'none';
            formMessage.className = '';
        }

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (formMessage) {
                formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                formMessage.className = 'success-text result-box';
                formMessage.style.display = 'block';
            }
            contactForm.reset();
        } catch (error) {
            if (formMessage) {
                formMessage.textContent = '✗ Something went wrong. Please email me directly at bytheanshuman@gmail.com';
                formMessage.className = 'danger-text result-box';
                formMessage.style.display = 'block';
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// Navbar link highlighting
function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('#')[0];
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
