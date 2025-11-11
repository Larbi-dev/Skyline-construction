// script.js — interactions: mobile nav, reveal animations, counters, form
document.addEventListener('DOMContentLoaded', function () {
  // YEAR AUTO UPDATE
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // MOBILE NAV
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      navToggle.querySelector('.hamburger').style.transform =
        nav.classList.contains('open') ? 'rotate(90deg)' : 'none';
      nav.style.display = nav.classList.contains('open') ? 'flex' : '';
    });
  }

  // COUNTER ANIMATION FUNCTION
  function animateCount(el, target, duration) {
    const start = 0;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.floor(progress * (target - start) + start);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }

    requestAnimationFrame(step);
  }

  // REVEAL SECTIONS + TRIGGER COUNTERS
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const nums = entry.target.querySelectorAll('.num');
          nums.forEach(num => {
            if (!num.dataset.done) {
              const target = parseInt(num.dataset.target || '0', 10);
              if (!isNaN(target)) {
                animateCount(num, target, 1500);
                num.dataset.done = 'true';
              }
            }
          });
        }
      });
    },
    { threshold: 0.2 }
  );
  reveals.forEach(r => observer.observe(r));

  // CONTACT FORM
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.name.value.trim() || 'Client';
      const phone = form.phone.value.trim() || 'N/A';
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Send Request';
        form.reset();
        alert(`Thanks ${name}! We’ll contact you at ${phone}.`);
      }, 1000);
    });
  }

  // PROJECT CARD CLICK (for demo)
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const caption = card.querySelector('figcaption').textContent;
      alert(`${caption}\n\nFor more details, call 0594754314.`);
    });
    card.style.cursor = 'pointer';
  });
});
