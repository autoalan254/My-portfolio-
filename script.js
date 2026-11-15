(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const PHONE = '254104255178';

  // Mobile menu
  const btn = $('#menuBtn'), links = $('#navLinks');
  const setMenu = open => {
    links.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  };
  btn.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  $$('a', links).forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Header, back-to-top, active link
  const header = $('#header'), top = $('#topBtn');
  const sections = $$('main section[id]');
  const onScroll = () => {
    header.classList.toggle('scrolled', scrollY > 30);
    top.classList.toggle('show', scrollY > 600);
    let current = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 120) current = s.id; });
    $$('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  // Scroll reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  $$('.reveal').forEach(el => io.observe(el));

  // WhatsApp pre-filled message
  const msg = 'Hello Allan, I visited your portfolio and would like to discuss a website or digital solution for my business. Could we talk?';
  $('#waBtn').href = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

  const wf = $('#waFloat');
  if (wf) wf.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

  // Project buttons: ask about that project on WhatsApp (replace with live links later)
  $$('[data-project]').forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    const text = `Hello Allan, I'd like to know more about your "${b.dataset.project}" project.`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }));

  // Friendly placeholder if an image has not been uploaded yet
  $$('img').forEach(img => img.addEventListener('error', () => {
    const w = img.width || 800, h = img.height || 500;
    const label = (img.alt || 'Image').replace(/[<>&]/g, '');
    img.src = 'data:image/svg+xml,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#12141d"/><text x="50%" y="50%" fill="#6b6e7c" font-family="sans-serif" font-size="22" text-anchor="middle">${label}</text></svg>`);
  }, { once: true }));

  $('#year').textContent = new Date().getFullYear();
})();
