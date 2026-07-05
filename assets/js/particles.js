const canvas = document.querySelector("#particleCanvas");
const ctx = canvas.getContext("2d");
const particles = [];
let width = 0;
let height = 0;
let ratio = 1;

const resize = () => {
  ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
};

const createParticles = () => {
  particles.length = 0;
  const count = Math.min(88, Math.floor((width * height) / 18000));
  for (let i = 0; i < count; i += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.8 + 0.8
    });
  }
};

const draw = () => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(56, 189, 248, 0.62)";
  ctx.strokeStyle = "rgba(56, 189, 248, 0.14)";

  particles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    for (let j = index + 1; j < particles.length; j += 1) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 130) {
        ctx.globalAlpha = 1 - distance / 130;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  });

  requestAnimationFrame(draw);
};

window.addEventListener("resize", () => {
  resize();
  createParticles();
});

resize();
createParticles();
draw();
