/**
 * macOS Style JavaScript
 * Handles interactive effects for macOS-themed website
 */

(function() {
  'use strict';

  // ============================================
  // Page Load Animation
  // ============================================
  function initPageLoadAnimation() {
    const loader = document.getElementById('macos-loader');
    if (loader) {
      window.addEventListener('load', function() {
        setTimeout(() => {
          loader.classList.add('fade-out');
          setTimeout(() => {
            loader.style.display = 'none';
          }, 500);
        }, 300);
      });
    }

    // Fade in content on load
    document.body.classList.add('macos-loaded');
  }

  // ============================================
  // Glass Card Hover Effects with 3D Transform
  // ============================================
  function initCardEffects() {
    const cards = document.querySelectorAll('.glass-card, .profile-card, .project-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // ============================================
  // Smooth Scroll
  // ============================================
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ============================================
  // Dark Mode Toggle
  // ============================================
  function initDarkMode() {
    const toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;

    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('macos-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark-mode');
    }

    toggle.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark-mode');
      const isDark = document.documentElement.classList.contains('dark-mode');
      localStorage.setItem('macos-theme', isDark ? 'dark' : 'light');
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      if (!localStorage.getItem('macos-theme')) {
        document.documentElement.classList.toggle('dark-mode', e.matches);
      }
    });
  }

  // ============================================
  // Dock-style Navigation
  // ============================================
  function initDockNav() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const navItems = navbar.querySelectorAll('.navbar-item');

    navItems.forEach(item => {
      const link = item.querySelector('a');
      if (!link) return;

      link.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.2s ease';

      link.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15) translateY(-2px)';
      });

      link.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
      });

      link.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1.15) translateY(-2px)';
        }, 150);
      });
    });

    // Wave effect for neighboring items
    navItems.forEach((item, index) => {
      const link = item.querySelector('a');
      if (!link) return;

      link.addEventListener('mouseenter', function() {
        const prevItem = navItems[index - 1]?.querySelector('a');
        const nextItem = navItems[index + 1]?.querySelector('a');

        if (prevItem) prevItem.style.transform = 'scale(1.08) translateY(-1px)';
        if (nextItem) nextItem.style.transform = 'scale(1.08) translateY(-1px)';
      });

      link.addEventListener('mouseleave', function() {
        const prevItem = navItems[index - 1]?.querySelector('a');
        const nextItem = navItems[index + 1]?.querySelector('a');

        if (prevItem) prevItem.style.transform = 'scale(1) translateY(0)';
        if (nextItem) nextItem.style.transform = 'scale(1) translateY(0)';
      });
    });
  }

  // ============================================
  // Navbar Scroll Effect
  // ============================================
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // ============================================
  // Intersection Observer for Fade-in Animations
  // ============================================
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements that should animate
    const animateElements = document.querySelectorAll(
      '.glass-card, .profile-card, .quick-nav .glass-card, section, .timeline-item'
    );

    animateElements.forEach(el => {
      el.classList.add('fade-in-animate');
      observer.observe(el);
    });
  }

  // ============================================
  // Project Card Tags
  // ============================================
  function initProjectTags() {
    const tagLists = document.querySelectorAll('.project-tags');

    tagLists.forEach(list => {
      const tags = list.querySelectorAll('.tag');
      tags.forEach(tag => {
        tag.addEventListener('click', function() {
          const tagValue = this.textContent.trim();

          // Filter projects by tag (optional functionality)
          document.querySelectorAll('.project-card').forEach(card => {
            const cardTags = card.querySelector('.project-tags');
            if (cardTags) {
              const cardTagValues = Array.from(cardTags.querySelectorAll('.tag'))
                .map(t => t.textContent.trim());

              if (cardTagValues.includes(tagValue)) {
                card.style.display = 'block';
                card.classList.add('tag-matched');
              } else {
                card.style.display = 'none';
                card.classList.remove('tag-matched');
              }
            }
          });
        });
      });
    });
  }

  // ============================================
  // Parallax Effect for Hero Section
  // ============================================
  function initParallax() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;

      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
  }

  // ============================================
  // Initialize All Effects
  // ============================================
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }
  }

  function initAll() {
    initPageLoadAnimation();
    initCardEffects();
    initSmoothScroll();
    initDarkMode();
    initDockNav();
    initNavbarScroll();
    initScrollAnimations();
    initProjectTags();
    initParallax();

    // Add loaded class to body after a short delay
    setTimeout(() => {
      document.body.classList.add('effects-ready');
    }, 100);
  }

  // Run initialization
  init();

  // ============================================
  // Export functions for external use
  // ============================================
  window.MacOSStyle = {
    initCardEffects: initCardEffects,
    initDarkMode: initDarkMode,
    initSmoothScroll: initSmoothScroll
  };

})();
