// Splotchy's little bits of fun, shared by every page.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lines = ["Hi! I'm Splotchy! 👋", 'Hee hee, that tickles!', 'I can turn ANY color! 🎨', "Let's make a wallpaper!", 'Wiggle wiggle! 🕺', 'Boop! 💜', 'Try Imagine! 💭'];
  const colors = [0, 300, 190, 95, 30, 150, 340];
  let n = 0;

  function confetti(el) {
    if (reduce) return;
    const r = el.getBoundingClientRect();
    for (let k = 0; k < 10; k++) {
      const s = document.createElement('span');
      s.textContent = ['⭐', '💖', '✨', '🎉', '🌈'][k % 5];
      Object.assign(s.style, { position: 'fixed', left: r.left + r.width / 2 + 'px', top: r.top + r.height / 2 + 'px', fontSize: '22px', pointerEvents: 'none', zIndex: 50, transition: 'transform .9s ease-out, opacity .9s' });
      document.body.appendChild(s);
      const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 70;
      requestAnimationFrame(() => { s.style.transform = `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d - 30}px) rotate(${a * 90}deg)`; s.style.opacity = 0; });
      setTimeout(() => s.remove(), 950);
    }
  }

  // Tap Splotchy: new color, a new line, and confetti (like the app's home screen)
  document.querySelectorAll('.splotch').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      n++;
      el.style.filter = `hue-rotate(${colors[n % colors.length]}deg)`;
      const speech = el.parentElement.querySelector('.speech');
      if (speech) speech.textContent = lines[n % lines.length];
      const stars = document.getElementById('stars');
      if (stars) stars.textContent = Number(stars.textContent) + 5;
      confetti(el);
    });
  });

  // Pop sections in as you scroll
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.pop').forEach(el => io.observe(el));
})();
