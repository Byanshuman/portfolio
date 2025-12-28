/* ================================
   THEME TOGGLE (LIGHT / DARK)
   ================================ */

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

// Load saved preference
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  root.classList.add("light-theme");
  if (themeToggle) themeToggle.textContent = "🌙";
} else {
  if (themeToggle) themeToggle.textContent = "☀️";
}

// Click toggle
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    root.classList.toggle("light-theme");

    const isLight = root.classList.contains("light-theme");

    // icon swap
    themeToggle.textContent = isLight ? "🌙" : "☀️";

    // save preference
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

/* ================================
   SMOOTH SCROLL TO SECTIONS
   ================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

/* ================================
   INTERSECTION FADE-IN ANIMATIONS
   ================================ */

const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Elements to animate
document.querySelectorAll(
  ".project-card, .experience-card, .blog-card, .skill-category, .info-item, .cert-card"
).forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity .6s ease, transform .6s ease";
  fadeObserver.observe(el);
});

/* ================================
   ACTIVE NAV LINK HIGHLIGHTING
   ================================ */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const offset = section.offsetTop;
    if (pageYOffset >= offset - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

/* ================================
   CONTACT FORM HANDLING
   ================================ */

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    alert(`Thank you for reaching out, ${name}! I will get back to you soon.`);
    contactForm.reset();
  });
}

/* ================================
   MOBILE MENU TOGGLE (future)
   ================================ */

const mobileMenuButton = document.querySelector(".mobile-menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (mobileMenuButton && navMenu) {
  mobileMenuButton.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

/* ================================
   LAZY LOAD IMAGES
   ================================ */

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      observer.unobserve(img);
    });
  });

  document
    .querySelectorAll("img.lazy")
    .forEach(img => imageObserver.observe(img));
}

/* ================================
   DEBUG LOG
   ================================ */

console.log("Portfolio loaded successfully.");
