/* KD Entertainment IPTV - Main JavaScript */

document.addEventListener('DOMContentLoaded', function () {
  initNavActive();
  initFaq();
  initMobileMenu();
  initSmoothScroll();
  initHeaderScroll();
  initAnimateOnScroll();
  initCounterAnimation();
  initHeroCarousel();
});

function initNavActive() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .mobile-nav__link').forEach(function (link) {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initFaq() {
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    if (!question || !answer) return;

    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');
      
      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove('is-open');
        const otherAnswer = otherItem.querySelector('.faq__answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const body = document.body;

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function () {
    const isOpen = mobileNav.classList.contains('is-open');
    mobileNav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', !isOpen);
    body.style.overflow = isOpen ? '' : 'hidden';
    
    const spans = toggle.querySelectorAll('span');
    if (!isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  document.querySelectorAll('.mobile-nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
      
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;
  
  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

function initAnimateOnScroll() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    '.feature-card, .pricing-card, .testimonial-card, .stat-box, .channel-card, .blog-card, .faq__item'
  );

  animateElements.forEach(function (el, index) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.style.transitionDelay = (index % 4) * 0.1 + 's';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = '.animate-in { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
}

function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-box__number, .hero__stat-number');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}

function animateCounter(element) {
  const text = element.textContent;
  const match = text.match(/[\d,]+/);
  
  if (!match) return;
  
  const targetNum = parseInt(match[0].replace(/,/g, ''));
  const prefix = text.substring(0, text.indexOf(match[0]));
  const suffix = text.substring(text.indexOf(match[0]) + match[0].length);
  
  let current = 0;
  const duration = 2000;
  const increment = targetNum / (duration / 16);
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    current = Math.floor(targetNum * easeOutQuart);
    
    const formattedNum = current.toLocaleString();
    element.textContent = prefix + formattedNum + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = text;
    }
  }

  requestAnimationFrame(update);
}

window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// Image error handling and lazy loading
function initImageHandling() {
  const images = document.querySelectorAll('img');
  
  images.forEach(function(img) {
    // Add loaded class when image loads
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function() {
        this.classList.add('loaded');
      });
    }
    
    // Handle image errors with fallback
    img.addEventListener('error', function() {
      this.classList.add('error');
      // Set a gradient fallback background on parent
      if (this.parentElement) {
        this.parentElement.style.background = 'linear-gradient(135deg, #001f44 0%, #0f0f1a 100%)';
      }
      // Hide broken image icon
      this.style.opacity = '0';
    });
  });
}

// Initialize image handling
document.addEventListener('DOMContentLoaded', initImageHandling);

function initHeroCarousel() {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.hero-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const prevBtn = carousel.querySelector('.carousel-arrow--prev');
  const nextBtn = carousel.querySelector('.carousel-arrow--next');
  
  if (slides.length === 0) return;

  let currentSlide = 0;
  let autoplayInterval;
  const autoplayDelay = 6000;
  let isTransitioning = false;

  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    resetAutoplay();

    setTimeout(function() {
      isTransitioning = false;
    }, 1000);
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, autoplayDelay);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      prevSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      nextSlide();
    });
  }

  dots.forEach(function(dot, index) {
    dot.addEventListener('click', function() {
      if (index !== currentSlide) {
        goToSlide(index);
      }
    });
  });

  carousel.addEventListener('mouseenter', function() {
    clearInterval(autoplayInterval);
  });

  carousel.addEventListener('mouseleave', function() {
    startAutoplay();
  });

  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  startAutoplay();
}
