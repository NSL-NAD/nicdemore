"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASING_PREMIUM, EASING_SMOOTH, viewportOnce } from "@/lib/motion";

const PERSONAL_DOMAINS = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com",
  "icloud.com", "me.com", "aol.com", "live.com",
];

function isPersonalEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return PERSONAL_DOMAINS.includes(domain);
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    businessEmail: "",
    phone: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Client-side validation
    if (!formData.name || !formData.businessEmail || !formData.subject || !formData.message) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (isPersonalEmail(formData.businessEmail)) {
      setErrorMsg("Please use a business email address.");
      return;
    }

    if (formData.message.length < 20) {
      setErrorMsg("Message must be at least 20 characters.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setFormData({ name: "", businessEmail: "", phone: "", subject: "", message: "", website: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const inputStyle: React.CSSProperties = {
    background: 'var(--color-surface)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border)',
    fontFamily: 'var(--font-syne)',
    fontSize: '16px', // Prevents iOS auto-zoom on focus
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 lg:py-40 section-glow"
      style={{ background: 'var(--color-base)', position: 'relative' }}
    >
      {/* Grid markers — architectural detail */}
      <span className="grid-marker" style={{ top: '24px', left: '16px' }}>+</span>
      <span className="grid-marker" style={{ top: '24px', right: '16px' }}>+</span>
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: EASING_SMOOTH }}
            className="block text-xs tracking-widest uppercase mb-6"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '11px' }}
          >
            // Contact
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: EASING_PREMIUM }}
            data-neon-header="cyan"
            className="font-display font-bold mb-4"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.025em',
            }}
          >
            Let&apos;s Work Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASING_PREMIUM, delay: 0.1 }}
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-dm-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2vw, 22px)',
              color: 'var(--color-text-secondary)',
            }}
          >
            I&apos;m always interested in connecting with people who care about craft,
            design, and building things that actually matter. Let&apos;s talk.
          </motion.p>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASING_PREMIUM, delay: 0.15 }}
          className="max-w-2xl mx-auto"
        >
          {status === "success" ? (
            <div
              className="text-center py-16 px-8 rounded-2xl"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-display font-bold text-xl mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Message sent.
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot — hidden from humans */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium tracking-widest uppercase mb-2"
                    style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-jetbrains)', fontSize: '10px', letterSpacing: '0.1em' }}
                  >
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="businessEmail"
                    className="block text-xs font-medium tracking-widest uppercase mb-2"
                    style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-jetbrains)', fontSize: '10px', letterSpacing: '0.1em' }}
                  >
                    Business Email *
                  </label>
                  <input
                    id="businessEmail"
                    name="businessEmail"
                    type="email"
                    required
                    value={formData.businessEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-medium tracking-widest uppercase mb-2"
                    style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-jetbrains)', fontSize: '10px', letterSpacing: '0.1em' }}
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-medium tracking-widest uppercase mb-2"
                    style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-jetbrains)', fontSize: '10px', letterSpacing: '0.1em' }}
                  >
                    Subject *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium tracking-widest uppercase mb-2"
                  style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-jetbrains)', fontSize: '10px', letterSpacing: '0.1em' }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  minLength={20}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-colors focus:border-[var(--color-accent)] resize-y"
                  style={inputStyle}
                />
              </div>

              {errorMsg && (
                <p className="text-sm" style={{ color: '#D94040' }}>
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 font-bold text-sm transition-all hover:scale-[1.02] disabled:opacity-60"
                style={{
                  background: 'var(--color-accent)',
                  color: '#fff',
                  fontFamily: 'var(--font-syne)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>

        {/* Direct email option */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10 mb-10"
        >
          <p
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Prefer email?{" "}
            <a
              href="mailto:nademore@gmail.com"
              className="animated-underline font-medium"
              style={{ color: 'var(--color-accent)' }}
            >
              nademore@gmail.com
            </a>
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-8 mb-10"
        >
          <a
            href="https://www.linkedin.com/in/nic-demore"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-reveal text-sm font-medium transition-colors hover:text-accent"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-syne)' }}
          >
            LinkedIn
          </a>
          <div className="w-1 h-1 rounded-full" style={{ background: 'var(--color-border)' }} />
          <a
            href="https://www.instagram.com/nicdemore/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-reveal text-sm font-medium transition-colors hover:text-accent"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-syne)' }}
          >
            Instagram
          </a>
          <div className="w-1 h-1 rounded-full" style={{ background: 'var(--color-border)' }} />
          <a
            href="https://goodatscale.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-reveal text-sm font-medium transition-colors hover:text-accent"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-syne)' }}
          >
            GAS Studio
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs tracking-widest text-center"
          style={{
            color: 'var(--color-text-light)',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '11px',
            letterSpacing: '0.1em',
          }}
        >
          Based in Milwaukee, WI — available to relocate or work remotely
        </motion.p>
      </div>
    </section>
  );
}
