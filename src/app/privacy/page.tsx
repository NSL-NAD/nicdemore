import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Nic DeMore",
  description: "Privacy policy for nicdemore.com.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32">
      <h1 className="font-display text-4xl font-semibold text-ink">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-ink-muted">Last updated: March 23, 2026</p>

      <div className="mt-12 space-y-10 text-ink-muted leading-relaxed">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">
            Information We Collect
          </h2>
          <p className="mt-3">
            We may collect personal information you voluntarily provide when you
            use our contact form, including your name and email address. We also
            collect standard analytics data such as page views, browser type, and
            referring URLs through cookies and similar technologies.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink">
            How We Use Information
          </h2>
          <p className="mt-3">
            Any information collected is used solely to respond to your
            inquiries, improve the site experience, and understand how visitors
            interact with the site. We do not sell, rent, or share your personal
            information with third parties for marketing purposes.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink">
            Contact
          </h2>
          <p className="mt-3">
            If you have questions about this privacy policy or your personal
            data, please reach out at{" "}
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
