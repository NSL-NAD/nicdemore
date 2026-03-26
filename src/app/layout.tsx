import type { Metadata } from "next";
import { Syne, DM_Serif_Display, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";
import { RetroProvider } from "@/contexts/RetroContext";
import { PersonSchema } from "@/components/PersonSchema";
import { VentureOSWrapper } from "@/components/venture-os/VentureOSWrapper";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press-start",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nicdemore.com"),
  title: {
    default: "Nic DeMore — Builder. Engineer. Founder.",
    template: "%s | Nic DeMore",
  },
  description:
    "Nic DeMore is a founder, operator, and builder based in Milwaukee, WI. Co-founder of Margle Media and Good at Scale Studio. Building AI-native products and purpose-driven ventures.",
  authors: [{ name: "Nic DeMore", url: "https://nicdemore.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nicdemore.com",
    siteName: "Nic DeMore",
    title: "Nic DeMore — Builder. Engineer. Founder.",
    description:
      "Co-founder of Margle Media and Good at Scale Studio. Building AI-native products and purpose-driven ventures from Milwaukee, WI.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nic DeMore — Builder. Engineer. Founder.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nic DeMore — Builder. Engineer. Founder.",
    description:
      "Co-founder of Margle Media and Good at Scale Studio.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://nicdemore.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSerifDisplay.variable} ${jetbrainsMono.variable} ${pressStart2P.variable} h-full`}
    >
      <head>
        <PersonSchema />
      </head>
      <body className="min-h-full flex flex-col antialiased overflow-x-hidden" style={{ background: 'var(--color-base)', color: 'var(--color-text-primary)' }}>
        <div className="grain-overlay" aria-hidden="true" />
        <RetroProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <VentureOSWrapper />
        </RetroProvider>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
