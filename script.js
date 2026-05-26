// ============================================
// SM Travel Advisor — Coming Soon Landing Page
// Interactive JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Preloader ----------
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1200);
  });
  // Fallback: hide preloader after 3s max
  setTimeout(() => preloader.classList.add('hidden'), 3000);

  // ---------- Floating Particles ----------
  const particlesContainer = document.getElementById('particles');
  function createParticles() {
    const count = window.innerWidth < 768 ? 20 : 45;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = (Math.random() * 3 + 1) + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();

  // ---------- Navbar Scroll Effect ----------
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---------- Mobile Nav Toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('.nav__link, .nav__cta').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ---------- Countdown Timer ----------
  // Set launch date to Aug 1, 2026
  const launchDate = new Date('2026-08-01T00:00:00').getTime();

  const countDays = document.getElementById('countDays');
  const countHours = document.getElementById('countHours');
  const countMinutes = document.getElementById('countMinutes');
  const countSeconds = document.getElementById('countSeconds');

  function updateCountdown() {
    const now = Date.now();
    const diff = launchDate - now;

    if (diff <= 0) {
      countDays.textContent = '00';
      countHours.textContent = '00';
      countMinutes.textContent = '00';
      countSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countDays.textContent = String(days).padStart(2, '0');
    countHours.textContent = String(hours).padStart(2, '0');
    countMinutes.textContent = String(minutes).padStart(2, '0');
    countSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---------- Email Signup Forms (Web3Forms API Integration) ----------
  // To receive email signups automatically in your inbox (without mail client popups),
  // 1. Visit https://web3forms.com and request a free access key (sent instantly to your email).
  // 2. Paste your access key in the constant below:
  const WEB3FORMS_ACCESS_KEY = '77e617ab-f003-4c02-9569-8b64a9c91fd1';

  function setupSignupForm(formId, successId) {
    const form = document.getElementById(formId);
    const success = document.getElementById(successId);

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput.value) return;

      // Graceful fallback to mailto if key is not configured yet
      if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
        console.warn('Web3Forms Access Key is not configured. Falling back to local mail client.');
        const subject = encodeURIComponent('SM Travel Advisor — New Early Access Signup');
        const body = encodeURIComponent(`New signup request from: ${emailInput.value}\n\nPlease add this person to the early access list.`);
        window.location.href = `mailto:shann.montgomery@fora.travel?subject=${subject}&body=${body}`;
        
        // Display local success message
        form.style.display = 'none';
        success.classList.add('show');
        return;
      }

      const btn = form.querySelector('.signup__btn');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Prepare form data for Web3Forms API
      const formData = new FormData(form);
      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
      formData.append('subject', 'SM Travel Advisor — New Early Access Signup');
      formData.append('from_name', 'SM Travel Advisor Landing Page');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(async (response) => {
        const json = await response.json();
        if (response.status === 200) {
          form.style.display = 'none';
          success.classList.add('show');
        } else {
          console.error('Web3Forms Error:', json);
          btn.textContent = 'Error!';
          alert(json.message || 'Something went wrong. Please try again.');
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 3000);
        }
      })
      .catch((error) => {
        console.error('Network Error:', error);
        btn.textContent = 'Error!';
        alert('Form submission failed. Please check your internet connection.');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);
      });
    });
  }

  setupSignupForm('signupForm', 'signupSuccess');
  setupSignupForm('signupFormBottom', 'signupSuccessBottom');

  // ---------- Intersection Observer (Reveal Animations) ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Smooth Scroll for Nav Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ---------- Parallax Effect on Hero Image ----------
  const heroBg = document.querySelector('.hero__bg img');
  
  function handleParallax() {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      const parallaxOffset = scrollY * 0.3;
      heroBg.style.transform = `scale(1.05) translateY(${parallaxOffset}px)`;
    }
  }

  window.addEventListener('scroll', handleParallax, { passive: true });

  // ---------- Cursor Glow on Destination Cards ----------
  document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

});
