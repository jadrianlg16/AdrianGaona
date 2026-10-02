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
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  // The header used to be a top-down gradient that is transparent by the time
  // it reaches the logo's baseline, so anything scrolling under it — a card's
  // index and year on a phone, a heading on desktop — printed straight through
  // "AG©" and "Menu ≡". Over the hero the gradient is right (the photograph
  // should run under the bar); past it, the bar needs a ground of its own.
  // The root is inset by the bar's own height, so the switch happens the
  // moment the hero's bottom edge slides under the bar — before the next
  // section's first line can reach it — rather than a bar-height later.
  useEffect(() => {
    const hero = document.getElementById("top");
    const bar = rootRef.current;
    if (!hero || !bar) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-" + bar.offsetHeight + "px 0px 0px 0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

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
      if (!loaded) {
        gsap.set(rootRef.current, { y: -40, opacity: 0 });
        return;
      }
      gsap.to(rootRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.45,
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

  // bg-origin-border sizes the gradient to the border box. Sized to the padding
  // box (the default), it repeats into the 1px transparent border and draws a
  // dark line across the photograph.
  return (
    <header
      ref={rootRef}
      data-past-hero={pastHero}
      className={`fixed inset-x-0 top-0 z-50 border-b bg-gradient-to-b bg-origin-border from-ink/90 to-transparent transition-[background-color,border-color] duration-300 ${
        pastHero ? "border-line bg-ink/85 backdrop-blur-md" : "border-transparent"
      }`}
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
          {/* The page is roughly sixteen screens tall. On a phone the only
              control used to be "Contact ↓", so every other section could only
              be reached by scrolling the whole way. */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="inline-flex min-h-11 items-center gap-2 tracking-widest md:hidden"
          >
            {menuOpen ? "Close ✕" : "Menu ≡"}
          </button>
        </div>
      </nav>

      {/* Toggled by class, not the `hidden` attribute: a `display: flex` utility
          wins over the UA stylesheet's [hidden] rule, so the menu would never
          have closed. */}
      <ul
        id="mobile-nav"
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col gap-1 border-t border-line bg-ink/95 px-6 pb-5 pt-2 font-mono text-xs uppercase tracking-widest backdrop-blur md:!hidden`}
      >
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => {
                setMenuOpen(false);
                scrollTo(e, link.href);
              }}
              className="flex min-h-11 items-center border-b border-line/60 transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="/downloads/adrian-gaona-resume.pdf"
            download="Jesus-Adrian-Lopez-Gaona-Resume.pdf"
            className="flex min-h-11 items-center text-accent"
          >
            Résumé ↓
          </a>
        </li>
      </ul>
    </header>
  );
}
