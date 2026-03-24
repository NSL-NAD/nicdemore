import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/ventures", label: "Ventures" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link
              href="/"
              className="font-display text-lg font-semibold text-ink hover:text-accent transition-colors"
            >
              Nic DeMore
            </Link>
            <p className="mt-2 text-sm text-ink-muted">
              Founder. Operator. Builder.
              <br />
              Milwaukee, WI
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-ink-muted mb-3">
              Pages
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-ink-muted mb-3">
              Connect
            </h4>
            <a
              href="mailto:nademore@gmail.com"
              className="text-sm text-ink-muted hover:text-accent transition-colors"
            >
              nademore@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-muted">
            &copy; {new Date().getFullYear()} Nic DeMore. All rights reserved.
          </p>
          <ul className="flex gap-4">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-ink-muted hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
