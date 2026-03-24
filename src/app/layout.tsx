import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nic DeMore | Builder. Engineer. Founder.",
  description:
    "Mechanical engineer turned entrepreneur. Building AI-native systems and purpose-driven ventures.",
  metadataBase: new URL("https://nicdemore.com"),
  openGraph: {
    title: "Nic DeMore | Builder. Engineer. Founder.",
    description:
      "Mechanical engineer turned entrepreneur. Building AI-native systems and purpose-driven ventures.",
    url: "https://nicdemore.com",
    siteName: "Nic DeMore",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nic DeMore | Builder. Engineer. Founder.",
    description:
      "Mechanical engineer turned entrepreneur. Building AI-native systems and purpose-driven ventures.",
  },
  alternates: {
    canonical: "https://nicdemore.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nic DeMore",
  url: "https://nicdemore.com",
  jobTitle: "Founder & Builder",
  worksFor: {
    "@type": "Organization",
    name: "Good at Scale Studio",
    url: "https://goodatscale.studio",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Marquette University",
  },
  sameAs: ["https://goodatscale.studio", "https://foacourse.com"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
