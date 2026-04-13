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
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);

    /* Mostra itens mobile-only quando aberto */
    document.querySelectorAll('.mobile-only-nav').forEach(el => {
      el.style.display = isOpen ? 'block' : 'none';
    });
  });

  /* Fecha menu ao clicar em link */
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', false);
    });
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

/* ── Dropdown nav toggle ── */
document.querySelectorAll('.nav-dropdown > a').forEach(link => {
  link.addEventListener('click', function (e) {
    const dropdown = this.closest('.nav-dropdown');
    const isOpen = dropdown.classList.contains('open');
    // Fecha todos
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
    // Abre o clicado (ou fecha se já estava aberto)
    if (!isOpen) {
      dropdown.classList.add('open');
      e.preventDefault(); // mantém no lugar, usuário escolhe item do submenu
    }
  });
});

// Fecha ao clicar fora
document.addEventListener('click', function (e) {
  if (!e.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
  }
});

// Fecha ao clicar num link do submenu
document.querySelectorAll('.dropdown-menu a').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
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
