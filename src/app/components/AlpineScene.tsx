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
      const frameDuration = constrained ? 1000 / 30 : 1000 / 45;
      const tick = (now: number) => {
        animationFrame = requestAnimationFrame(tick);
        if (
          !loadedRef.current ||
          !visible ||
          document.hidden ||
          now - lastRender < frameDuration
        )
          return;
        lastRender = now;
        render((now - startedAt) / 1000);
      };

      const onResize = () => {
        if (!renderer || !material) return;
        renderer.setSize(mount.clientWidth, mount.clientHeight, false);
        material.uniforms.uAspect.value = mount.clientWidth / mount.clientHeight;
        if (reducedMotion) render(8);
      };
      window.addEventListener("resize", onResize);

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
