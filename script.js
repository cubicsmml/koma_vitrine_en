// ============================================
// KÖMA - JAVASCRIPT MODERNE
// ============================================

// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

// Navigation
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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

// Counter Animation
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, duration / steps);
}

// Intersection Observer for Counters
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      animateCounter(entry.target);
      entry.target.classList.add('counted');
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.counter').forEach(counter => {
  counterObserver.observe(counter);
});

// Scroll Animations
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.feature-card, .app-feature, .contact-method').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  scrollObserver.observe(el);
});

// Contact Form
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company') || 'Non spécifié',
    message: formData.get('message')
  };
  
  // Montrer le loader
  const btnText = contactForm.querySelector('.btn-text');
  const btnLoading = contactForm.querySelector('.btn-loading');
  btnText.style.display = 'none';
  btnLoading.style.display = 'flex';
  
  try {
    // Créer le message pour email
    const emailSubject = `Contact depuis le site Köma - ${data.name}`;
    const emailBody = `
Bonjour,

Vous avez reçu un nouveau message depuis le site Köma :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMATIONS DE CONTACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Nom : ${data.name}
📧 Email : ${data.email}
📱 Téléphone : ${data.phone}
🏢 Entreprise : ${data.company}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ce message a été envoyé depuis https://amadoutoure14.github.io/koma_vitrine/
    `.trim();
    
    // Créer le lien mailto
    const mailtoUrl = `mailto:cubicsmml@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Ouvrir le client email
    window.location.href = mailtoUrl;
    
    // Afficher le succès après un court délai
    setTimeout(() => {
      formStatus.textContent = '✅ Votre client email s\'est ouvert. Envoyez le message pour nous contacter.';
      formStatus.className = 'form-status success';
      
      // Réinitialiser le formulaire
      contactForm.reset();
    }, 500);
    
    // Cacher le message après 8 secondes
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 8000);
    
  } catch (error) {
    formStatus.textContent = '❌ Une erreur est survenue. Contactez-nous via WhatsApp.';
    formStatus.className = 'form-status error';
  } finally {
    // Cacher le loader
    setTimeout(() => {
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }, 500);
  }
});

// Parallax Effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  // Parallax sur les orbs
  document.querySelectorAll('.gradient-orb').forEach((orb, index) => {
    const speed = 0.3 + (index * 0.1);
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Dynamic Year
document.getElementById('year').textContent = new Date().getFullYear();

// Button Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(255,255,255,0.6);
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(20);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Mouse move parallax on phone mockups
const appImages = document.querySelector('.app-images');
if (appImages) {
  appImages.addEventListener('mousemove', (e) => {
    const rect = appImages.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    const mockups = document.querySelectorAll('.app-mockup');
    mockups.forEach((mockup, index) => {
      const depth = (index + 1) * 20;
      mockup.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });
  
  appImages.addEventListener('mouseleave', () => {
    const mockups = document.querySelectorAll('.app-mockup');
    mockups.forEach(mockup => {
      mockup.style.transform = 'translate(0, 0)';
    });
  });
}

// Easter Egg Console
console.log('%c👋 Bienvenue sur Köma!', 'color: #FFDD00; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%c🚀 Site réalisé avec passion', 'color: #fff; font-size: 14px;');
console.log('%c📱 WhatsApp: +223 50 00 01 88', 'color: #25D366; font-size: 12px;');
console.log('%c📧 Email: cubicsmml@gmail.com', 'color: #FFDD00; font-size: 12px;');

// Performance Monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`⚡ Page chargée en ${pageLoadTime}ms`);
    }, 0);
  });
}

// Prevent context menu on images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('contextmenu', (e) => e.preventDefault());
});

// Add loading state to external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.addEventListener('click', function() {
    this.style.opacity = '0.7';
    setTimeout(() => {
      this.style.opacity = '1';
    }, 1000);
  });
});
