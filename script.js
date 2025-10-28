// script.js - small interactions: mobile nav, reveal on scroll, counters, contact form demo
document.addEventListener('DOMContentLoaded', function () {

  // YEAR
  document.getElementById('year').textContent = new Date().getFullYear();

  // MOBILE NAV TOGGLE
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    // animate hamburger
    navToggle.querySelector('.hamburger').style.transform = nav.classList.contains('open') ? 'rotate(90deg)' : 'none';
  });

  // REVEAL ON SCROLL (IntersectionObserver)
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // if it's a stat number, start counting
        const numEl = entry.target.querySelector('.num');
        if (numEl && !numEl.dataset.done) {
          animateCount(numEl, parseInt(numEl.dataset.target || '0', 10), 1200);
          numEl.dataset.done = 'true';
        }
      }
    });
  }, {threshold: 0.15});

  reveals.forEach(r => io.observe(r));

  // COUNTER function
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

  // CONTACT FORM (simple demo — replace with real backend)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.name.value.trim() || 'Client';
    const phone = form.phone.value.trim() || 'N/A';
    // small success micro-interaction
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Send Request';
      form.reset();
      alert(`Thanks ${name}! Your request has been received. We will contact you at ${phone}.`);
    }, 900);
  });

  // Simple progressive enhancement: click on project cards to show a quick preview
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h4') ? card.querySelector('h4').textContent : 'Project';
      alert(`${title}\n\nFor more images and details, contact: 0594754314`);
    });
    card.style.cursor = 'pointer';
  });

});
