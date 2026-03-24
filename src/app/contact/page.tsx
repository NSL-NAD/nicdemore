"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, stagger, viewportOnce, ease } from "@/lib/motion";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  const inputClasses =
    "bg-white border border-line rounded-md px-4 py-3 text-sm text-ink focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors w-full";
  const labelClasses =
    "font-mono text-xs uppercase tracking-wider text-ink-muted mb-2 block";

  return (
    <section className="min-h-screen bg-background px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="grid gap-16 md:grid-cols-2 md:gap-20"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
        >
          {/* Left - Form */}
          <div>
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="flex flex-col items-start gap-4 pt-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-light">
                    <svg
                      className="h-6 w-6 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="font-display text-3xl text-ink">
                    Message sent.
                  </h2>
                  <p className="text-ink-muted">
                    I&apos;ll be in touch.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <motion.h1
                    className="font-display text-4xl text-ink sm:text-5xl"
                    variants={fadeInUp}
                  >
                    Let&apos;s build something.
                  </motion.h1>

                  <div className="mt-10 flex flex-col gap-6">
                    <motion.div variants={fadeInUp}>
                      <label htmlFor="name" className={labelClasses}>
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClasses}
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label htmlFor="email" className={labelClasses}>
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClasses}
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label htmlFor="message" className={labelClasses}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={inputClasses}
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="bg-accent text-white px-8 py-3 rounded-md font-medium text-sm hover:bg-ink transition-colors disabled:opacity-50"
                      >
                        {status === "sending" ? "Sending..." : "Send message"}
                      </button>

                      {status === "error" && (
                        <p className="mt-3 text-sm text-red-600">
                          {errorMessage}
                        </p>
                      )}
                    </motion.div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right - Info */}
          <motion.div
            className="flex flex-col gap-8 md:pt-16"
            variants={fadeInUp}
          >
            <div>
              <h3 className={labelClasses}>Location</h3>
              <p className="text-ink">Milwaukee, WI</p>
            </div>

            <div>
              <h3 className={labelClasses}>Email</h3>
              <a
                href="mailto:nademore@gmail.com"
                className="text-accent hover:text-ink transition-colors"
              >
                nademore@gmail.com
              </a>
            </div>

            <p className="text-sm text-ink-muted">
              I typically respond within 24 hours.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
