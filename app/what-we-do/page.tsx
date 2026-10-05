"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { GitBranch, Layout, Sparkles, Activity, Lock, FileCode, AlertTriangle, Terminal, AlertCircle, Settings, ArrowRight, Check, X, type LucideIcon } from 'lucide-react';
import { Reveal } from "@/components/Reveal";

interface SolutionItem {
  number: string;
  title: string;
  description: string;
  icon: string;
}

interface ProblemItem {
  number: string;
  title: string;
  painLabel: string;
  pain: string;
  fixLabel: string;
  fix: string;
  icon: string;
}

interface LayerItem {
  number: string;
  title: string;
  description: string;
  icon: string;
}

interface CaseStudyItem {
  company: string;
  industry: string;
  headline: string;
  description: string;
  tags: string[];
}

const SOLUTION_ICONS: Record<string, LucideIcon> = {
  wave: GitBranch,
  architecture: Layout,
  agents: Sparkles,
  action: Activity,
  enterprise: Lock,
  capability: FileCode,
};

const PROBLEM_ICONS: Record<string, LucideIcon> = {
  roadmap: AlertTriangle,
  productArchitecture: Lock,
  demo: Terminal,
  production: AlertCircle,
};

const LAYER_ICONS: Record<string, LucideIcon> = {
  experiences: Layout,
  architecture: Settings,
  harness: Sparkles,
  governance: Lock,
};

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 ${className}`}>{children}</div>;
}

export default function WhatWeDoPage() {
  const t = useTranslations();

  const solutions = (
    Array.isArray(t.raw("whatWeDo.solutions.items")) ? t.raw("whatWeDo.solutions.items") : []
  ) as SolutionItem[];

  const problems = (
    Array.isArray(t.raw("whatWeDo.problems.items")) ? t.raw("whatWeDo.problems.items") : []
  ) as ProblemItem[];

  const layers = (
    Array.isArray(t.raw("whatWeDo.layers.items")) ? t.raw("whatWeDo.layers.items") : []
  ) as LayerItem[];

  const pathSteps = (
    Array.isArray(t.raw("whatWeDo.layers.pathSteps")) ? t.raw("whatWeDo.layers.pathSteps") : []
  ) as string[];

  const caseStudies = (
    Array.isArray(t.raw("whatWeDo.caseStudies.items")) ? t.raw("whatWeDo.caseStudies.items") : []
  ) as CaseStudyItem[];

  const activeStepIndex = 2;

  return (
    <main className="bg-white">
      {/* Hero */}
      <Reveal>
        <section className="bg-blue-950 pb-20 pt-24 md:pb-28 md:pt-32">
          <Container>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" aria-hidden="true" />
              {t("whatWeDo.hero.eyebrow")}
            </span>
            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              {t("whatWeDo.hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/70">
              {t("whatWeDo.hero.subtitle")}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/how-we-work"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(249,115,22,0.5)] transition-all duration-300 ease-out hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
              >
                {t("whatWeDo.hero.ctaPrimary")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:border-white/40 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              >
                {t("whatWeDo.hero.ctaSecondary")}
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/65">
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-orange-400" aria-hidden="true" />
                {t("whatWeDo.hero.note1")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-orange-400" aria-hidden="true" />
                {t("whatWeDo.hero.note2")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-orange-400" aria-hidden="true" />
                {t("whatWeDo.hero.note3")}
              </span>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* Solutions overview — 6 solution grid */}
      <Reveal>
        <section className="border-b border-black/5 bg-white py-24 md:py-28">
          <Container>
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                  {t("whatWeDo.solutions.eyebrow")}
                </span>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-blue-950 md:text-4xl">
                  {t("whatWeDo.solutions.title")}
                </h2>
              </div>
              <p className="max-w-xl text-pretty leading-relaxed text-slate-600 md:justify-self-end md:text-right">
                {t("whatWeDo.solutions.subtitle")}
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {solutions.map((item, i) => {
                const Icon = SOLUTION_ICONS[item.icon] ?? Layout;
                return (
                  <Reveal key={item.number} delay={i * 0.06}>
                    <div className="group h-full rounded-2xl border border-black/5 bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_32px_-8px_rgba(0,0,0,0.14)]">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-900">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="mt-5 block text-xs font-semibold text-orange-500">{item.number}</span>
                      <h3 className="mt-2 text-lg font-semibold tracking-tight text-blue-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-10">
              <Link
                href="/how-we-work"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-900 transition-colors hover:text-orange-500"
              >
                {t("whatWeDo.solutions.cta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* Problems solved — detailed numbered list */}
      <Reveal>
        <section className="bg-slate-50 py-24 md:py-28">
          <Container>
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                  {t("whatWeDo.problems.eyebrow")}
                </span>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-blue-950 md:text-4xl">
                  {t("whatWeDo.problems.title")}
                </h2>
              </div>
              <p className="max-w-xl text-pretty leading-relaxed text-slate-600 md:justify-self-end md:text-right">
                {t("whatWeDo.problems.subtitle")}
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {problems.map((item, i) => {
                const Icon = PROBLEM_ICONS[item.icon] ?? AlertTriangle;
                return (
                  <Reveal key={item.number} delay={i * 0.08}>
                    <div className="h-full rounded-2xl border border-black/5 bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-900">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="mt-5 flex items-baseline gap-2">
                        <span className="text-xs font-semibold text-orange-500">{item.number}</span>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-950">
                          {item.title}
                        </h3>
                      </div>
                      <div className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
                        <span>{item.pain}</span>
                      </div>
                      <div className="my-4 h-px bg-black/5" />
                      <div className="flex items-start gap-2 text-sm leading-relaxed text-blue-950">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                        <span>{item.fix}</span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>
      </Reveal>

      {/* What changes inside the product — 4-layer breakdown + action path */}
      <Reveal>
        <section className="bg-white py-24 md:py-28">
          <Container>
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                  {t("whatWeDo.layers.eyebrow")}
                </span>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-blue-950 md:text-4xl">
                  {t("whatWeDo.layers.title")}
                </h2>
              </div>
              <p className="max-w-xl text-pretty leading-relaxed text-slate-600 md:justify-self-end md:text-right">
                {t("whatWeDo.layers.subtitle")}
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {layers.map((item, i) => {
                const Icon = LAYER_ICONS[item.icon] ?? Layout;
                return (
                  <Reveal key={item.number} delay={i * 0.06}>
                    <div className="h-full rounded-2xl border-t-2 border-orange-400 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-900">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="mt-5 block text-xs font-semibold text-orange-500">{item.number}</span>
                      <h3 className="mt-2 text-base font-semibold tracking-tight text-blue-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-6 border-t border-black/5 pt-8">
              <h3 className="text-lg font-semibold tracking-tight text-blue-950">
                {t("whatWeDo.layers.harnessTitle")}
              </h3>
              <p className="mt-2 max-w-3xl leading-relaxed text-slate-600">
                {t("whatWeDo.layers.harnessDescription")}
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-black/5 bg-slate-50 p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {t("whatWeDo.layers.pathTitle")}
              </span>
              <div className="mt-6 flex flex-wrap items-center gap-x-1 gap-y-6">
                {pathSteps.map((step, i) => (
                  <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center gap-2 px-2 text-center">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          i === activeStepIndex ? "bg-blue-900" : "bg-slate-300"
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`max-w-[6.5rem] text-xs font-medium leading-tight ${
                          i === activeStepIndex
                            ? "rounded-full border border-blue-900 px-2.5 py-1 text-blue-900"
                            : "text-slate-500"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                    {i < pathSteps.length - 1 && (
                      <span className="hidden h-px w-10 bg-slate-300 sm:block" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-black/5 pt-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-900">
                  {t("whatWeDo.layers.activeStepLabel")}
                </span>
                <p className="mt-2 text-sm font-semibold text-blue-950">{t("whatWeDo.layers.activeStepTitle")}</p>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">
                  {t("whatWeDo.layers.activeStepDescription")}
                </p>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* Case studies preview */}
      <Reveal>
        <section className="bg-slate-50 py-24 md:py-28">
          <Container>
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                  {t("whatWeDo.caseStudies.eyebrow")}
                </span>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-blue-950 md:text-4xl">
                  {t("whatWeDo.caseStudies.title")}
                </h2>
              </div>
              <p className="max-w-xl text-pretty leading-relaxed text-slate-600 md:justify-self-end md:text-right">
                {t("whatWeDo.caseStudies.subtitle")}
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {caseStudies.map((study, i) => (
                <Reveal key={study.company} delay={i * 0.07}>
                  <Link
                    href="/work"
                    className="group block h-full rounded-2xl border border-black/5 bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_32px_-8px_rgba(0,0,0,0.14)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-blue-950">
                          {study.company}
                          <span className="font-normal text-slate-400"> &middot; {study.industry}</span>
                        </p>
                      </div>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-orange-500 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-blue-950">
                      {study.headline}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{study.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-900"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-900 transition-colors hover:text-orange-500"
              >
                {t("whatWeDo.caseStudies.viewAll")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* Closing CTA banner */}
      <Reveal>
        <section className="bg-blue-950 py-20 md:py-24">
          <Container>
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                  {t("whatWeDo.cta.title")}
                </h2>
                <p className="mt-3 max-w-xl text-pretty leading-relaxed text-white/70">
                  {t("whatWeDo.cta.subtitle")}
                </p>
              </div>
              <Link
                href="/how-we-work"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-950 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out hover:bg-orange-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t("whatWeDo.cta.button")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Container>
        </section>
      </Reveal>
    </main>
  );
}