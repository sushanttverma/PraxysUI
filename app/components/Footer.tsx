"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ArrowUpRight, Copy, Check } from "lucide-react";

const productLinks = [
  { label: "Components", href: "/components" },
  { label: "Templates", href: "/templates" },
  { label: "Examples", href: "/examples" },
  { label: "Installation", href: "/components/install" },
  { label: "Customize", href: "/customize" },
  { label: "Changelog", href: "/changelog" },
];

const toolLinks = [
  { label: "Animation Studio", href: "/studio" },
  { label: "Gradient Maker", href: "/gradient-maker" },
  { label: "Shadow Lab", href: "/shadow-lab" },
  { label: "Glassmorphism", href: "/glass-generator" },
];

const communityLinks = [
  {
    label: "GitHub",
    href: "https://github.com/sushanttverma/Praxys-UI",
    external: true,
  },
  {
    label: "Issues",
    href: "https://github.com/sushanttverma/Praxys-UI/issues",
    external: true,
  },
  {
    label: "Discussions",
    href: "https://github.com/sushanttverma/Praxys-UI/discussions",
    external: true,
  },
  {
    label: "Contributing",
    href: "https://github.com/sushanttverma/Praxys-UI/blob/main/CONTRIBUTING.md",
    external: true,
  },
];

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-widest text-text-faint mb-5">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-blush transition-colors hover:text-chalk"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-[-2px] group-hover:opacity-60 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-blush transition-colors hover:text-chalk"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("npx praxys-ui init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Subtle accent glow at top */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-ignite), transparent)",
          opacity: 0.3,
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* ── Top section: brand + quick command ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-12 border-b border-border">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ignite transition-transform duration-300 group-hover:scale-105">
                <span className="font-pixel text-sm font-bold text-void">
                  P
                </span>
              </div>
              <span className="font-pixel text-xl font-semibold text-chalk">
                Praxys UI
              </span>
            </Link>
          </div>

          {/* Quick install */}
          <button
            onClick={handleCopy}
            className="group flex items-center gap-3 rounded-xl border border-border bg-obsidian px-5 py-3 font-mono text-sm transition-colors hover:border-border-light cursor-pointer"
          >
            <span className="text-ignite/60">$</span>
            <span className="text-blush group-hover:text-chalk transition-colors">
              npx praxys-ui init
            </span>
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-text-faint group-hover:text-blush transition-colors" />
            )}
          </button>
        </div>

        {/* ── Link columns ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 py-14">
          <FooterLinkGroup title="Product" links={productLinks} />
          <FooterLinkGroup title="Tools" links={toolLinks} />
          <FooterLinkGroup title="Community" links={communityLinks} />

          {/* Status / meta column */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-text-faint mb-5">
              Built with
            </h4>
            <ul className="space-y-3 text-sm text-blush">
              <li>Next.js</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>TypeScript</li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border py-8">
          <p className="text-xs text-text-faint">
            &copy; {new Date().getFullYear()} Praxys UI
          </p>

          <div className="flex items-center gap-5">
            <motion.a
              href="https://github.com/sushanttverma/Praxys-UI"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 text-xs text-text-faint hover:text-chalk transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>Star on GitHub</span>
            </motion.a>
            <span className="text-border-light">•</span>
            <p className="text-xs text-text-faint">
              Made with craft in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
