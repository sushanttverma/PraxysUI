import Link from "next/link";
import { Github } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/docs/components-overview" },
      { label: "Templates", href: "/templates" },
      { label: "Documentation", href: "/docs" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Installation", href: "/docs/installation" },
      { label: "CLI", href: "/docs/cli" },
      { label: "Tailwind CSS", href: "/docs/install-tailwind" },
      { label: "Utilities", href: "/docs/add-utilities" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/sushanttverma/Praxys-UI" },
      { label: "Discord", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Contributing", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ignite">
                <span className="font-pixel text-sm font-bold text-void">P</span>
              </div>
              <span className="font-pixel text-lg font-semibold text-chalk">
                Praxys UI
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-blush">
              Beautiful, animated React components. Built with Tailwind CSS and
              Framer Motion.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://github.com/sushanttverma/Praxys-UI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-faint transition-colors hover:border-border-light hover:text-blush"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-faint">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-blush transition-colors hover:text-chalk"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-text-faint">
            &copy; {new Date().getFullYear()} Praxys UI. All rights reserved.
          </p>
          <p className="text-xs text-text-faint">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
