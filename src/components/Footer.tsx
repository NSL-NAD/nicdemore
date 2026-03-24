import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <Link
              href="/"
              className="font-display text-base text-ink hover:text-accent transition-colors"
            >
              Nic DeMore
            </Link>
            <p className="text-ink-muted text-sm mt-1">
              Builder. Engineer. Founder. Milwaukee, WI.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-ink-muted">
            <a
              href="mailto:nademore@gmail.com"
              className="hover:text-ink transition-colors"
            >
              Email
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              GitHub
            </a>
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink transition-colors">
              Terms
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-line/50">
          <p className="text-xs text-ink-muted/50">
            &copy; {new Date().getFullYear()} Nic DeMore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
