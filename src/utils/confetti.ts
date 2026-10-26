/**
 * Lightweight, zero-dependency confetti cannon
 */
export function fireConfetti(options?: { particleCount?: number; spread?: number }) {
  if (typeof window === 'undefined') return;

  const count = options?.particleCount || 60;
  const colors = ['#EF4444', '#F97316', '#FBBF24', '#22C55E', '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899'];

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    document.body.removeChild(canvas);
    return;
  }

  const particles = Array.from({ length: count }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 100,
    y: canvas.height * 0.5 + (Math.random() - 0.5) * 50,
    w: 8 + Math.random() * 8,
    h: 6 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 16,
    vy: -6 - Math.random() * 12,
    gravity: 0.35 + Math.random() * 0.15,
    rot: Math.random() * 360,
    vrot: (Math.random() - 0.5) * 12,
    opacity: 1
  }));

  let start: number | null = null;
  const duration = 2200;

  function render(now: number) {
    if (!start) start = now;
    const elapsed = now - start;
    if (elapsed > duration) {
      if (canvas.parentNode) {
        document.body.removeChild(canvas);
      }
      return;
    }

    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rot += p.vrot;
      p.opacity = Math.max(0, 1 - elapsed / duration);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
