// js/script.js
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (nav) {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  }
});

// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });
});

// Close mobile navbar on click outside
document.addEventListener('click', function (event) {
  const navMenu = document.getElementById('navMenu');
  const toggler = document.querySelector('.navbar-toggler');
  if (navMenu && navMenu.classList.contains('show')) {
    if (!navMenu.contains(event.target) && !toggler.contains(event.target)) {
      if (typeof bootstrap !== 'undefined') {
        const bsCollapse = bootstrap.Collapse.getInstance(navMenu) || new bootstrap.Collapse(navMenu, { toggle: false });
        bsCollapse.hide();
      } else {
        navMenu.classList.remove('show');
      }
    }
  }
});