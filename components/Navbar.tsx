"use client";
import { MouseEvent, useEffect, useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from 'lucide-react';
import { useTranslations } from "next-intl";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ctaHref = pathname === "/" ? "#cta-banner" : "/#cta-banner";

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-[var(--border)] bg-[var(--background)]/95 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(10,26,79,0.12)] backdrop-blur-md"
          : "border-transparent bg-[var(--background)]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md text-lg font-bold tracking-tight text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-white">
            d
          </span>
          <span>{t("brand.name")}</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.key}
                href={pathname === "/" ? link.href : "/" + link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="rounded-sm text-sm font-medium text-[var(--muted-foreground)] transition-colors duration-200 hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                {navT[link.key] ?? link.label}
              </a>
            ) : (
              <Link
                key={link.key}
                href={link.href}
                className={`rounded-sm text-sm font-medium transition-colors duration-200 hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                  pathname === link.href ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"
                }`}
              >
                {navT[link.key] ?? link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <a
            href={ctaHref}
            onClick={(e) => handleAnchorClick(e, "#cta-banner")}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(10,26,79,0.18)] transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
          >
            {navT.cta ?? "Book a 30-minute product review"}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] lg:hidden"
          aria-label={isOpen ? navT.close ?? "Close menu" : navT.open ?? "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--background)] lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) =>
                link.href.startsWith("#") ? (
                  <a
                    key={link.key}
                    href={pathname === "/" ? link.href : "/" + link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--card)]"
                  >
                    {navT[link.key] ?? link.label}
                  </a>
                ) : (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--card)]"
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                )
              )}
              <a
                href={ctaHref}
                onClick={(e) => handleAnchorClick(e, "#cta-banner")}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
              >
                {navT.cta ?? "Book a 30-minute product review"}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}