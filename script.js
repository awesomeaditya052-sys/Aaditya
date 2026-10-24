const progress = document.getElementById('progress');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${amount}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.section, .skill-card, .timeline-item, .project-placeholder, .values-row > div').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});
document.getElementById('year').textContent = new Date().getFullYear();
