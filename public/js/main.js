// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('active'));
}

// Active nav link
const navLinks = document.querySelectorAll('.nav-link');
const currentPath = window.location.pathname;
navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPath || 
      (currentPath === '/' && link.getAttribute('href') === '/')) {
    link.style.color = '#FFFFFF';
    link.style.fontWeight = '600';
  }
});

// Hero slideshow
(function() {
  const slideshow = document.getElementById('heroSlideshow');
  if (!slideshow) return;
  
  const slides = slideshow.querySelectorAll('.slide');
  if (slides.length <= 1) return;
  
  let current = 0;
  
  setInterval(function() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 4000);
})();
