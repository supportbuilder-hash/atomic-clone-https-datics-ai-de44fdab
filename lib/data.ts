export type NavLink = {
  label: string;
  href: string;
  key: string;
};

/**
 * Single source of truth for the primary navigation. Both the Navbar and the
 * Footer "Site" column map over this array; never duplicate or re-stub it.
 */
export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "What We Do", href: "/what-we-do", key: "whatWeDo" },
  { label: "How We Work", href: "/how-we-work", key: "howWeWork" },
  { label: "Work", href: "/work", key: "work" },
  { label: "About", href: "/about", key: "about" },
];

/**
 * Secondary link set used only in the footer's "More" column. Anchor hrefs
 * point at sections that live on the homepage.
 */
export const footerLinks: NavLink[] = [
  { label: "About", href: "/about", key: "about" },
  { label: "Solutions", href: "#solutions-grid", key: "solutions" },
  { label: "Our Process", href: "#engagement-process", key: "process" },
  { label: "Capability Waves", href: "#capability-waves", key: "capabilityWaves" },
];

export const BRAND = {
  name: "Datics",
  tagline: "AI product engineering for established vertical B2B SaaS.",
  email: "business@datics.ai",
  phone: "+1 (945) 297-6257",
};

export const BRAND_NAME = BRAND.name;
export const BRAND_TAGLINE = BRAND.tagline;
export const CONTACT_EMAIL = BRAND.email;
export const CONTACT_PHONE = BRAND.phone;
