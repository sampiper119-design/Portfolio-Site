// Hamburger navigation toggle (half-screen + mobile, 1024px and below)
const nav = document.querySelector('nav');
const navToggle = document.querySelector('.nav-toggle');

function setMenu(open) {
    nav.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', open);
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

navToggle.addEventListener('click', () => {
    setMenu(!nav.classList.contains('nav-open'));
});

// Close after picking a link (important for same-page anchors)
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});

// Close with Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setMenu(false);
});

// Reset if the window is widened back to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) setMenu(false);
});