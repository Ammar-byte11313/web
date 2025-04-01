// Optimized JavaScript for better performance

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth scroll behavior for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Use native scrollIntoView with smooth behavior
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Lazy load images as they come into viewport
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          imageObserver.unobserve(image);
        }
      });
    });

    lazyImages.forEach(image => imageObserver.observe(image));
  }

  // Simple animation for feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    featureCards.forEach(card => cardObserver.observe(card));
  }

  // Add responsive navigation for mobile
  const setupMobileNav = () => {
    const header = document.querySelector('header');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    mobileMenuBtn.innerHTML = `<span></span><span></span><span></span>`;
    
    const navLinks = document.querySelector('.nav-links');
    
    // Only append mobile button if viewport is small and button doesn't already exist
    if (window.innerWidth <= 576 && !document.querySelector('.mobile-menu-btn')) {
      header.insertBefore(mobileMenuBtn, navLinks);
      
      mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
      });
    }
  };

  // Initial setup
  setupMobileNav();
  
  // Setup on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    // Debounce resize event
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setupMobileNav, 250);
  });
});

// Improve perceived performance with preload hints
const prefetchLinks = () => {
  // Add preconnect for any third-party domains
  const linksToPreconnect = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
  
  linksToPreconnect.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Run this immediately to improve initial page load
prefetchLinks(); 