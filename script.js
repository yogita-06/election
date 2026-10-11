const root = document.documentElement;
const language = document.querySelector('#language');
const languageButton = document.querySelector('#languageButton');
const languageLabel = document.querySelector('#languageLabel');
const labels = { en: 'EN', es: 'ES', zh: '中文' };

function setLanguage(code) {
  root.dataset.lang = code;
  root.lang = code;
  languageLabel.textContent = labels[code];
  localStorage.setItem('campaign-language', code);
  language.classList.remove('open');
  languageButton.setAttribute('aria-expanded', 'false');
  const subjects = {
    volunteer: { en: 'Volunteer', es: 'Voluntariado', zh: 'Volunteer' },
    aid: { en: 'Mutual aid', es: 'Ayuda mutua', zh: 'Mutual aid' },
  };
  document.querySelectorAll('.email-action').forEach((link) => {
    const subject = subjects[link.dataset.action][code];
    link.href = `mailto:lisaannjacobs7@icloud.com?subject=${encodeURIComponent(subject)}`;
  });
}

setLanguage(localStorage.getItem('campaign-language') || 'en');
languageButton.addEventListener('click', () => {
  const open = language.classList.toggle('open');
  languageButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
document.addEventListener('click', (event) => {
  if (!language.contains(event.target)) {
    language.classList.remove('open');
    languageButton.setAttribute('aria-expanded', 'false');
  }
});

const menuButton = document.querySelector('#menuButton');
const mobileNav = document.querySelector('#mobileNav');
function closeMenu() {
  mobileNav.hidden = true;
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const willOpen = mobileNav.hidden;
  mobileNav.hidden = !willOpen;
  document.body.classList.toggle('menu-open', willOpen);
  menuButton.setAttribute('aria-expanded', String(willOpen));
});
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    language.classList.remove('open');
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('#year').textContent = new Date().getFullYear();
