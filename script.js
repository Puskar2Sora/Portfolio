// Smooth scroll (extra)
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
/* keep any existing functions like scrollToSection below or above this block */

/* ----------------
   Matrix Hacker Rain
   ---------------- */
(function matrixRain(){
  const canvas = document.getElementById('matrix');
  if(!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, columns = 0;
  const dpr = Math.max(1, window.devicePixelRatio || 1);

  // characters used — mix of 0/1 and small letters and block characters for a hacker feel
  const letters = '010101010101010101010101010101010101010101010101010101010101011010101101011011';
  const lettersArr = letters.split('');

  // column drops - track y position in "rows"
  let drops = [];

  function resize(){
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);

    // font sizing based on width
    const fontSize = Math.max(12, Math.min(20, Math.floor(width / 80)));
    ctx.font = `${fontSize}px monospace`;
    columns = Math.floor(width / (fontSize * 0.6)); // approximate char width
    drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * height / fontSize));
  }

  let fpsInterval = 1000/50; // 50 fps target
  let lastTime = 0;

  function draw(time){
    requestAnimationFrame(draw);
    if(!lastTime) lastTime = time;
    const elapsed = time - lastTime;
    if (elapsed < fpsInterval) return;
    lastTime = time - (elapsed % fpsInterval);

    // semi-transparent black rectangle to slightly fade previous frame
    ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.fillRect(0, 0, width, height);

    // draw characters
    const fontSize = parseInt(ctx.font, 10) || 16;
    for (let i = 0; i < columns; i++) {
      const text = lettersArr[Math.floor(Math.random() * lettersArr.length)];
      const x = i * (fontSize * 0.6);
      const y = drops[i] * fontSize;

      // bright head
      ctx.fillStyle = `rgba(25, 156, 36, 0.95)`; // neon green head
      ctx.fillText(text, x, y);

      // trailing glow (slightly to the right/above for aesthetic)
      ctx.fillStyle = `rgba(197, 129, 50, 0.08)`; // cyan faint tint for futuristic mix
      ctx.fillText(text, x+0.6, y- (fontSize * 0.12));

      // increment y
      if (y > height + Math.random() * 300) {
        drops[i] = 0;
      } else {
        drops[i]++;
      }
    }
  }

  // start
  resize();
  window.addEventListener('resize', resize, {passive:true});
  requestAnimationFrame(draw);

  // Optional: short intro burst (increase density then calm)
  let burst = true;
  setTimeout(()=>{ burst = false; }, 2200);

})(); // immediately invoked
/* end Matrix Hacker Rain */
// ===== Floating Navbar Scroll Glow =====
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
/* ===== 🌌 Starfield Background Animation ===== */
(function starfield() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];
  const numStars = 150;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: 0.15 + Math.random() * 0.3,
      alpha: 0.2 + Math.random() * 0.8
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    for (let s of stars) {
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      s.y += s.speed;
      if (s.y > canvas.height) s.y = 0;
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
})();
/* ===== 🌟 Reveal Sections on Scroll ===== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

// watch all sections and project cards
document.querySelectorAll('section, .project-card').forEach(el => observer.observe(el));
// ===== 🪶 Smooth Scroll + Section Transition =====
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  // fade out current section
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => sec.classList.remove('active-section'));

  // add transition effect before scrolling
  target.classList.add('active-section');
  window.scrollTo({
    top: target.offsetTop - 60,
    behavior: 'smooth'
  });
}
/* ===== 🌈 Dynamic Color Page Transition ===== */
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const overlay = document.getElementById('transition-overlay');

  // Define section colors
  const sectionColors = {
    home: 'linear-gradient(120deg, #00c6ff, #0072ff)',
    about: 'linear-gradient(120deg, #ff9a9e, #fad0c4)',
    projects: 'linear-gradient(120deg, #ff00cc, #333399)',
    skills: 'linear-gradient(120deg, #00ffc6, #0072ff)',
    contact: 'linear-gradient(120deg, #ff6a00, #ee0979)'
  };

  // Apply matching color
  overlay.style.background = sectionColors[id] || 'linear-gradient(120deg, #00c6ff, #ff00cc)';

  // Trigger the animation
  overlay.classList.add('active');

  // Scroll and fade
  setTimeout(() => {
    window.scrollTo({
      top: target.offsetTop - 60,
      behavior: 'smooth'
    });
  }, 300);

  // Overlay exit animation
  setTimeout(() => {
    overlay.classList.add('fade-out');
    overlay.classList.remove('active');
  }, 700);

  // Reset classes
  setTimeout(() => {
    overlay.classList.remove('fade-out');
  }, 1300);
}
