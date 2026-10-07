/**
 * Aanchal Patel - Sea Theme Portfolio Scripts 🌊
 * Features:
 * - Ambient sea bubbles particle generator
 * - Typewriter effect for multifaceted persona
 * - Mobile navigation menu drawer
 * - Scroll spy & navbar sticky effects
 * - 1-Click copy for Phone Number (+91 9602008230)
 * - Interactive contact form validation with status feedback
 * - Dynamic copyright year
 */

document.addEventListener('DOMContentLoaded', () => {
  initSeaParticles();
  initTypewriter();
  initMobileNav();
  initScrollEffects();
  initCopyPhone();
  initContactForm();
  initCurrentYear();
});

/* ---------------- 1. Ambient Sea Bubbles Generator ---------------- */
function initSeaParticles() {
  const container = document.getElementById('seaParticles');
  if (!container) return;

  const bubbleCount = 20;

  for (let i = 0; i < bubbleCount; i++) {
    createBubble(container);
  }

  function createBubble(parent) {
    const bubble = document.createElement('div');
    bubble.classList.add('sea-bubble');

    // Randomize dimensions, position and speed
    const size = Math.floor(Math.random() * 24) + 8; // 8px to 32px
    const leftPercent = Math.random() * 100;
    const duration = Math.random() * 12 + 10; // 10s to 22s
    const delay = Math.random() * 10; // 0s to 10s

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${leftPercent}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;

    parent.appendChild(bubble);
  }
}

/* ---------------- 2. Typewriter Effect in Hero ---------------- */
function initTypewriter() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    'B.Tech CSE Student @ JECRC',
    'Tech & Coding Enthusiast',
    'Formula 1 Telemetry Fan',
    'District Basketball Player',
    'Curious Explorer & Traveler'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const backspaceSpeed = 45;
  const holdDelay = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? backspaceSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = holdDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ---------------- 3. Mobile Navigation Drawer ---------------- */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  if (!hamburgerBtn || !navLinks) return;

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('open');
    hamburgerBtn.classList.toggle('active');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close when clicking any nav link
  navItems.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', false);
    });
  });

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', false);
    }
  });
}

/* ---------------- 4. Scroll Effects & Active Nav Link Spy ---------------- */
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Sticky navbar shadow
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll to Top visibility
    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }

    // Active Section Spy
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navItems.forEach((item) => {
      item.classList.remove('active');
      if (currentSectionId && item.getAttribute('href') === `#${currentSectionId}`) {
        item.classList.add('active');
      }
    });
  });

  // Scroll to top click
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ---------------- 5. One-Click Copy Phone Number (+91 9602008230) ---------------- */
function initCopyPhone() {
  const copyBtn = document.getElementById('copyPhoneBtn');
  const copyTooltip = document.getElementById('copyTooltip');
  const rawPhoneNumber = '+919602008230';

  if (!copyBtn || !copyTooltip) return;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(rawPhoneNumber);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = rawPhoneNumber;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      // Display feedback
      copyTooltip.textContent = 'Copied!';
      copyTooltip.classList.add('show');

      const icon = copyBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-copy');
        icon.classList.add('fa-check');
      }

      setTimeout(() => {
        copyTooltip.classList.remove('show');
        copyTooltip.textContent = 'Copy';
        if (icon) {
          icon.classList.remove('fa-check');
          icon.classList.add('fa-copy');
        }
      }, 2200);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  });
}

/* ---------------- 6. Contact Form Validation & State ---------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('formToast');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const messageInput = document.getElementById('userMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Clear errors on input
  [nameInput, emailInput, messageInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        clearErrors();
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      isValid = false;
    }

    // Validate Email
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      emailError.textContent = 'Please enter your email address.';
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      emailError.textContent = 'Please provide a valid email format.';
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please write a message before submitting.';
      isValid = false;
    } else if (messageInput.value.trim().length < 8) {
      messageError.textContent = 'Please include at least 8 characters.';
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending action
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Message...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalBtnHTML;
      submitBtn.disabled = false;
      form.reset();

      if (toast) {
        toast.classList.add('active');
        setTimeout(() => {
          toast.classList.remove('active');
        }, 5000);
      }
    }, 700);
  });

  function clearErrors() {
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (messageError) messageError.textContent = '';
  }
}

/* ---------------- 7. Dynamic Footer Year ---------------- */
function initCurrentYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
