"use client";

import { useEffect, useRef } from "react";

type NavigatorWithHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

type SnowParticle = {
  x: number;
  y: number;
  depth: number;
  phase: number;
  speed: number;
  lifted: boolean;
};

export function BlizzardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const navigatorWithHints = navigator as NavigatorWithHints;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const constrained =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768 ||
      navigator.hardwareConcurrency <= 4 ||
      (navigatorWithHints.deviceMemory !== undefined &&
        navigatorWithHints.deviceMemory <= 4) ||
      navigatorWithHints.connection?.saveData === true;

    const targetFps = constrained ? 30 : 45;
    const particleCount = constrained ? 850 : 1900;
    const particles: SnowParticle[] = [];
    let width = 1;
    let height = 1;
    let frame = 0;
    let lastFrame = 0;
    let startedAt = 0;

    canvas.dataset.blizzardState = reducedMotion ? "still" : "active";
    canvas.dataset.blizzardFps = String(reducedMotion ? 0 : targetFps);
    canvas.dataset.blizzardParticles = String(
      reducedMotion ? 0 : particleCount
    );

    const createParticle = (fromLeft = false): SnowParticle => ({
      x: fromLeft ? -Math.random() * width * 0.28 : Math.random() * width,
      y: Math.random() * height,
      depth: Math.pow(Math.random(), 1.18),
      phase: Math.random() * Math.PI * 2,
      speed: 0.72 + Math.random() * 0.58,
      lifted: Math.random() < 0.34,
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        constrained ? 1 : 1.25
      );
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      particles.length = 0;
      if (reducedMotion) return;
      for (let index = 0; index < particleCount; index += 1) {
        particles.push(createParticle());
      }
    };

    const draw = (now: number) => {
      const elapsed = now - startedAt;
      const delta = Math.min((now - lastFrame) / 1000, 0.045);
      lastFrame = now;
      context.clearRect(0, 0, width, height);

      const sweep = Math.min(elapsed / 2500, 1);
      const centerX = width * (-0.18 + sweep * 1.34);
      const centerY = height * (0.48 + Math.sin(elapsed * 0.0017) * 0.08);
      const gustRadius = Math.min(width, height) * 0.52;
      const wind = constrained ? 330 : 440;
      const curl = constrained ? 430 : 590;

      const far: SnowParticle[] = [];
      const middle: Array<[SnowParticle, number, number]> = [];
      const near: Array<[SnowParticle, number, number]> = [];

      for (const particle of particles) {
        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const influence = Math.max(0, 1 - distance / gustRadius);
        const turbulence = influence * influence * curl * (0.35 + particle.depth);
        const surfaceLift = particle.lifted
          ? Math.max(0, (particle.y / height - 0.46) * 170)
          : 0;

        const velocityX =
          wind * particle.speed * (0.72 + particle.depth * 1.24) +
          (-dy / distance) * turbulence;
        const velocityY =
          34 +
          particle.depth * 78 +
          Math.sin(elapsed * 0.003 + particle.phase) * (18 + particle.depth * 32) +
          (dx / distance) * turbulence * 0.72 -
          surfaceLift;

        particle.x += velocityX * delta;
        particle.y += velocityY * delta;

        if (
          particle.x > width + 90 ||
          particle.y > height + 80 ||
          particle.y < -90
        ) {
          Object.assign(particle, createParticle(true));
        }

        if (particle.depth < 0.3) far.push(particle);
        else if (particle.depth < 0.72)
          middle.push([particle, velocityX, velocityY]);
        else near.push([particle, velocityX, velocityY]);
      }

      context.fillStyle = "rgba(238, 245, 245, 0.52)";
      context.beginPath();
      for (const particle of far) {
        const radius = 0.45 + particle.depth * 1.4;
        context.moveTo(particle.x + radius, particle.y);
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
      }
      context.fill();

      const strokeParticles = (
        group: Array<[SnowParticle, number, number]>,
        color: string,
        lineWidth: number,
        lengthMultiplier: number
      ) => {
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.lineCap = "round";
        context.beginPath();
        for (const [particle, velocityX, velocityY] of group) {
          const velocity = Math.max(1, Math.hypot(velocityX, velocityY));
          const streak = (4 + particle.depth * 17) * lengthMultiplier;
          context.moveTo(particle.x, particle.y);
          context.lineTo(
            particle.x - (velocityX / velocity) * streak,
            particle.y - (velocityY / velocity) * streak
          );
        }
        context.stroke();
      };

      strokeParticles(
        middle,
        "rgba(239, 247, 247, 0.66)",
        constrained ? 1 : 1.2,
        0.8
      );
      strokeParticles(
        near,
        "rgba(252, 254, 254, 0.88)",
        constrained ? 1.7 : 2.15,
        1.15
      );
    };

    const tick = (now: number) => {
      frame = window.requestAnimationFrame(tick);
      if (
        document.hidden ||
        now - lastFrame < 1000 / targetFps
      )
        return;
      draw(now);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reducedMotion) {
      startedAt = performance.now();
      lastFrame = startedAt;
      frame = window.requestAnimationFrame(tick);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="whiteout-intro__canvas absolute inset-0"
      aria-hidden
    />
  );
}
