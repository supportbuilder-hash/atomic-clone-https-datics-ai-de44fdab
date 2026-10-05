"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Activity, GitBranch, Terminal, FileCode, Layout, Check, Mail, Phone } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer } from "@/lib/motion";
import { BRAND_NAME, BRAND_TAGLINE, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/data";

interface StatEntry {
  value?: string;
  label?: string;
}

interface ProcessStageEntry {
  name?: string;
  duration?: string;
  description?: string;
}

interface CaseStudySummary {
  company?: string;
  industry?: string;
  headline?: string;
  description?: string;
  tags?: string[];
  href?: string;
}

type IconKey = "sparkles" | "activity" | "gitBranch" | "terminal" | "fileCode" | "layout";

const ICONS: Record<IconKey, typeof Sparkles> = {
  sparkles: Sparkles,
  activity: Activity,
  gitBranch: GitBranch,
  terminal: Terminal,
  fileCode: FileCode,
  layout: Layout,
};

interface CapabilityItem {
  icon?: IconKey;
  title?: string;
  description?: string;
}

interface VerticalItem {
  name?: string;
  description?: string;
}

const panelRow: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Fallback brand constants used only if lib/data fails to provide a value.
const FALLBACK_BRAND_NAME = "Datics";
const FALLBACK_BRAND_TAGLINE = "AI product engineering for established vertical B2B SaaS.";
const FALLBACK_CONTACT_EMAIL = "business@datics.ai";
const FALLBACK_CONTACT_PHONE = "+1 (945) 297-6257";

export default function HomePage() {
  const t = useTranslations();

  /**
   * next-intl's t.raw() can throw (not just return undefined) when a
   * namespace/key is entirely absent from the active locale's messages file.
   * Guard every call so a missing key degrades to an empty array instead of
   * crashing the whole page render with a 500.
   */
  function safeRaw(key: string): unknown {
    try {
      return t.raw(key);
    } catch {
      return undefined;
    }
  }

  const capabilities = (
    Array.isArray(safeRaw("capabilities.items")) ? (safeRaw("capabilities.items") as CapabilityItem[]) : []
  );

  const caseStudies = (
    Array.isArray(safeRaw("work.items")) ? (safeRaw("work.items") as CaseStudySummary[]) : []
  );

  const stages = (
    Array.isArray(safeRaw("process.stages")) ? (safeRaw("process.stages") as ProcessStageEntry[]) : []
  );

  const verticals = (
    Array.isArray(safeRaw("verticals.items")) ? (safeRaw("verticals.items") as VerticalItem[]) : []
  );

  const proofStats = (
    Array.isArray(safeRaw("proof.stats")) ? (safeRaw("proof.stats") as StatEntry[]) : []
  );

  const heroMetrics = (
    Array.isArray(safeRaw("hero.metrics")) ? (safeRaw("hero.metrics") as StatEntry[]) : []
  );

  // Null-safe brand/contact values. The lib/data import may resolve to
  // undefined in some build/runtime edge cases, so every value used below is
  // guarded with a nullish-coalescing fallback before any string method is
  // called on it (.replace, template interpolation, etc.).
  const brandName = BRAND_NAME ?? FALLBACK_BRAND_NAME;
  const brandTagline = BRAND_TAGLINE ?? FALLBACK_BRAND_TAGLINE;
  const contactEmail = CONTACT_EMAIL ?? FALLBACK_CONTACT_EMAIL;
  const phoneDisplay = CONTACT_PHONE ?? FALLBACK_CONTACT_PHONE;
  const phoneHref = phoneDisplay?.replace(/[^\d+]/g, "") ?? phoneDisplay ?? "";

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO — split, asymmetric, product-led */}
      <Reveal>
        <section
          id="hero"
          className="relative overflow-hidden border-b border-[var(--border)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl"
          />
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />
                {t("hero.eyebrow")}
              </span>
              <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                {t("hero.titleLine1")}
                <span className="block text-indigo-500">{t("hero.titleLine2")}</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]">
                {t("hero.subtitle")}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/how-we-work"
                  className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_12px_24px_-8px_rgba(79,70,229,0.45)] transition-all duration-300 ease-out hover:bg-indigo-500 hover:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_16px_32px_-8px_rgba(79,70,229,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 ease-out hover:border-indigo-500/40 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                {brandTagline}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-16px_rgba(0,0,0,0.18)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <div>
                  <p className="text-sm font-semibold">{t("hero.panelTitle")}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{t("hero.panelSubtitle")}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  {t("hero.panelLive")}
                </span>
              </div>
              <div className="mt-5 space-y-3">
                {heroMetrics.map((metric, i) => (
                  <motion.div
                    key={metric?.label ?? i}
                    variants={panelRow}
                    className="flex items-center justify-between rounded-xl bg-[var(--background)] px-4 py-3"
                  >
                    <span className="text-sm text-[var(--muted-foreground)]">{metric?.label ?? ""}</span>
                    <span className="text-sm font-semibold tabular-nums">{metric?.value ?? ""}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-dashed border-[var(--border)] px-4 py-3 text-xs text-[var(--muted-foreground)]">
                <Check className="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />
                {t("hero.panelFootnote")}
              </div>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* CAPABILITIES — bento, asymmetric sizing */}
      <Reveal>
        <section id="capabilities" className="mx-auto max-w-7xl px-6 py-24 md:py-28 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
              {t("capabilities.eyebrow")}
            </span>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              {t("capabilities.title")}
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]">
              {t("capabilities.subtitle")}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.length > 0 ? (
              capabilities.map((item, i) => {
                const Icon = (item?.icon && ICONS[item.icon]) ? ICONS[item.icon] : Sparkles;
                return (
                  <div
                    key={item?.title ?? i}
                    className={`rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_32px_-8px_rgba(0,0,0,0.16)] ${
                      i === 0 ? "md:col-span-2" : ""
                    }`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{item?.title ?? ""}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">{item?.description ?? ""}</p>
                  </div>
                );
              })
            ) : null}
          </div>
        </section>
      </Reveal>

      {/* VERTICALS — tinted strip */}
      <Reveal>
        <section id="verticals" className="border-y border-[var(--border)] bg-[var(--primary)] text-white">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {t("verticals.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {t("verticals.title")}
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {verticals.length > 0 ? (
                verticals.map((item, i) => (
                  <div
                    key={item?.name ?? i}
                    className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <h3 className="text-sm font-semibold text-white">{item?.name ?? ""}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{item?.description ?? ""}</p>
                  </div>
                ))
              ) : null}
            </div>
          </div>
        </section>
      </Reveal>

      {/* PROCESS — list layout */}
      <Reveal>
        <section id="process" className="mx-auto max-w-7xl px-6 py-24 md:py-28 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
              {t("process.eyebrow")}
            </span>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              {t("process.title")}
            </h2>
          </div>
          <ol className="mt-12 space-y-4">
            {stages.length > 0 ? (
              stages.map((stage, i) => (
                <li
                  key={stage?.name ?? i}
                  className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-semibold text-indigo-500">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight">{stage?.name ?? ""}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--muted-foreground)]">{stage?.description ?? ""}</p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--muted-foreground)]">
                    {stage?.duration ?? ""}
                  </span>
                </li>
              ))
            ) : null}
          </ol>
        </section>
      </Reveal>

      {/* WORK — full-bleed cards */}
      <Reveal>
        <section id="work" className="border-t border-[var(--border)] bg-[var(--card)]">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  {t("work.eyebrow")}
                </span>
                <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                  {t("work.title")}
                </h2>
              </div>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-500 transition-colors duration-200 hover:text-indigo-600"
              >
                {t("work.viewAll")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {caseStudies.length > 0 ? (
                caseStudies.map((study, i) => (
                  <Link
                    key={study?.company ?? i}
                    href={study?.href ?? "/work"}
                    className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_32px_-8px_rgba(0,0,0,0.16)]"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                      {study?.industry ?? ""}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight">{study?.company ?? ""}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {study?.description ?? ""}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(study?.tags ?? []).map((tag, tagIndex) => (
                        <span
                          key={`${study?.company ?? i}-${tag ?? tagIndex}`}
                          className="rounded-full border border-[var(--border)] bg-[var(--card)] px-2.5 py-1 text-[11px] font-medium text-[var(--muted-foreground)]"
                        >
                          {tag ?? ""}
                        </span>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500 transition-colors duration-200 group-hover:text-indigo-600">
                      {t("work.readCase")}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                ))
              ) : null}
            </div>
          </div>
        </section>
      </Reveal>

      {/* PROOF — stat strip */}
      <Reveal>
        <section id="proof" className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-8">
          <div className="grid grid-cols-2 gap-6 border-y border-[var(--border)] py-10 sm:grid-cols-4">
            {proofStats.length > 0 ? (
              proofStats.map((stat, i) => (
                <div key={stat?.label ?? i} className="text-center">
                  <p className="text-3xl font-semibold tracking-tight text-[var(--primary)] md:text-4xl">
                    {stat?.value ?? ""}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                    {stat?.label ?? ""}
                  </p>
                </div>
              ))
            ) : null}
          </div>
        </section>
      </Reveal>

      {/* CTA — closing banner */}
      <Reveal>
        <section id="cta-banner" className="border-t border-[var(--border)] bg-[var(--foreground)] text-white">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center md:py-24 lg:px-8">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/70">
              {t("cta.description")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/how-we-work"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_12px_24px_-8px_rgba(242,166,61,0.45)] transition-all duration-300 ease-out hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {t("cta.button")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {contactEmail}
              </a>
              <a
                href={phoneHref ? `tel:${phoneHref}` : "#"}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {phoneDisplay}
              </a>
            </div>
            <p className="mt-6 text-xs uppercase tracking-wider text-white/40">{brandName}</p>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
