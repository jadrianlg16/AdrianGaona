"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERTEX = /* glsl */ `
  uniform float uTime;
  attribute float aRand;
  varying float vElev;
  varying float vRand;

  void main() {
    vec3 pos = position;
    float t = uTime * 0.55;

    float elev = sin(pos.x * 0.32 + t) * sin(pos.y * 0.24 + t * 0.8) * 1.4;
    elev += sin(pos.x * 0.07 - t * 0.45) * 2.4;
    elev += sin(pos.y * 0.05 + t * 0.3) * 1.2;
    pos.z += elev;

    vElev = elev;
    vRand = aRand;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (1.1 + aRand * 1.6) * (130.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vElev;
  varying float vRand;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.1, d);

    // mostly bone particles, a scattered minority in sea green
    vec3 color = mix(uColorA, uColorB, step(0.93, vRand));
    float alpha = soft * (0.25 + smoothstep(-2.0, 3.5, vElev) * 0.55);

    gl_FragColor = vec4(color, alpha);
  }
`;

/**
 * Fullscreen background: a flowing particle terrain ("data field").
 * Pure three.js, no react-three-fiber — built once, disposed on unmount.
 */
export function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;
    const constrained =
      coarsePointer ||
      window.innerWidth < 768 ||
      navigator.hardwareConcurrency <= 4 ||
      (deviceMemory !== undefined && deviceMemory <= 4);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      120
    );
    camera.position.set(0, 4, 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !constrained,
      alpha: true,
      powerPreference: constrained ? "low-power" : "high-performance",
    });
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, constrained ? 1.25 : 1.75)
    );
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Keep the same shape with roughly one third of the desktop particles on
    // phones and lower-power devices.
    const geometry = new THREE.PlaneGeometry(
      70,
      44,
      constrained ? 86 : 150,
      constrained ? 52 : 90
    );
    const count = geometry.attributes.position.count;
    const rand = new Float32Array(count);
    for (let i = 0; i < count; i++) rand[i] = Math.random();
    geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));

    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#4fd1b5";
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color("#e9e7e2") },
        uColorB: { value: new THREE.Color(accent) },
      },
    });

    const points = new THREE.Points(geometry, material);
    points.rotation.x = -Math.PI / 2.6;
    points.position.y = -3;
    scene.add(points);

    // mouse parallax (eased toward target each frame)
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!coarsePointer) window.addEventListener("mousemove", onMouse);

    // pause rendering when scrolled out of view
    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(mount);

    let frame = 0;
    let lastRender = 0;
    const startedAt = performance.now();
    const minFrameTime = constrained ? 1000 / 30 : 0;

    const render = (elapsed: number) => {
      material.uniforms.uTime.value = elapsed;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      points.rotation.z = mouse.x * 0.06;
      camera.position.y = 4 - mouse.y * 0.7;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!visible || document.hidden || now - lastRender < minFrameTime) return;
      lastRender = now;
      render((now - startedAt) / 1000);
    };

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      if (reduced) render(10);
    };
    window.addEventListener("resize", onResize);

    if (reduced) render(10);
    else frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      if (!coarsePointer) window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 opacity-50 sm:opacity-65 md:opacity-90 lg:opacity-100"
      aria-hidden
    />
  );
}
