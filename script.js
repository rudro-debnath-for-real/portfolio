/**
 * Rudro Debnath - Portfolio JavaScript
 * Handles navigation, theme toggle, animations, form validation, and interactive features
 */

(function() {
  'use strict';

  // ==========================================================================
  // DOM Elements Cache
  // ==========================================================================
  const elements = {
    navbar: document.getElementById('navbar'),
    navLinks: document.getElementById('navLinks'),
    hamburger: document.getElementById('hamburger'),
    themeToggle: document.getElementById('themeToggle'),
    scrollProgress: document.getElementById('scrollProgress'),
    backToTop: document.getElementById('backToTop'),
    typingText: document.getElementById('typingText'),
    contactForm: document.getElementById('contactForm'),
    statValues: document.querySelectorAll('.stat-value[data-count]'),
    cpStatValues: document.querySelectorAll('.cp-stat-value[data-count]'),
    skillProgress: document.querySelectorAll('.skill-progress[data-progress]'),
    sections: document.querySelectorAll('section[id]'),
    navLinkItems: document.querySelectorAll('.nav-link[data-section]'),
    projectCards: document.querySelectorAll('.project-card'),
    educationItems: document.querySelectorAll('.education-item'),
    animateElements: document.querySelectorAll('[class*="animate-"]')
  };

  // ==========================================================================
  // State
  // ==========================================================================
  const state = {
    isScrolling: false,
    lastScrollY: 0,
    theme: 'dark',
    animationsInitialized: false,
    countersAnimated: false,
    skillsAnimated: false
  };

  // ==========================================================================
  // Theme Management
  // ==========================================================================
  function initTheme() {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      state.theme = savedTheme;
    } else if (!prefersDark) {
      state.theme = 'light';
    }

    applyTheme(state.theme);
  }

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update theme toggle aria-pressed
    elements.themeToggle.setAttribute('aria-pressed', theme === 'light');
  }

  function toggleTheme() {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  // ==========================================================================
  // Navigation
  // ==========================================================================
  function initNavigation() {
    // Mobile menu toggle
    elements.hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking a link
    elements.navLinkItems.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (elements.navLinks.classList.contains('active') &&
          !elements.navLinks.contains(e.target) &&
          !elements.hamburger.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Smooth scroll for navigation links
    elements.navLinkItems.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.slice(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            scrollToElement(targetElement);
            updateActiveNavLink(targetId);
          }
        }
      });
    });
  }

  function toggleMobileMenu() {
    const isOpen = elements.navLinks.classList.toggle('active');
    elements.hamburger.classList.toggle('active');
    elements.hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    elements.navLinks.classList.remove('active');
    elements.hamburger.classList.remove('active');
    elements.hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function scrollToElement(element) {
    const navHeight = elements.navbar.offsetHeight;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  function updateActiveNavLink(activeId) {
    elements.navLinkItems.forEach(link => {
      const sectionId = link.getAttribute('data-section');
      if (sectionId === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // Scroll Handling
  // ==========================================================================
  function initScrollHandling() {
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function handleScroll() {
    const scrollY = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / docHeight) * 100;

    // Update scroll progress bar
    elements.scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
    elements.scrollProgress.setAttribute('aria-valuenow', Math.round(scrollPercent));

    // Show/hide back to top button
    if (scrollY > 300) {
      elements.backToTop.hidden = false;
      // Force reflow for animation
      requestAnimationFrame(() => {
        elements.backToTop.classList.add('visible');
      });
    } else {
      elements.backToTop.classList.remove('visible');
      // Wait for transition before hiding
      setTimeout(() => {
        if (!elements.backToTop.classList.contains('visible')) {
          elements.backToTop.hidden = true;
        }
      }, 300);
    }

    // Update active navigation link based on scroll position
    updateActiveNavOnScroll();

    // Trigger animations on scroll
    triggerScrollAnimations();

    state.lastScrollY = scrollY;
  }

  function updateActiveNavOnScroll() {
    const navHeight = elements.navbar.offsetHeight;
    const scrollY = window.pageYOffset + navHeight + 100;

    elements.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        updateActiveNavLink(sectionId);
      }
    });
  }

  // ==========================================================================
  // Scroll Animations (Intersection Observer)
  // ==========================================================================
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.section-header, .about-image, .about-text, .skill-category, .project-card, .cp-card, .education-item, .contact-info, .contact-form').forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.transitionDelay = `${Math.min(index * 100, 500)}ms`;
      observer.observe(el);
    });

    // Add animated class styles
    const style = document.createElement('style');
    style.textContent = `
      .animated {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  function triggerScrollAnimations() {
    // Counter animations for hero stats
    if (!state.countersAnimated) {
      const heroSection = document.getElementById('home');
      const heroRect = heroSection.getBoundingClientRect();

      if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
        animateCounters();
        state.countersAnimated = true;
      }
    }

    // Counter animations for CP stats
    const cpSection = document.getElementById('competitive');
    const cpRect = cpSection.getBoundingClientRect();

    if (cpRect.top < window.innerHeight * 0.8 && cpRect.bottom > 0) {
      if (!elements.cpStatValues[0].classList.contains('animated')) {
        animateCpCounters();
      }
    }

    // Skill progress bars
    if (!state.skillsAnimated) {
      const skillsSection = document.getElementById('skills');
      const skillsRect = skillsSection.getBoundingClientRect();

      if (skillsRect.top < window.innerHeight * 0.8 && skillsRect.bottom > 0) {
        animateSkillBars();
        state.skillsAnimated = true;
      }
    }
  }

  // ==========================================================================
  // Counter Animations
  // ==========================================================================
  function animateCounters() {
    elements.statValues.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-count'));
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const current = target * easedProgress;

        if (isDecimal) {
          stat.textContent = current.toFixed(2);
        } else {
          stat.textContent = Math.floor(current).toLocaleString();
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = isDecimal ? target.toFixed(2) : target.toLocaleString();
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  function animateCpCounters() {
    elements.cpStatValues.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'), 10);
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const current = Math.floor(target * easedProgress);

        stat.textContent = current.toLocaleString() + (target >= 1000 ? '+' : '');

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target.toLocaleString() + '+';
        }
      }

      stat.classList.add('animated');
      requestAnimationFrame(updateCounter);
    });
  }

  function animateSkillBars() {
    elements.skillProgress.forEach((bar, index) => {
      const progress = bar.getAttribute('data-progress');
      setTimeout(() => {
        bar.style.width = `${progress}%`;
      }, index * 100);
    });
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // ==========================================================================
  // Typing Animation
  // ==========================================================================
  function initTypingAnimation() {
    const texts = [
      'Hello, I\'m Rudro',
      'Welcome to my portfolio',
      'CSE Student | Developer',
      'Problem Solver'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let animationId = null;

    function type() {
      const currentText = texts[textIndex];

      if (isDeleting) {
        elements.typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        elements.typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before next text
      }

      animationId = setTimeout(type, typingSpeed);
    }

    // Start typing animation
    setTimeout(type, 1000);

    // Cleanup function for theme changes (if needed)
    return () => {
      if (animationId) {
        clearTimeout(animationId);
      }
    };
  }

  // ==========================================================================
  // Back to Top
  // ==========================================================================
  function initBackToTop() {
    elements.backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // Contact Form Validation
  // ==========================================================================
  function initContactForm() {
    const form = elements.contactForm;
    const fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      subject: document.getElementById('subject'),
      message: document.getElementById('message')
    };

    // Real-time validation on blur
    Object.values(fields).forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => clearError(field));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      Object.values(fields).forEach(field => {
        if (!validateField(field)) {
          isValid = false;
        }
      });

      if (isValid) {
        handleFormSubmit(form, fields);
      } else {
        // Focus first invalid field
        const firstInvalid = form.querySelector('.error');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  }

  function validateField(field) {
    const errorElement = field.parentElement.querySelector('.form-error');
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    field.classList.remove('error');
    if (errorElement) {
      errorElement.textContent = '';
    }

    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = `${getFieldLabel(field)} is required`;
    }

    // Email validation
    if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Select validation
    if (field.tagName === 'SELECT' && field.hasAttribute('required') && !field.value) {
      isValid = false;
      errorMessage = 'Please select a subject';
    }

    // Message length validation
    if (field.name === 'message' && field.value.trim().length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters';
    }

    if (!isValid) {
      field.classList.add('error');
      if (errorElement) {
        errorElement.textContent = errorMessage;
      }
    }

    return isValid;
  }

  function clearError(field) {
    field.classList.remove('error');
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  function getFieldLabel(field) {
    const label = field.parentElement.querySelector('label');
    return label ? label.textContent : field.name;
  }

  async function handleFormSubmit(form, fields) {
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.querySelector('.btn-text').textContent;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    submitBtn.classList.add('loading');

    try {
      // Submit form via Formspree
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showFormMessage(form, 'success', 'Thank you for your message! I\'ll get back to you soon.');
        form.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          showFormMessage(form, 'error', data.errors.map(e => e.message).join(', '));
        } else {
          showFormMessage(form, 'error', 'Something went wrong. Please try again later.');
        }
      }
    } catch (error) {
      showFormMessage(form, 'error', 'Network error. Please check your connection and try again.');
    } finally {
      // Restore button
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = originalText;
      submitBtn.classList.remove('loading');
    }
  }

  function showFormMessage(form, type, message) {
    // Remove existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.setAttribute('role', 'alert');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      padding: var(--space-3) var(--space-4);
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      margin-top: var(--space-4);
      ${type === 'success'
        ? 'background: rgba(16, 185, 129, 0.1); color: var(--color-success); border: 1px solid rgba(16, 185, 129, 0.2);'
        : 'background: rgba(239, 68, 68, 0.1); color: var(--color-error); border: 1px solid rgba(239, 68, 68, 0.2);'
      }
    `;

    form.appendChild(messageDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageDiv.style.opacity = '0';
      messageDiv.style.transition = 'opacity 0.3s ease';
      setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
  }

  // ==========================================================================
  // Project Card Interactions
  // ==========================================================================
  function initProjectCards() {
    elements.projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ==========================================================================
  // Keyboard Navigation
  // ==========================================================================
  function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Escape key closes mobile menu
      if (e.key === 'Escape' && elements.navLinks.classList.contains('active')) {
        closeMobileMenu();
        elements.hamburger.focus();
      }

      // Tab navigation in mobile menu
      if (e.key === 'Tab' && elements.navLinks.classList.contains('active')) {
        const focusableElements = elements.navLinks.querySelectorAll('a');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  // ==========================================================================
  // Performance Optimizations
  // ==========================================================================
  function initPerformanceOptimizations() {
    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--transition-fast', '0ms');
      document.documentElement.style.setProperty('--transition-normal', '0ms');
      document.documentElement.style.setProperty('--transition-slow', '0ms');
      document.documentElement.style.setProperty('--transition-spring', '0ms');
    }

    // Listen for changes
    prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.style.setProperty('--transition-fast', '0ms');
        document.documentElement.style.setProperty('--transition-normal', '0ms');
        document.documentElement.style.setProperty('--transition-slow', '0ms');
        document.documentElement.style.setProperty('--transition-spring', '0ms');
      } else {
        document.documentElement.style.removeProperty('--transition-fast');
        document.documentElement.style.removeProperty('--transition-normal');
        document.documentElement.style.removeProperty('--transition-slow');
        document.documentElement.style.removeProperty('--transition-spring');
      }
    });
  }

  // ==========================================================================
  // Initialize All
  // ==========================================================================
  function init() {
    // Initialize core features
    initTheme();
    initNavigation();
    initScrollHandling();
    initScrollAnimations();
    initTypingAnimation();
    initBackToTop();
    initContactForm();
    initProjectCards();
    initKeyboardNavigation();
    initPerformanceOptimizations();

    // Event listeners
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && elements.navLinks.classList.contains('active')) {
          closeMobileMenu();
        }
      }, 250);
    });

    console.log('Portfolio initialized successfully!');
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();