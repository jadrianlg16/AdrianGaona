"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { useApp } from "./AppProvider";
import { getLenis } from "./SmoothScroll";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Principles", href: "#principles" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { loaded } = useApp();
  const rootRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");

  // local time, Monterrey
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/Monterrey",
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      if (!loaded) return;
      gsap.from(rootRef.current, {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      });
    },
    { scope: rootRef, dependencies: [loaded] }
  );

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(href, { offset: 0, duration: 1.6 });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={rootRef}
      className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-ink/90 to-transparent"
    >
      <nav className="flex items-center justify-between px-6 py-5 md:px-12">
        <a
          href="#top"
          onClick={(e) => scrollTo(e, "#top")}
          className="inline-flex min-h-11 items-center font-display text-lg font-bold uppercase tracking-tight"
        >
          AG<span className="text-accent">©</span>
        </a>

        <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="nav-link relative transition-opacity hover:opacity-60"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest">
          <span className="hidden text-bone/60 md:inline">MTY {time}</span>
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            className="inline-flex min-h-11 items-center md:hidden"
          >
            Contact ↓
          </a>
        </div>
      </nav>
    </header>
  );
}
