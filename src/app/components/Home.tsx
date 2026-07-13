import { useEffect, useRef } from 'react';

interface FloatingCircle {
  el: HTMLDivElement;
  x: number;
  y: number;
  r: number;
  tone: number;
  cooldown: number;
}

interface TrailDot {
  el: HTMLSpanElement;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const circleSizes = [54, 72, 92, 118, 148, 184, 232, 286];
const circleCount = 30;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomInt(min: number, max: number) {
  return Math.floor(randomBetween(min, max + 1));
}

export default function Home() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;

    if (!section || !wrap) {
      return undefined;
    }

    const circles: FloatingCircle[] = [];
    const trailDots: TrailDot[] = [];
    const mouse = { x: -9999, y: -9999, active: false, lastMoveAt: 0 };
    let animationFrame = 0;
    let width = 0;
    let height = 0;

    function measure() {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
    }

    function createCircle(index: number) {
      const size = circleSizes[Math.floor(Math.random() * circleSizes.length)];
      const margin = size * 0.34;
      const tone = randomInt(12, 238);
      const opacity = randomBetween(0.22, 0.58);
      const blur = randomBetween(0, 1.8);
      const x = randomBetween(-margin, width + margin);
      const y = randomBetween(-margin, height + margin);
      const el = document.createElement('div');

      el.className = 'home-circle';
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${x - size / 2}px`;
      el.style.top = `${y - size / 2}px`;
      el.style.zIndex = String(index);
      el.style.setProperty('--circle-fill', `rgb(${tone}, ${tone}, ${tone})`);
      el.style.setProperty('--circle-opacity', opacity.toFixed(2));
      el.style.setProperty('--circle-blur', `${blur.toFixed(2)}px`);
      el.style.setProperty('--float-x', `${randomBetween(-22, 22).toFixed(2)}px`);
      el.style.setProperty('--float-y', `${randomBetween(-18, 18).toFixed(2)}px`);
      el.style.setProperty('--float-duration', `${randomBetween(3.4, 6.0).toFixed(2)}s`);
      el.style.setProperty('--float-delay', `${randomBetween(-7, 0).toFixed(2)}s`);

      wrap.appendChild(el);

      circles.push({
        el,
        x,
        y,
        r: size / 2,
        tone,
        cooldown: 0,
      });
    }

    function createTrailDots() {
      for (let i = 0; i < 12; i += 1) {
        const size = randomBetween(4, 13) * (1 - i * 0.035);
        const dot = document.createElement('span');
        const tone = randomInt(16, 92);

        dot.className = 'mouse-ink-dot';
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.setProperty('--dot-tone', `rgb(${tone}, ${tone}, ${tone})`);
        dot.style.zIndex = String(80 + i);
        wrap.appendChild(dot);

        trailDots.push({
          el: dot,
          x: mouse.x,
          y: mouse.y,
          size,
          opacity: 0,
        });
      }
    }

    function resetCircles() {
      circles.forEach((circle) => circle.el.parentNode?.removeChild(circle.el));
      circles.length = 0;
      measure();

      for (let i = 0; i < circleCount; i += 1) {
        createCircle(i);
      }
    }

    function triggerCircle(circle: FloatingCircle) {
      circle.cooldown = 42;
      circle.el.classList.remove('is-popping');
      void circle.el.offsetWidth;
      circle.el.classList.add('is-popping');
      spawnInkBurst(circle);
    }

    function spawnInkBurst(circle: FloatingCircle) {
      const rect = circle.el.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      const cx = rect.left - wrapRect.left + rect.width / 2;
      const cy = rect.top - wrapRect.top + rect.height / 2;
      const burstCount = randomInt(7, 13);

      for (let i = 0; i < burstCount; i += 1) {
        const dot = document.createElement('span');
        const angle = randomBetween(0, Math.PI * 2);
        const startDistance = circle.r + randomBetween(4, 14);
        const travelDistance = randomBetween(circle.r * 0.34, circle.r * 0.92);
        const size = randomBetween(3, Math.max(5, circle.r * 0.1));
        const tone = Math.min(255, Math.max(0, Math.round(circle.tone + randomBetween(-18, 18))));

        dot.className = 'ink-burst-dot';
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${cx + Math.cos(angle) * startDistance - size / 2}px`;
        dot.style.top = `${cy + Math.sin(angle) * startDistance - size / 2}px`;
        dot.style.setProperty('--burst-x', `${Math.cos(angle) * travelDistance}px`);
        dot.style.setProperty('--burst-y', `${Math.sin(angle) * travelDistance}px`);
        dot.style.setProperty('--burst-tone', `rgb(${tone}, ${tone}, ${tone})`);
        dot.style.setProperty('--burst-delay', `${randomBetween(0, 60).toFixed(0)}ms`);

        wrap.appendChild(dot);
        window.setTimeout(() => dot.parentNode?.removeChild(dot), 760);
      }
    }

    function animate() {
      animationFrame = requestAnimationFrame(animate);
      const now = performance.now();
      const mouseRecentlyMoved = mouse.active && now - mouse.lastMoveAt < 220;

      trailDots.forEach((dot, index) => {
        const target = index === 0 ? mouse : trailDots[index - 1];
        const lag = 0.24 - Math.min(index * 0.012, 0.12);
        const driftX = Math.sin(now * 0.003 + index) * 1.8;
        const driftY = Math.cos(now * 0.0026 + index) * 1.4;

        dot.x += (target.x + driftX - dot.x) * lag;
        dot.y += (target.y + driftY - dot.y) * lag;
        dot.opacity += ((mouseRecentlyMoved ? 0.68 - index * 0.045 : 0) - dot.opacity) * 0.08;
        dot.el.style.opacity = Math.max(0, dot.opacity).toFixed(3);
        dot.el.style.transform = `translate3d(${dot.x - dot.size / 2}px, ${dot.y - dot.size / 2}px, 0)`;
      });

      circles.forEach((circle) => {
        const rect = circle.el.getBoundingClientRect();
        const wrapRect = wrap.getBoundingClientRect();
        const cx = rect.left - wrapRect.left + rect.width / 2;
        const cy = rect.top - wrapRect.top + rect.height / 2;
        const distance = Math.hypot(mouse.x - cx, mouse.y - cy);
        const influence = Math.max(0, 1 - distance / (rect.width / 2 + 220));

        if (influence > 0) {
          const angle = Math.atan2(mouse.y - cy, mouse.x - cx);
          const pull = influence * Math.min(24, rect.width * 0.08);

          circle.el.style.setProperty('--pull-x', `${Math.cos(angle) * pull}px`);
          circle.el.style.setProperty('--pull-y', `${Math.sin(angle) * pull}px`);
        } else {
          circle.el.style.setProperty('--pull-x', '0px');
          circle.el.style.setProperty('--pull-y', '0px');
        }

        if (circle.cooldown > 0) {
          circle.cooldown -= 1;
          return;
        }

        if (distance <= rect.width / 2 + 6) {
          triggerCircle(circle);
        }
      });
    }

    function handleMouseMove(event: MouseEvent) {
      const rect = wrap.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      if (!mouse.active) {
        trailDots.forEach((dot) => {
          dot.x = mouse.x;
          dot.y = mouse.y;
        });
      }
      mouse.active = true;
      mouse.lastMoveAt = performance.now();
    }

    function handleMouseLeave() {
      mouse.active = false;
    }

    function handleResize() {
      resetCircles();
    }

    resetCircles();
    createTrailDots();
    animate();

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      circles.forEach((circle) => circle.el.parentNode?.removeChild(circle.el));
      trailDots.forEach((dot) => dot.el.parentNode?.removeChild(dot.el));
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-white">
      <div ref={wrapRef} className="absolute inset-0 z-0 overflow-hidden" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-6 pb-20 pt-0 md:pb-28">
        <div className="max-w-2xl">
          <p className="mb-1 text-[0.44rem] uppercase tracking-[0.22em] text-foreground/45 md:text-[0.72rem]">
            Converged Reality and Arts Lab
          </p>
          <h1 className="mb-2 text-2xl leading-none text-foreground md:mb-3 md:text-[3.58rem]">CRA Lab</h1>
          <p className="max-w-none whitespace-nowrap text-[0.56rem] leading-3 text-foreground/68 md:text-[0.88rem] md:leading-5">
            가상현실, 예술, 인터랙션을 융합해 사람의 경험을 확장하는 연구와 콘텐츠를 만듭니다.
          </p>
        </div>
      </div>

      <style>{`
        .home-circle {
          position: absolute;
          border-radius: 9999px;
          background: var(--circle-fill);
          opacity: var(--circle-opacity);
          filter: blur(var(--circle-blur));
          pointer-events: none;
          box-shadow:
            0 18px 60px rgba(0, 0, 0, 0.08),
            inset 0 0 24px rgba(255, 255, 255, 0.14),
            inset 0 0 28px rgba(0, 0, 0, 0.09);
          transform-origin: center;
          transform: translate(var(--pull-x, 0px), var(--pull-y, 0px));
          animation: circleFloat var(--float-duration) ease-in-out var(--float-delay) infinite alternate;
          transition: transform 180ms ease-out;
          will-change: transform;
        }

        .home-circle.is-popping {
          animation:
            circleFloat var(--float-duration) ease-in-out var(--float-delay) infinite alternate,
            elasticPop 720ms cubic-bezier(0.22, 1.42, 0.36, 1);
        }

        .ink-burst-dot {
          position: absolute;
          border-radius: 9999px;
          background: var(--burst-tone);
          pointer-events: none;
          opacity: 0;
          filter: blur(0.2px);
          animation: inkBurst 720ms cubic-bezier(0.12, 0.82, 0.28, 1) var(--burst-delay) forwards;
        }

        .mouse-ink-dot {
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 9999px;
          background: var(--dot-tone);
          pointer-events: none;
          opacity: 0;
          filter: blur(0.45px);
          box-shadow:
            0 0 12px rgba(0, 0, 0, 0.08),
            inset 0 0 6px rgba(255, 255, 255, 0.16);
          will-change: transform, opacity;
        }

        @keyframes circleFloat {
          from {
            translate: 0 0;
          }

          to {
            translate: var(--float-x) var(--float-y);
          }
        }

        @keyframes elasticPop {
          0% {
            scale: 1;
          }

          18% {
            scale: 0.58;
          }

          42% {
            scale: 1.2;
          }

          62% {
            scale: 0.92;
          }

          78% {
            scale: 1.05;
          }

          100% {
            scale: 1;
          }
        }

        @keyframes inkBurst {
          0% {
            opacity: 0;
            scale: 0.3;
            translate: 0 0;
          }

          18% {
            opacity: 0.82;
            scale: 1;
          }

          74% {
            opacity: 0.48;
          }

          100% {
            opacity: 0;
            scale: 0.38;
            translate: var(--burst-x) var(--burst-y);
          }
        }
      `}</style>
    </section>
  );
}
