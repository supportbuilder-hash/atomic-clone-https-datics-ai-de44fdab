"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Check, Circle, Clock, GitBranch, Activity, Sparkles } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";

interface ProcessStage {
  number: string;
  name: string;
  duration: string;
  description: string;
  activities: string[];
}

interface WaveStep {
  name: string;
  description: string;
}

interface TimelineRow {
  stage: string;
  duration: string;
  milestone: string;
}

interface MetricItem {
  value: string;
  label: string;
}

const heroLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HowWeWorkPage() {
  const t = useTranslations();

  const stages = (
    Array.isArray(t.raw("howWeWork.process.stages"))
      ? t.raw("howWeWork.process.stages")
      : []
  ) as ProcessStage[];

  const waveSteps = (
    Array.isArray(t.raw("howWeWork.waves.steps")) ? t.raw("howWeWork.waves.steps") : []
  ) as WaveStep[];

  const timelineRows = (
    Array.isArray(t.raw("howWeWork.timeline.rows")) ? t.raw("howWeWork.timeline.rows") : []
  ) as TimelineRow[];

  const metrics = (
    Array.isArray(t.raw("howWeWork.metrics.items")) ? t.raw("howWeWork.metrics.items") : []
  ) as MetricItem[];

  return (
    <main className="bg-white">
      {/* HERO */}
      <Reveal>
        <section className="relative overflow-hidden bg-[#101c44] px-6 py-24 md:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              variants={heroLine}
              initial="hidden"
              animate="visible"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#f2862e]"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t("howWeWork.hero.eyebrow")}
            </motion.div>
            <motion.h1
              variants={heroLine}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.08 }}
              className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl"
            >
              {t("howWeWork.hero.heading")}
            </motion.h1>
            <motion.p
              variants={heroLine}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.16 }}
              className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/70"
            >
              {t("howWeWork.hero.description")}
            </motion.p>
            <motion.p
              variants={heroLine}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.22 }}
              className="mt-4 text-sm font-medium uppercase tracking-wide text-[#8fa0d6]"
            >
              {t("howWeWork.hero.subheading")}
            </motion.p>
            <motion.div
              variants={heroLine}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/what-we-do"
                className="inline-flex items-center gap-2 rounded-full bg-[#f2862e] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(242,134,46,0.6)] transition-all duration-300 ease-out hover:bg-[#e07418] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t("howWeWork.hero.ctaPrimary")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t("howWeWork.hero.ctaSecondary")}
              </Link>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ENGAGEMENT PROCESS DETAILED */}
      <Reveal>
        <section className="px-6 py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4a5fb8]">
                  {t("howWeWork.process.eyebrow")}
                </p>
                <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[#101c44] md:text-4xl">
                  {t("howWeWork.process.heading")}
                </h2>
              </div>
              <p className="text-pretty text-base leading-relaxed text-[#5b6472]">
                {t("howWeWork.process.description")}
              </p>
            </div>

            <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 top-6 hidden h-px bg-[#dde2ef] md:block"
              />
              {stages.map((stage, i) => (
                <Reveal key={stage.number} delay={i * 0.1}>
                  <div className="relative flex h-full flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_32px_-8px_rgba(0,0,0,0.16)]">
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#101c44] bg-white text-sm font-bold text-[#101c44]">
                      {stage.number}
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#4a5fb8]">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {stage.duration}
                    </div>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-[#101c44]">
                      {stage.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5b6472]">
                      {stage.description}
                    </p>
                    <ul className="mt-5 flex-1 space-y-2.5 border-t border-black/5 pt-5">
                      {(stage.activities ?? []).map((activity, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#333d54]">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#f2862e]"
                            aria-hidden="true"
                          />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* CAPABILITY WAVES DETAILED */}
      <Reveal>
        <section className="bg-[#eef1f8] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4a5fb8]">
                {t("howWeWork.waves.eyebrow")}
              </p>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[#101c44] md:text-4xl">
                {t("howWeWork.waves.heading")}
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-[#5b6472]">
                {t("howWeWork.waves.description")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-14 rounded-2xl border border-black/5 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)]"
            >
              <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4a5fb8]">
                <Activity className="h-4 w-4" aria-hidden="true" />
                {t("howWeWork.waves.diagramLabel")}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {waveSteps.map((step, i) => {
                  const isLast = i === waveSteps.length - 1;
                  return (
                    <motion.div key={step.name} variants={fadeInUp} className="relative">
                      <div
                        className={`flex h-full flex-col rounded-xl border p-5 transition-all duration-300 ease-out hover:-translate-y-1 ${
                          isLast
                            ? "border-[#f2862e]/30 bg-[#fff4e9]"
                            : "border-black/5 bg-[#f8f9fc]"
                        }`}
                      >
                        <span className="text-sm font-bold text-[#101c44]">{step.name}</span>
                        <span className="mt-2 text-xs leading-relaxed text-[#5b6472]">
                          {step.description}
                        </span>
                        {isLast && (
                          <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#f2862e]">
                            <GitBranch className="h-3 w-3" aria-hidden="true" />
                            {t("howWeWork.waves.loopLabel")}
                          </span>
                        )}
                      </div>
                      {!isLast && (
                        <ArrowRight
                          className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-[#c3c9dc] lg:block"
                          aria-hidden="true"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* TIMELINE BREAKDOWN */}
      <Reveal>
        <section className="px-6 py-24 md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4a5fb8]">
                {t("howWeWork.timeline.eyebrow")}
              </p>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[#101c44] md:text-4xl">
                {t("howWeWork.timeline.heading")}
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-[#5b6472]">
                {t("howWeWork.timeline.description")}
              </p>
            </div>

            <div className="mt-12 overflow-hidden rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)]">
              <div className="grid grid-cols-3 bg-[#101c44] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/70">
                <span>{t("howWeWork.timeline.colStage")}</span>
                <span>{t("howWeWork.timeline.colDuration")}</span>
                <span>{t("howWeWork.timeline.colMilestone")}</span>
              </div>
              {timelineRows.map((row, i) => (
                <div
                  key={row.stage}
                  className={`grid grid-cols-3 items-center px-6 py-5 text-sm ${
                    i % 2 === 0 ? "bg-white" : "bg-[#f8f9fc]"
                  }`}
                >
                  <span className="font-semibold text-[#101c44]">{row.stage}</span>
                  <span className="flex items-center gap-1.5 text-[#5b6472]">
                    <Clock className="h-3.5 w-3.5 text-[#4a5fb8]" aria-hidden="true" />
                    {row.duration}
                  </span>
                  <span className="text-[#333d54]">{row.milestone}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* SUCCESS METRICS */}
      <Reveal>
        <section className="bg-[#101c44] px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#f2862e]">
                {t("howWeWork.metrics.eyebrow")}
              </p>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
                {t("howWeWork.metrics.heading")}
              </h2>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4"
            >
              {metrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  variants={fadeInUp}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
                >
                  <div className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                    {metric.value}
                  </div>
                  <div className="mt-2 text-xs leading-relaxed text-white/60">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* CLOSING CTA BANNER */}
      <Reveal>
        <section className="border-t border-black/5 bg-[#eef1f8] px-6 py-20 md:py-24">
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 rounded-2xl bg-white p-10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)] md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <Circle className="hidden h-10 w-10 shrink-0 text-[#f2862e] md:block" aria-hidden="true" />
              <div>
                <h2 className="text-balance text-2xl font-bold tracking-tight text-[#101c44] md:text-3xl">
                  {t("howWeWork.cta.heading")}
                </h2>
                <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-[#5b6472]">
                  {t("howWeWork.cta.description")}
                </p>
              </div>
            </div>
            <Link
              href="/what-we-do"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f2862e] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(242,134,46,0.6)] transition-all duration-300 ease-out hover:bg-[#e07418] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101c44]"
            >
              {t("howWeWork.cta.button")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}