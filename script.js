// ===== TYPEWRITER EFFECT =====
class TypeWriter {
    constructor(element, words, wait = 2000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = `<span class="typewriter">${this.txt}</span>`;

        let typeSpeed = 100;
        if (this.isDeleting) typeSpeed /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 200;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ===== INIT TYPEWRITER =====
document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.querySelector('.typewriter');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }

    // ===== SHOW REAL SITE AFTER LOADING =====
    const intro = document.getElementById('intro');
    const realSite = document.getElementById('real-site');
    setTimeout(() => {
        intro.style.display = 'none';
        realSite.style.display = 'block';
    }, 2000); // 2 seconds loading screen
});

// ===== ORBIT ICON ANIMATION =====
const orbitIcons = document.querySelectorAll('.orbit i');
orbitIcons.forEach((icon, index) => {
    icon.style.animation = `spin 16s linear infinite ${index * 0.2}s`;
});

// ===== BUTTON HOVER GLOW =====
const buttons = document.querySelectorAll('.btn, .btn-home1, .btn-home2');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.boxShadow = '0 0 16px rgba(138, 43, 226, 0.45)'; // purple glow
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.boxShadow = '';
    });
});

// ===== SMOOTH FADE-IN ON SCROLL =====
const faders = document.querySelectorAll('.fade-in, .from-top, .from-left, .from-right, .from-bottom, .zoom-in');

const appearOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // add 'visible' class
            observer.unobserve(entry.target); // stop observing after visible
        }
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));


// ===== ORBIT ICON SPIN KEYFRAMES =====
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
// SCROLL REVEAL
const revealElements = document.querySelectorAll('.reveal, .slide-in-left, .slide-in-right, .slide-in-up');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 150; // Adjust when you want the element to appear

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - revealPoint) {
      el.style.opacity = 1;
      el.style.transform = 'translateX(0) translateY(0)'; // Reset transforms
      el.style.transition = 'all 0.8s ease';
    }
  });
}

// Initial check
revealOnScroll();

// Listen to scroll
window.addEventListener('scroll', revealOnScroll);
