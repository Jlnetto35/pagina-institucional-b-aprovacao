/* ============================================================
   V3 PARTNERS — Main JavaScript
   ============================================================ */

/* ── Navbar scroll effect ── */
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.background = 'rgba(9, 8, 26, 0.98)';
    } else {
      navbar.style.background = 'rgba(9, 8, 26, 0.92)';
    }
  });
}

/* ── Mobile menu toggle ── */
const menuBtn = document.querySelector('.navbar-menu-btn');
const navLinks = document.querySelector('.navbar-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

/* ── Smooth scroll para âncoras ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Animação de entrada ao rolar (fade-in) ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
