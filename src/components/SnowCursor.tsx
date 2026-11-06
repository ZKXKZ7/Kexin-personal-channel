import { useEffect, useRef } from 'react';

type Crystal = {
  x: number; y: number; vx: number; vy: number;
  age: number; life: number; size: number; angle: number; spin: number;
  crystal: boolean;
};
type Wisp = {
  x: number; y: number; vx: number; vy: number;
  age: number; life: number; radius: number; phase: number;
};

/** A movement-only frost wake; no React renders in the animation loop. */
export function SnowCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
    let crystals: Crystal[] = [];
    let wisps: Wisp[] = [];
    let previous: { x: number; y: number; time: number } | null = null;
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let distanceCarry = 0;
    const enabled = () => !motion.matches && pointer.matches && !document.hidden;

    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = null;
      distanceCarry = 0;
      crystals = [];
      wisps = [];
      ctx.clearRect(0, 0, width, height);
    };
    const resize = () => {
      clear();
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.04);
      lastTime = time;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
      wisps = wisps.filter(w => w.age < w.life);
      for (const w of wisps) {
        w.age += dt;
        const progress = Math.min(w.age / w.life, 1);
        w.vx *= Math.exp(-2.2 * dt);
        w.vy *= Math.exp(-2.2 * dt);
        w.x += (w.vx + Math.sin(w.phase + w.age * 2.8) * 9) * dt;
        w.y += (w.vy - 7) * dt;
        const radius = w.radius * (0.7 + progress * 1.5);
        const alpha = Math.sin(Math.PI * progress) * 0.038;
        const haze = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, radius);
        haze.addColorStop(0, `rgba(186,230,253,${alpha})`);
        haze.addColorStop(0.35, `rgba(125,211,252,${alpha * 0.65})`);
        haze.addColorStop(1, 'rgba(56,189,248,0)');
        ctx.fillStyle = haze;
        ctx.fillRect(w.x - radius, w.y - radius, radius * 2, radius * 2);
      }
      crystals = crystals.filter(p => p.age < p.life);
      for (const p of crystals) {
        p.age += dt;
        const progress = Math.min(p.age / p.life, 1);
        p.vx *= Math.exp(-2.8 * dt);
        p.vy *= Math.exp(-1.8 * dt);
        p.x += (p.vx + Math.sin(p.angle + p.age * 2) * 5) * dt;
        p.y += (p.vy + 12 * progress) * dt;
        p.angle += p.spin * dt;
        const fade = Math.min(p.age / 0.08, 1) * Math.pow(1 - progress, 1.6);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = fade * (p.crystal ? 0.65 : 0.5);
        ctx.strokeStyle = '#e0f2fe';
        ctx.fillStyle = '#bae6fd';
        if (p.crystal) {
          ctx.lineWidth = 0.65;
          ctx.beginPath();
          for (let arm = 0; arm < 6; arm++) {
            const a = arm * Math.PI / 3;
            const x = Math.cos(a), y = Math.sin(a);
            ctx.moveTo(0, 0);
            ctx.lineTo(x * p.size, y * p.size);
            for (const side of [-1, 1]) {
              ctx.moveTo(x * p.size * 0.58, y * p.size * 0.58);
              ctx.lineTo(x * p.size * 0.38 - y * side * p.size * 0.23,
                y * p.size * 0.38 + x * side * p.size * 0.23);
            }
          }
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (crystals.length || wisps.length) frame = requestAnimationFrame(draw);
      else frame = 0;
    };

    const move = (event: PointerEvent) => {
      if (!enabled() || event.pointerType !== 'mouse') return;
      const now = performance.now();
      const next = { x: event.clientX, y: event.clientY, time: now };
      if (!previous || now - previous.time > 150) {
        previous = next;
        distanceCarry = 0;
        return;
      }
      const dx = next.x - previous.x, dy = next.y - previous.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 0.5) return;
      const speed = Math.min(distance / Math.max(now - previous.time, 8), 2.5);
      const nx = dx / distance, ny = dy / distance;
      // Distance-based emission keeps density consistent across input refresh rates.
      const spacing = 9;
      const total = distance + distanceCarry;
      const count = Math.min(Math.floor(total / spacing), 24);
      for (let i = 0; i < count; i++) {
        const t = Math.min((spacing - distanceCarry + i * spacing) / distance, 1);
        const x = previous.x + dx * t, y = previous.y + dy * t;
        const side = (Math.random() - 0.5) * (14 + speed * 10);
        wisps.push({ x: x - ny * side, y: y + nx * side,
          vx: nx * speed * 16 - ny * side, vy: ny * speed * 16 + nx * side,
          age: 0, life: 0.8 + Math.random() * 0.55,
          radius: 18 + speed * 8 + Math.random() * 10, phase: Math.random() * Math.PI * 2 });
        crystals.push({ x, y, vx: nx * speed * 18 - ny * side * 2,
          vy: ny * speed * 18 + nx * side * 2, age: 0,
          life: 0.65 + Math.random() * 0.8,
          size: Math.random() < 0.18 ? 2.8 + Math.random() * 1.6 : 0.6 + Math.random(),
          angle: Math.random() * Math.PI, spin: (Math.random() - 0.5) * 1.4,
          crystal: false });
        const p = crystals[crystals.length - 1];
        p.crystal = p.size > 2;
      }
      distanceCarry = total % spacing;
      previous = next;
      crystals = crystals.slice(-120);
      wisps = wisps.slice(-100);
      if (!frame && (crystals.length || wisps.length)) {
        lastTime = now;
        frame = requestAnimationFrame(draw);
      }
    };
    const leave = () => { previous = null; distanceCarry = 0; };
    const out = (event: PointerEvent) => { if (!event.relatedTarget) leave(); };
    resize();
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerout', out);
    window.addEventListener('blur', clear);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', leave, { passive: true });
    document.addEventListener('visibilitychange', clear);
    motion.addEventListener('change', clear);
    pointer.addEventListener('change', clear);
    return () => {
      clear();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerout', out);
      window.removeEventListener('blur', clear);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', leave);
      document.removeEventListener('visibilitychange', clear);
      motion.removeEventListener('change', clear);
      pointer.removeEventListener('change', clear);
    };
  }, []);

  return <canvas ref={canvasRef} className="snow-cursor" aria-hidden="true" />;
}
