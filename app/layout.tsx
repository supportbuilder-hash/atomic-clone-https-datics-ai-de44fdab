import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Datics | AI product engineering for vertical SaaS",
  description:
    "Datics embeds production-grade AI directly into existing vertical SaaS platforms. No rip-and-replace, no multi-year roadmap, just a focused team that ships AI capability your customers can feel in weeks.",
  openGraph: {
    title: "Datics | AI product engineering for vertical SaaS",
    description:
      "Datics embeds production-grade AI directly into existing vertical SaaS platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[var(--background)] font-sans text-[var(--foreground)] antialiased">
        <LocaleProvider>
          <Navbar />
          {children}
          <Footer />
          <LanguageToggle />
        </LocaleProvider>
      </body>
    </html>
  );
}