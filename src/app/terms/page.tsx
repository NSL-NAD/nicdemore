import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Nic DeMore",
  description: "Terms of service for nicdemore.com.",
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32">
      <h1 className="font-display text-4xl font-semibold text-ink">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-ink-muted">Last updated: March 23, 2026</p>

      <div className="mt-12 space-y-10 text-ink-muted leading-relaxed">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">
            Use of Site
          </h2>
          <p className="mt-3">
            By accessing and using this website, you agree to comply with these
            terms. This site is provided for informational and personal use only.
            You may not use the site for any unlawful purpose or in any way that
            could damage, disable, or impair its operation.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink">
            Intellectual Property
          </h2>
          <p className="mt-3">
            All content on this site, including text, images, graphics, and code,
            is the property of Nic DeMore unless otherwise noted. You may not
            reproduce, distribute, or create derivative works from any content
            without prior written permission.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink">
            Limitation of Liability
          </h2>
          <p className="mt-3">
            This site and its content are provided &ldquo;as is&rdquo; without
            warranties of any kind. In no event shall Nic DeMore be liable for
            any damages arising from your use of, or inability to use, this site
            or its content.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink">
            Contact
          </h2>
          <p className="mt-3">
            If you have questions about these terms, please reach out at{" "}
            <a
              href="mailto:nademore@gmail.com"
              className="text-ink underline underline-offset-4 hover:text-ink-muted transition-colors"
            >
              nademore@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
