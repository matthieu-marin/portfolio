export function fireConfetti(): void {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999';
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;
  const css = getComputedStyle(document.documentElement);
  const colors = ['--syntax-keyword', '--syntax-string', '--syntax-function', '--syntax-property']
    .map((v) => css.getPropertyValue(v).trim() || '#888');
  const parts = Array.from({ length: 80 }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 200,
    y: innerHeight * 0.35,
    vx: (Math.random() - 0.5) * 9,
    vy: -Math.random() * 10 - 3,
    size: 4 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * Math.PI,
  }));
  const t0 = performance.now();
  const tick = (t: number) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const q of parts) {
      q.vy += 0.25;
      q.x += q.vx;
      q.y += q.vy;
      q.rot += 0.1;
      ctx.save();
      ctx.translate(q.x, q.y);
      ctx.rotate(q.rot);
      ctx.fillStyle = q.color;
      ctx.fillRect(-q.size / 2, -q.size / 2, q.size, q.size);
      ctx.restore();
    }
    if (t - t0 < 2500) requestAnimationFrame(tick);
    else canvas.remove();
  };
  requestAnimationFrame(tick);
  window.setTimeout(() => {
    if (canvas.isConnected) canvas.remove();
  }, 3000);
}
