"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Sparkles, GitBranch, Activity, ArrowRight, User } from 'lucide-react';
import { Reveal } from "@/components/Reveal";

const CONTACT_EMAIL = "business@datics.ai";

interface StoryCard {
  title: string;
  body: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface PartnerItem {
  name: string;
  role: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const PARTNER_ICONS = [Sparkles, GitBranch, Activity];

export default function AboutPage() {
  const t = useTranslations();

  const storyCards = (
    Array.isArray(t.raw("about.story.cards")) ? t.raw("about.story.cards") : []
  ) as StoryCard[];

  const statItems = (
    Array.isArray(t.raw("about.stats.items")) ? t.raw("about.stats.items") : []
  ) as StatItem[];

  const partnerItems = (
    Array.isArray(t.raw("about.partners.items")) ? t.raw("about.partners.items") : []
  ) as PartnerItem[];

  const teamMembers = (
    Array.isArray(t.raw("about.team.members")) ? t.raw("about.team.members") : []
  ) as TeamMember[];

  return (
    <main className="bg-[hsl(var(--background))]">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden bg-slate-900 px-6 py-24 text-white md:py-32">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              {t("about.hero.eyebrow")}
            </p>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {t("about.hero.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
              {t("about.hero.body")}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {t("about.hero.ctaPrimary")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t("about.hero.ctaSecondary")}
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Company story */}
      <Reveal>
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  {t("about.story.eyebrow")}
                </p>
                <h2 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl">
                  {t("about.story.title")}
                </h2>
              </div>
              <p className="text-pretty text-base leading-relaxed text-slate-600 md:text-lg">
                {t("about.story.body")}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {storyCards.map((card, i) => (
                <Reveal key={card.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1">
                    <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                      {card.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Why Datics stats */}
      <Reveal>
        <section className="bg-slate-50 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  {t("about.stats.eyebrow")}
                </p>
                <h2 className="mt-4 max-w-xl text-balance text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl">
                  {t("about.stats.title")}
                </h2>
              </div>
              <p className="max-w-sm text-pretty text-sm leading-relaxed text-slate-600 md:text-base">
                {t("about.stats.body")}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {statItems.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06}>
                  <div className="rounded-2xl border border-[hsl(var(--border))] bg-white p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
                    <div className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                      {s.value}
                    </div>
                    <div className="mt-2 text-xs font-medium uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Partner / ecosystem credibility */}
      <Reveal>
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              {t("about.partners.eyebrow")}
            </p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl">
              {t("about.partners.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600">
              {t("about.partners.body")}
            </p>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {partnerItems.map((p, i) => {
                const Icon = PARTNER_ICONS[i % PARTNER_ICONS.length] ?? Sparkles;
                return (
                  <Reveal key={p.name} delay={i * 0.08}>
                    <div className="h-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_28px_-10px_rgba(0,0,0,0.12)]">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-slate-900">{p.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                        {p.description}
                      </p>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {p.role}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Team highlights */}
      <Reveal>
        <section className="bg-slate-50 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              {t("about.team.eyebrow")}
            </p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl">
              {t("about.team.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600">
              {t("about.team.body")}
            </p>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, i) => (
                <Reveal key={member.name} delay={i * 0.07}>
                  <div className="group h-full overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-300">
                          <User className="h-10 w-10" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-slate-900">{member.name}</h3>
                      <p className="mt-0.5 text-sm font-medium text-[var(--accent)]">{member.role}</p>
                      <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Closing CTA banner */}
      <Reveal>
        <section className="bg-slate-900 px-6 py-20 text-white md:py-24">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                {t("about.cta.title")}
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-white/70">
                {t("about.cta.body")}
              </p>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t("about.cta.button")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </Reveal>
    </main>
  );
}