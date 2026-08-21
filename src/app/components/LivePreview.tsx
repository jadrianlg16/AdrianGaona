"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Live, scaled-down iframe of a real embedded app (public/demos/<id>/).
 * Renders the app at its natural size and CSS-scales it to cover the
 * container — the miniature is genuinely running, not a screenshot.
 * Mounts lazily once the card approaches the viewport; pointer events are
 * disabled so the full interaction happens in the launch overlay.
 */
export function LivePreview({
  src,
  width = 1280,
  height = 800,
  title,
}: {
  src: string;
  width?: number;
  height?: number;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      // "contain", not "cover". Cover filled the card but cropped a 1280px app
      // into a ~674px window, so roughly half its width was outside the frame —
      // a fragment, when the whole point of the card is "this is a real app".
      // Letterboxing against the card ground is the cheaper price.
      setScale(Math.min(rect.width / width, rect.height / height));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [width, height]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-ink">
      {mounted && scale > 0 && (
        <iframe
          src={src}
          title={`${title} — live preview`}
          aria-hidden
          tabIndex={-1}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          className="pointer-events-none absolute left-1/2 top-1/2 select-none border-0"
          style={{
            width,
            height,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        />
      )}
    </div>
  );
}
