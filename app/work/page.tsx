"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface CaseStudyEntry {
  id: string;
  company: string;
  industryTag: string;
  sector: string;
  headline: string;
  description: string;
  tags: string[];
}

interface TestimonialEntryLocal {
  quote: string;
  author: string;
  title: string;
}

interface StatEntryLocal {
  value: string;
  label: string;
}

export default function WorkPage() {
  const t = useTranslations();

  const rawCaseStudies = t.raw("workPage.caseStudies");
  const caseStudies = (
    Array.isArray(rawCaseStudies) ? rawCaseStudies : []
  ) as CaseStudyEntry[];

  const rawTestimonials = t.raw("workPage.testimonials");
  const testimonials = (
    Array.isArray(rawTestimonials) ? rawTestimonials : []
  ) as TestimonialEntryLocal[];

  const rawStats = t.raw("workPage.stats");
  const stats = (Array.isArray(rawStats) ? rawStats : []) as StatEntryLocal[];

  const allTagsLabel = t("workPage.filters.all");
  const tags = useMemo(
    () => [
      allTagsLabel,
      ...Array.from(new Set(caseStudies.flatMap((c) => c.tags))),
    ],
    [caseStudies, allTagsLabel],
  );

  const [activeTag, setActiveTag] = useState<string>(allTagsLabel);

  const filteredCaseStudies = useMemo(
    () =>
      activeTag === allTagsLabel
        ? caseStudies
        : caseStudies.filter((c) => c.tags.includes(activeTag)),
    [activeTag, caseStudies, allTagsLabel],
  );

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialCount = Math.max(testimonials.length, 1);
  const activeTestimonial = testimonials[testimonialIndex % testimonialCount];

  const goPrev = () =>
    setTestimonialIndex(
      (i) => (i - 1 + testimonialCount) % testimonialCount,
    );
  const goNext = () => setTestimonialIndex((i) => (i + 1) % testimonialCount);

  return (
    <main className="bg-white">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden bg-blue-950 px-6 py-24 text-white md:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              {t("workPage.hero.eyebrow")}
            </p>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              {t("workPage.hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/70">
              {t("workPage.hero.description")}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/what-we-do"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_20px_-8px_rgba(234,88,12,0.5)] transition-all duration-300 ease-out hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
              >
                {t("workPage.hero.primaryCta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/how-we-work"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-all duration-300 ease-out hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
              >
                {t("workPage.hero.secondaryCta")}
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Case studies grid + filters */}
      <Reveal>
        <section className="bg-slate-50 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
                  {t("workPage.proof.eyebrow")}
                </p>
                <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
                  {t("workPage.proof.title")}
                </h2>
              </div>
              <p className="max-w-md text-pretty leading-relaxed text-slate-600">
                {t("workPage.proof.description")}
              </p>
            </div>

            <div
              className="mt-10 flex flex-wrap gap-2"
              role="group"
              aria-label={t("workPage.filters.label")}
            >
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400",
                    activeTag === tag
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-700",
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              {filteredCaseStudies.map((study) => (
                <motion.article
                  key={study.id}
                  variants={fadeInUp}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_16px_32px_-12px_rgba(0,0,0,0.14)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-950">
                        {study.company}
                      </h3>
                      <p className="mt-0.5 text-sm text-slate-500">
                        {study.industryTag} · {study.sector}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 text-slate-300 transition-colors duration-300 ease-out group-hover:text-orange-500"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-4 text-base font-medium leading-snug text-blue-950">
                    {study.headline}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {study.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-orange-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                    {t("workPage.caseStudies_cta")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Testimonials carousel */}
      <Reveal>
        <section className="bg-white px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
              {t("workPage.testimonialsSection.eyebrow")}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
              {t("workPage.testimonialsSection.title")}
            </h2>

            {activeTestimonial && (
              <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] md:p-10">
                <span
                  className="block text-4xl font-bold leading-none text-orange-400"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="mt-2 text-pretty text-lg leading-relaxed text-blue-950">
                  {activeTestimonial.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-950 text-sm font-semibold text-white"
                    aria-hidden="true"
                  >
                    {activeTestimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-950">
                      {activeTestimonial.author}
                    </p>
                    <p className="text-sm text-slate-500">
                      {activeTestimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label={t("workPage.testimonialsSection.prev")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-300 ease-out hover:border-orange-300 hover:text-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label={t("workPage.testimonialsSection.next")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-300 ease-out hover:border-orange-300 hover:text-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="ml-2 flex gap-1.5" aria-hidden="true">
                {testimonials.map((item, i) => (
                  <span
                    key={item.author}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300 ease-out",
                      i === testimonialIndex
                        ? "w-6 bg-orange-500"
                        : "w-1.5 bg-slate-200",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Results summary stat row */}
      <Reveal>
        <section className="bg-slate-50 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-5xl">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 gap-8 divide-y divide-slate-200 md:grid-cols-4 md:divide-y-0 md:divide-x"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="pt-6 text-center first:pt-0 md:px-4 md:pt-0 md:first:px-0"
                >
                  <p className="text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-slate-500">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Closing CTA banner */}
      <Reveal>
        <section className="bg-blue-950 px-6 py-20 text-white md:py-24">
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
                {t("workPage.cta.title")}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-white/70">
                {t("workPage.cta.description")}
              </p>
            </div>
            <Link
              href="/what-we-do"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_20px_-8px_rgba(234,88,12,0.5)] transition-all duration-300 ease-out hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
            >
              {t("workPage.cta.button")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}