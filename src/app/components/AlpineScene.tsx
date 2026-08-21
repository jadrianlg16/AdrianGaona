"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useApp } from "./AppProvider";

type NavigatorWithHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

const SNOW_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uAspect;
  uniform float uPixelRatio;
  uniform vec2 uPointer;
  uniform vec2 uPointerVelocity;

  attribute float aDepth;
  attribute float aSeed;
  attribute float aSize;
  attribute float aSpeed;

  varying float vAlpha;
  varying float vDepth;

  void main() {
    vec3 pos = position;
    float fall = mod((pos.y + 1.15) - uTime * (0.09 + aSpeed * 0.17), 2.3) - 1.15;
    float wind = sin(uTime * (0.32 + aDepth * 0.34) + aSeed * 18.0) * 0.045;
    wind += sin(uTime * 0.12 + pos.y * 4.0 + aSeed * 7.0) * 0.025;
    pos.y = fall;
    pos.x += wind * (0.35 + aDepth);

    vec2 delta = vec2((pos.x - uPointer.x) * uAspect, pos.y - uPointer.y);
    float distanceFromPointer = length(delta);
    float gust = smoothstep(0.42, 0.0, distanceFromPointer);
    vec2 direction = distanceFromPointer > 0.001 ? delta / distanceFromPointer : vec2(0.0);
    pos.x += direction.x * gust * (0.035 + aDepth * 0.055) / uAspect;
    pos.y += direction.y * gust * (0.035 + aDepth * 0.055);
    pos.xy += uPointerVelocity * gust * (0.018 + aDepth * 0.045);

    gl_Position = vec4(pos, 1.0);
    gl_PointSize = aSize * mix(0.65, 1.7, aDepth) * uPixelRatio;
    vAlpha = mix(0.2, 0.86, aDepth);
    vDepth = aDepth;
  }
`;

const SNOW_FRAGMENT = /* glsl */ `
  varying float vAlpha;
  varying float vDepth;

  void main() {
    vec2 point = gl_PointCoord - 0.5;
    float distanceFromCenter = length(point);
    if (distanceFromCenter > 0.5) discard;
    float softness = smoothstep(0.5, 0.08, distanceFromCenter);
    vec3 snow = mix(vec3(0.64, 0.76, 0.8), vec3(0.96, 0.98, 0.98), vDepth);
    gl_FragColor = vec4(snow, softness * vAlpha);
  }
`;

export function AlpineScene() {
  const { loaded, setSceneReady } = useApp();
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const loadedRef = useRef(loaded);
  const [imageReady, setImageReady] = useState(false);
  const [rendererReady, setRendererReady] = useState(false);

  useEffect(() => {
    setSceneReady(imageReady && rendererReady);
  }, [imageReady, rendererReady, setSceneReady]);

  useEffect(() => {
    loadedRef.current = loaded;
  }, [loaded]);

  useEffect(() => {
    const root = rootRef.current;
    const mount = canvasRef.current;
    if (!root || !mount) return;

    const navigatorWithHints = navigator as NavigatorWithHints;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const constrained =
      coarsePointer ||
      window.innerWidth < 768 ||
      navigator.hardwareConcurrency <= 4 ||
      (navigatorWithHints.deviceMemory !== undefined &&
        navigatorWithHints.deviceMemory <= 4) ||
      navigatorWithHints.connection?.saveData === true;

    let renderer: THREE.WebGLRenderer | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let animationFrame = 0;
    let observer: IntersectionObserver | null = null;
    let visible = true;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: constrained ? "low-power" : "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, constrained ? 1.15 : 1.5)
      );
      renderer.setSize(mount.clientWidth, mount.clientHeight, false);
      renderer.domElement.dataset.snowState = reducedMotion ? "still" : "active";
      renderer.domElement.dataset.snowFps = reducedMotion
        ? "0"
        : constrained
          ? "30"
          : "45";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.Camera();
      const particleCount = constrained ? 1100 : 2800;
      geometry = new THREE.BufferGeometry();

      const positions = new Float32Array(particleCount * 3);
      const depths = new Float32Array(particleCount);
      const seeds = new Float32Array(particleCount);
      const sizes = new Float32Array(particleCount);
      const speeds = new Float32Array(particleCount);

      for (let index = 0; index < particleCount; index += 1) {
        const offset = index * 3;
        const depth = Math.pow(Math.random(), 1.45);
        positions[offset] = Math.random() * 2.4 - 1.2;
        positions[offset + 1] = Math.random() * 2.3 - 1.15;
        positions[offset + 2] = 0;
        depths[index] = depth;
        seeds[index] = Math.random();
        sizes[index] = 1.2 + Math.random() * 3.2;
        speeds[index] = 0.35 + Math.random() * 0.9;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aDepth", new THREE.BufferAttribute(depths, 1));
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
      geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));

      material = new THREE.ShaderMaterial({
        vertexShader: SNOW_VERTEX,
        fragmentShader: SNOW_FRAGMENT,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uAspect: { value: mount.clientWidth / mount.clientHeight },
          uPixelRatio: { value: renderer.getPixelRatio() },
          uPointer: { value: new THREE.Vector2(2, 2) },
          uPointerVelocity: { value: new THREE.Vector2(0, 0) },
        },
      });

      const snow = new THREE.Points(geometry, material);
      scene.add(snow);
      renderer.domElement.dataset.snowParticles = String(particleCount);

      const pointer = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        velocityX: 0,
        velocityY: 0,
        lastX: 0,
        lastY: 0,
        hasMoved: false,
      };

      const onPointerMove = (event: PointerEvent) => {
        const bounds = root.getBoundingClientRect();
        const clamp = (value: number) => Math.min(1, Math.max(-1, value));
        pointer.targetX = clamp(
          ((event.clientX - bounds.left) / bounds.width) * 2 - 1
        );
        pointer.targetY = clamp(
          -(((event.clientY - bounds.top) / bounds.height) * 2 - 1)
        );
        pointer.velocityX = pointer.targetX - pointer.lastX;
        pointer.velocityY = pointer.targetY - pointer.lastY;
        pointer.lastX = pointer.targetX;
        pointer.lastY = pointer.targetY;
        pointer.hasMoved = true;
      };

      if (!coarsePointer) window.addEventListener("pointermove", onPointerMove);

      const render = (elapsed: number) => {
        if (!renderer || !material) return;
        pointer.x += (pointer.targetX - pointer.x) * 0.075;
        pointer.y += (pointer.targetY - pointer.y) * 0.075;
        pointer.velocityX *= 0.9;
        pointer.velocityY *= 0.9;
        material.uniforms.uTime.value = elapsed;
        material.uniforms.uPointer.value.set(
          pointer.hasMoved ? pointer.x : 2,
          pointer.hasMoved ? pointer.y : 2
        );
        material.uniforms.uPointerVelocity.value.set(
          pointer.velocityX,
          pointer.velocityY
        );

        if (imageRef.current && !coarsePointer && !reducedMotion) {
          imageRef.current.style.transform = `translate3d(${pointer.x * -8}px, ${pointer.y * 5}px, 0) scale(1.055)`;
        }

        renderer.render(scene, camera);
      };

      let lastRender = 0;
      const startedAt = performance.now();
      const targetFps = constrained ? 30 : 45;
      let frameDuration = 1000 / targetFps;

      /**
       * The tier check above reads pointer type, viewport, core count and RAM —
       * none of which describe the GPU. A budget laptop reporting eight threads
       * and 8 GB still renders like a phone, and on Firefox and Safari both
       * deviceMemory and connection are undefined, so two of those five signals
       * never fire at all.
       *
       * So after the scene is actually running, sample the frame rate we manage
       * to hit and compare it against an absolute smoothness floor.
       *
       * The floor is absolute on purpose. Comparing against targetFps would
       * misfire on healthy hardware: rAF is quantised to the display, so a
       * 60Hz screen asked for 45fps renders every second callback and lands on
       * exactly 30 — perfectly smooth, and 33% "under target". Below ~24fps is
       * where motion actually starts reading as broken, on any display rate.
       */
      const SMOOTHNESS_FLOOR_FPS = 24;
      let probeStartedAt = 0;
      let probeFrames = 0;
      let probeDone = constrained;

      const dropTier = () => {
        if (!renderer || !geometry || !material) return;
        frameDuration = 1000 / 30;
        // Buffers stay as they are; drawing fewer of them costs nothing to
        // change and avoids rebuilding geometry mid-flight.
        geometry.setDrawRange(0, Math.round(particleCount * 0.4));
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.15));
        renderer.setSize(mount.clientWidth, mount.clientHeight, false);
        material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
        renderer.domElement.dataset.snowTier = "degraded";
        renderer.domElement.dataset.snowFps = "30";
      };

      const tick = (now: number) => {
        animationFrame = requestAnimationFrame(tick);
        if (
          !loadedRef.current ||
          !visible ||
          document.hidden ||
          now - lastRender < frameDuration
        )
          return;
        const gap = now - lastRender;
        lastRender = now;
        render((now - startedAt) / 1000);

        if (probeDone) return;
        // Restart the window on the first frame (which carries shader
        // compilation and would condemn a healthy GPU) and after any long gap,
        // since a backgrounded tab or a main thread blocked by something else
        // says nothing about how fast this machine can draw.
        if (probeStartedAt === 0 || gap > frameDuration * 4) {
          probeStartedAt = now;
          probeFrames = 0;
          return;
        }
        probeFrames += 1;
        const sampled = now - probeStartedAt;
        if (sampled < 2000) return;
        probeDone = true;
        if ((probeFrames / sampled) * 1000 < SMOOTHNESS_FLOOR_FPS) dropTier();
      };

      const onResize = () => {
        if (!renderer || !material) return;
        renderer.setSize(mount.clientWidth, mount.clientHeight, false);
        material.uniforms.uAspect.value = mount.clientWidth / mount.clientHeight;
        if (reducedMotion) render(8);
      };
      window.addEventListener("resize", onResize);

      /**
       * Safari reclaims WebGL contexts from backgrounded tabs when the device
       * is under memory pressure — most likely on an older iPhone with a lot of
       * tabs open. The try/catch around initialisation only covers a context
       * that never existed; one lost *after* a successful start would leave the
       * canvas frozen on its last frame with no route back.
       *
       * preventDefault() is what makes the context eligible for restoration.
       * Until that happens the static hero underneath is a complete image on
       * its own, so falling back to it costs the visitor nothing.
       */
      const onContextLost = (event: Event) => {
        event.preventDefault();
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        root.dataset.snowFallback = "true";
      };

      const onContextRestored = () => {
        if (!renderer || !material) return;
        delete root.dataset.snowFallback;
        renderer.setSize(mount.clientWidth, mount.clientHeight, false);
        material.uniforms.uAspect.value = mount.clientWidth / mount.clientHeight;
        if (reducedMotion) render(8);
        else animationFrame = requestAnimationFrame(tick);
      };

      renderer.domElement.addEventListener("webglcontextlost", onContextLost);
      renderer.domElement.addEventListener(
        "webglcontextrestored",
        onContextRestored
      );

      observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      observer.observe(root);

      if (reducedMotion) render(8);
      else animationFrame = requestAnimationFrame(tick);
      setRendererReady(true);

      return () => {
        cancelAnimationFrame(animationFrame);
        observer?.disconnect();
        window.removeEventListener("resize", onResize);
        renderer?.domElement.removeEventListener(
          "webglcontextlost",
          onContextLost
        );
        renderer?.domElement.removeEventListener(
          "webglcontextrestored",
          onContextRestored
        );
        if (!coarsePointer) window.removeEventListener("pointermove", onPointerMove);
        geometry?.dispose();
        material?.dispose();
        renderer?.dispose();
        renderer?.domElement.remove();
      };
    } catch {
      root.dataset.snowFallback = "true";
      setRendererReady(true);
    }
  }, []);

  return (
    <div ref={rootRef} className="alpine-scene absolute inset-0" aria-hidden>
      <Image
        ref={imageRef}
        src="/images/alpine-penguin-hero-v2.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={88}
        onLoad={() => setImageReady(true)}
        onError={() => setImageReady(true)}
        className="alpine-scene__image object-cover"
      />
      <div className="alpine-scene__haze absolute inset-0" />
      <div ref={canvasRef} className="alpine-scene__snow absolute inset-0" />
      <div className="alpine-scene__spindrift absolute inset-x-0 bottom-0 h-1/3" />
    </div>
  );
}
