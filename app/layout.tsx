import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileStickyCTA from "@/components/layout/MobileStickyCTA";
import CookieBanner from "@/components/layout/CookieBanner";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/JsonLd";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Стоматология",
    template: "%s | Стоматология",
  },
  description:
    "Семейная стоматологическая клиника. Имплантация, брекеты, лечение кариеса.",
  metadataBase: new URL("https://example.vercel.app"),
  alternates: { canonical: "https://example.vercel.app/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Стоматология",
    url: "https://example.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:outline focus:outline-2 focus:outline-primary"
        >
          Перейти к содержимому
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileStickyCTA />
        <CookieBanner />
        <Toaster />
        <JsonLd />
      </body>
    </html>
  );
}
