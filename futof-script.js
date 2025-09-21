/*
futof version 1.1
*/

// === Mobile menu toggle ===
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Sluit menu na klik
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// === Navbar scroll effect & active state ===
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 100) {
      current = section.id;
    }
  });

  navItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('href').slice(1) === current);
  });
});

// Initial state on load
window.dispatchEvent(new Event('scroll'));

// === Smooth scroll for anchors ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === Fade-in on scroll ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// === Web3Forms Submission ===
const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const data = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });

      if (response.ok) {
        alert("✅ Thank you! Your message has been sent.");
        form.reset();
      } else {
        const result = await response.json().catch(() => ({}));
        alert("❌ Something went wrong: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("⚠️ Network error:", error);
      alert("⚠️ Network error. Please try again later.");
    } finally {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}
