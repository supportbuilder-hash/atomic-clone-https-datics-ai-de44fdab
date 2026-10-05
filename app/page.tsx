"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Activity, GitBranch, Terminal, FileCode, Layout, Check, Mail, Phone } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer } from "@/lib/motion";
import { BRAND_NAME, BRAND_TAGLINE, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/data";

interface StatEntry {
  value: string;
  label: string;
}

interface ProcessStageEntry {
  name: string;
  duration: string;
  description: string;
}

interface CaseStudySummary {
  company: string;
  industry: string;
  headline: string;
  description: string;
  tags: string[];
  href: string;
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
  icon: IconKey;
  title: string;
  description: string;
}

interface VerticalItem {
  name: string;
  description: string;
}

const panelRow: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function HomePage() {
  const t = useTranslations();

  const capabilities = (
    Array.isArray(t.raw("capabilities.items")) ? t.raw("capabilities.items") : []
  ) as CapabilityItem[];

  const caseStudies = (
    Array.isArray(t.raw("work.items")) ? t.raw("work.items") : []
  ) as CaseStudySummary[];

  const stages = (
    Array.isArray(t.raw("process.stages")) ? t.raw("process.stages") : []
  ) as ProcessStageEntry[];

  const verticals = (
    Array.isArray(t.raw("verticals.items")) ? t.raw("verticals.items") : []
  ) as VerticalItem[];

  const proofStats = (
    Array.isArray(t.raw("proof.stats")) ? t.raw("proof.stats") : []
  ) as StatEntry[];

  const heroMetrics = (
    Array.isArray(t.raw("hero.metrics")) ? t.raw("hero.metrics") : []
  ) as StatEntry[];

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
                {BRAND_TAGLINE}
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
                    key={i}
                    variants={panelRow}
                    className="flex items-center justify-between rounded-xl bg-[var(--background)] px-4 py-3"
                  >
                    <span className="text-sm text-[var(--muted-foreground)]">{metric.label}</span>
                    <span className="text-sm font-semibold tabular-nums">{metric.value}</span>
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

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-6">
            {capabilities.map((item, i) => {
              const Icon = ICONS[item.icon] ?? Sparkles;
              const spanClass =
                i === 0
                  ? "md:col-span-4 md:row-span-2"
                  : i === 1
                  ? "md:col-span-2"
                  : i === 2
                  ? "md:col-span-2"
                  : "md:col-span-3";
              return (
                <Reveal key={item.title} delay={i * 0.06} className={spanClass}>
                  <div className="group h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 transition-all duration-300 ease-out hover:border-indigo-500/30 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_32px_-12px_rgba(0,0,0,0.15)]">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* WORK — full-bleed tinted, offset cards */}
      <Reveal>
        <section id="work" className="border-y border-[var(--border)] bg-[var(--card)]">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  {t("work.eyebrow")}
                </span>
                <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                  {t("work.title")}
                </h2>
              </div>
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500 transition-colors duration-300 hover:text-indigo-400"
              >
                {t("work.viewAll")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {caseStudies.map((study, i) => (
                <Reveal key={study.company} delay={i * 0.08} className={i === 1 ? "lg:mt-8" : ""}>
                  <Link
                    href={study.href}
                    className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7 transition-all duration-300 ease-out hover:border-indigo-500/30 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_32px_-12px_rgba(0,0,0,0.15)]"
                  >
                    <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                      {study.industry}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight">{study.headline}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {study.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {(study.tags ?? []).map((tag: string, tagIdx: number) => (
                        <span
                          key={tagIdx}
                          className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted-foreground)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500">
                      {study.company}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* PROCESS — list / timeline layout */}
      <Reveal>
        <section id="process" className="mx-auto max-w-7xl px-6 py-24 md:py-28 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                {t("process.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                {t("process.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]">
                {t("process.subtitle")}
              </p>
            </div>
            <ol className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {stages.map((stage, i) => (
                <Reveal key={stage.name} delay={i * 0.07}>
                  <li className="flex flex-col gap-2 py-6 sm:flex-row sm:items-start sm:gap-8">
                    <span className="shrink-0 text-sm font-semibold text-indigo-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-lg font-semibold tracking-tight">{stage.name}</h3>
                        <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                          {stage.duration}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                        {stage.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      </Reveal>

      {/* VERTICALS + PROOF — tinted dark band, stat strip */}
      <Reveal>
        <section id="verticals" className="bg-[var(--foreground)] text-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                {t("verticals.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                {t("verticals.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-[var(--background)]/70">
                {t("verticals.subtitle")}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {verticals.map((v, i) => (
                <Reveal key={v.name} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-[var(--background)]/10 bg-[var(--background)]/5 p-6">
                    <h3 className="text-base font-semibold tracking-tight">{v.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--background)]/70">
                      {v.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-2 gap-6 border-t border-[var(--background)]/10 pt-10 sm:grid-cols-4">
              {proofStats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.05}>
                  <div>
                    <p className="text-2xl font-semibold tracking-tight md:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-[var(--background)]/60">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA — centered, distinct close */}
      <Reveal>
        <section id="contact" className="mx-auto max-w-5xl px-6 py-24 text-center md:py-28 lg:px-8">
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]">
            {t("cta.subtitle")}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_12px_24px_-8px_rgba(79,70,229,0.45)] transition-all duration-300 ease-out hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t("cta.primary")}
            </a>
            <a
              href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 ease-out hover:border-indigo-500/40 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t("cta.secondary")}
            </a>
          </div>
          <p className="mt-6 text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
            {BRAND_NAME_LABEL}
          </p>
        </section>
      </Reveal>
    </main>
  );
}

const BRAND_NAME_LABEL = BRAND_NAME;