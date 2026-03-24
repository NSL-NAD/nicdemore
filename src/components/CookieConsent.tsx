"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("cookie-consent");
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 bg-white border border-line rounded-lg shadow-lg p-4"
        >
          <p className="text-sm text-ink-muted leading-relaxed">
            This site uses cookies to improve your experience. By continuing to
            browse, you agree to our use of cookies.
          </p>
          <button
            onClick={dismiss}
            className="mt-3 text-sm font-medium text-accent hover:text-ink transition-colors"
          >
            Got it
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
