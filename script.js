// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const toast = document.getElementById('toast');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const galleryItems = document.querySelectorAll('.gallery-item');
const backToTop = document.getElementById('backToTop');

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Contact Form Submission =====
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        Duke Dërguar...
    `;
    
    // Simulate form submission (replace with actual form handling)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success toast
    showToast();
    
    // Reset form
    contactForm.reset();
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
        </svg>
        Dërgo Mesazhin
    `;
});

// ===== Toast Notification =====
function showToast() {
    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
    }, 5000);
}

// ===== Gallery Lightbox =====
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Back to Top =====
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .stat-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animation class to hero elements
    document.querySelectorAll('.hero .animate-fade-up').forEach(el => {
        el.style.opacity = '1';
    });
});

// ===== Form Validation (Basic) =====
const inputs = contactForm.querySelectorAll('input, textarea');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        field.style.borderColor = '#ef4444';
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            field.style.borderColor = '#ef4444';
            return false;
        }
    }
    
    field.classList.remove('error');
    field.style.borderColor = '';
    return true;
}

// ===== Counter Animation for Stats =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value, .floating-value');
    
    counters.forEach(counter => {
        const target = counter.innerText;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const isSlash = target.includes('/');
        
        // Skip if not a number
        if (isSlash) return;
        
        const number = parseInt(target.replace(/[^0-9]/g, ''));
        
        if (isNaN(number)) return;
        
        let current = 0;
        const increment = number / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (displayValue >= 1000) {
                displayValue = displayValue.toLocaleString();
            }
            
            counter.innerText = displayValue + (isPlus ? '+' : '') + (isPercentage ? '%' : '');
        }, stepTime);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
}

console.log('Bovilla Beton website loaded successfully!');
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  let index = 0;

  function updateSlides() {
    slides.forEach(slide =>
      slide.classList.remove('active', 'prev', 'next')
    );

    slides[index].classList.add('active');

    const prev = (index - 1 + slides.length) % slides.length;
    const next = (index + 1) % slides.length;

    slides[prev].classList.add('prev');
    slides[next].classList.add('next');
  }

  document.querySelector('.next').onclick = () => {
    index = (index + 1) % slides.length;
    updateSlides();
  };

  document.querySelector('.prev').onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlides();
  };

  updateSlides();
});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('clientsTrack');
  if (!track) return;

  // Grab original items (non-clones)
  const originalItems = Array.from(track.children).filter(n => !n.classList.contains('clients__clone'));
  if (originalItems.length === 0) return;

  // Remove any pre-existing clones (safety)
  track.querySelectorAll('.clients__clone').forEach(n => n.remove());

  // Ensure the track contains at least two full sets of items (so translateX(-half) works)
  // Keep cloning the original set until track.scrollWidth >= viewportWidth * 2
  const viewport = track.parentElement;
  const viewportWidth = () => Math.ceil(viewport.getBoundingClientRect().width);
  const ensureDoubleSet = () => {
    // Start by appending one clone set
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('clients__clone');
      clone.setAttribute('aria-hidden', 'true');
      // clear alt on clone images to avoid duplicate screen reader announcements
      const img = clone.querySelector('img');
      if (img) img.alt = '';
      track.appendChild(clone);
    });
    // If still not wide enough, append more clones until width >= 2 * viewport
    let safety = 0;
    while (track.scrollWidth < viewportWidth() * 2 && safety < 10) {
      originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.classList.add('clients__clone');
        clone.setAttribute('aria-hidden', 'true');
        const img = clone.querySelector('img');
        if (img) img.alt = '';
        track.appendChild(clone);
      });
      safety++;
    }
  };

  ensureDoubleSet();

  // Compute the pixel distance to scroll: width of one full set (half of track)
  function computeScrollDistance() {
    // We want the width of one logical set. Find first occurrence of the original sequence width.
    // Simpler: assume track contains N items and first half equals one set.
    const totalWidth = track.scrollWidth;
    // If we duplicated exactly once, one set width = totalWidth / 2
    // But because we may have appended multiple sets, find width of originalItems combined:
    let setWidth = 0;
    for (let i = 0; i < originalItems.length; i++) {
      setWidth += originalItems[i].getBoundingClientRect().width;
      // include gap between items (approx): use computed gap from CSS
    }
    // Fallback: if setWidth is 0 (images not loaded yet), use totalWidth / numberOfSets
    if (!setWidth || setWidth < 1) {
      // count how many sets are present by dividing totalWidth by viewport width approx
      setWidth = totalWidth / Math.max(2, Math.round(totalWidth / viewportWidth()));
    }
    return Math.round(setWidth + (getComputedStyle(track).gap ? parseFloat(getComputedStyle(track).gap) * originalItems.length : 0));
  }

  // Wait for images to load to get accurate widths
  const images = Array.from(track.querySelectorAll('img'));
  const waitForImages = Promise.all(images.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(res => img.addEventListener('load', res, { once: true }));
  }));

  waitForImages.then(() => {
    const scrollDistance = computeScrollDistance();
    // Determine duration from px-per-second variable
    const rootStyles = getComputedStyle(document.documentElement);
    const pxPerSecond = parseFloat(rootStyles.getPropertyValue('--base-px-per-second')) || 120;
    const durationSeconds = Math.max(6, Math.round(scrollDistance / pxPerSecond));

    // Remove any previously injected keyframes with our id
    const styleId = 'clients-dynamic-keyframes';
    let styleTag = document.getElementById(styleId);
    if (styleTag) styleTag.remove();

    // Create keyframes that translate by exactly -scrollDistance px
    styleTag = document.createElement('style');
    styleTag.id = styleId;
    styleTag.textContent = `
      @keyframes clients-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${scrollDistance}px); }
      }
      /* apply the animation to the track */
      #${track.id} {
        animation: clients-scroll ${durationSeconds}s linear infinite;
        animation-play-state: running;
      }
    `;
    document.head.appendChild(styleTag);

    // Recompute on resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // remove clones and rebuild to ensure correct sizing on layout change
        track.querySelectorAll('.clients__clone').forEach(n => n.remove());
        ensureDoubleSet();
        // re-run this block by calling the function again
        // (simple approach: reload page of keyframes by re-calling the same logic)
        // For clarity, just reload the page layout by re-invoking this script block:
        // (call compute and inject new keyframes)
        const newScrollDistance = computeScrollDistance();
        const newDuration = Math.max(6, Math.round(newScrollDistance / pxPerSecond));
        styleTag.textContent = `
          @keyframes clients-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${newScrollDistance}px); }
          }
          #${track.id} {
            animation: clients-scroll ${newDuration}s linear infinite;
            animation-play-state: running;
          }
        `;
      }, 150);
    });

    // Keyboard focus pause/resume
    track.addEventListener('focusin', () => track.style.animationPlayState = 'paused');
    track.addEventListener('focusout', () => track.style.animationPlayState = '');

    // If user prefers reduced motion, stop animation
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      track.style.animation = 'none';
    }
  });
});
