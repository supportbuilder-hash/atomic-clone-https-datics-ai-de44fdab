"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mail } from 'lucide-react';
import { useTranslations } from "next-intl";
import { navLinks, footerLinks, BRAND } from "@/lib/data";

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[var(--primary)] text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-[var(--primary)]">
                d
              </span>
              <span>{t("brand.name")}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{t("footer.tagline")}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              {t("footer.siteHeading")}
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="rounded-sm text-sm text-white/80 transition-colors duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              {t("footer.moreHeading")}
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) =>
                link.href.startsWith("#") ? (
                  <li key={link.key}>
                    <a
                      href={pathname === "/" ? link.href : "/" + link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="rounded-sm text-sm text-white/80 transition-colors duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                      {navT[link.key] ?? link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="rounded-sm text-sm text-white/80 transition-colors duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                      {navT[link.key] ?? link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              {t("footer.contactHeading")}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-center gap-2 rounded-sm text-sm text-white/80 transition-colors duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.phone.replace(/[^+\d]/g, "")}`}
                  className="rounded-sm text-sm text-white/80 transition-colors duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {BRAND.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-8 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("footer.copyright")}</p>
          <p>{t("footer.bottomTagline")}</p>
        </div>
      </div>
    </motion.footer>
  );
}