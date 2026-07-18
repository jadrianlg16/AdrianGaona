"use client";

import { contact } from "../lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-10 md:px-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-bold uppercase tracking-tight">
            Adrián Gaona<span className="text-accent">.</span>
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">
            {contact.location}
          </p>
        </div>

        <ul className="flex gap-6 font-mono text-xs uppercase tracking-widest">
          {contact.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          © {year} — Designed & built with discipline
        </p>
      </div>
    </footer>
  );
}
