/**
 * Every factual string on the site, with its provenance.
 *
 * RULE — nothing enters this file unverified. No years of experience, no
 * guarantees, no prices, no certifications, no service radius, no response
 * times, no "najszybciej / najtaniej / od ręki". The 24/7 figure is what the
 * Google profile displays and is marked with an asterisk everywhere it
 * appears, resolved by one footnote under the trust band.
 *
 * Rating and review count move over time, so they are date-stamped rather
 * than presented as timeless.
 */

export const BUSINESS = {
  name: "HydroCzar",
  city: "Opole",
  /** Verified. */
  phone: "669 578 699",
  /** E.164 for tel:. 669 578 699 is a Polish national mobile number. */
  phoneHref: "tel:+48669578699",

  /** Google profile, read 25.09.2026. */
  rating: "5.0",
  reviews: "59",
  availability: "24/7",
  asOf: "25.09.2026",
} as const;

/* ------------------------------------------------------------------ Hero */

export const HERO = {
  /** Decorative wordmark — aria-hidden. Not a heading. */
  display: "HYDROCZAR",
  eyebrow: "Hydraulik · Opole",
  /** The page's only H1. */
  h1: "Hydraulik Opole",
  sub: "Pomoc wtedy, kiedy jej potrzebujesz.",
  cta: "Zadzwoń teraz",
} as const;

/* ---------------------------------------------------------- Trust metrics */

export type TrustItem = { value: string; label: string; mark?: boolean };

/**
 * Exactly the four figures approved, in the approved order. `mark` renders the
 * asterisk that the footnote below resolves.
 */
export const TRUST: TrustItem[] = [
  { value: BUSINESS.rating, label: "Google" },
  { value: BUSINESS.reviews, label: "opinii" },
  { value: BUSINESS.city, label: "lokalizacja" },
  { value: BUSINESS.availability, label: "dostępność", mark: true },
];

export const TRUST_FOOTNOTE = `Dane z profilu Google: ${BUSINESS.asOf}. * Profil wskazuje 24/7; aktualną dostępność potwierdź telefonicznie.`;

/* -------------------------------------------------------------- Usługi */

/**
 * Concept categories only. Deliberately NO descriptions: any sentence under
 * these names would be an unverified claim about scope, method or speed.
 * Owner confirmation needed before copy is written for them.
 */
export const SERVICES_SECTION = {
  eyebrow: "Zakres",
  heading: "Usługi",
} as const;

export const SERVICES: string[] = [
  "Awarie hydrauliczne",
  "Instalacje wodne",
  "Naprawy i wymiany",
  "Armatura i urządzenia",
  "Odpływy i kanalizacja",
  "Instalacje grzewcze",
];

/* --------------------------------------------------------------- Przepływ */

/**
 * Neutral system vocabulary describing how a plumbing installation is
 * organised — not a claim about what this business does or how fast.
 */
export const FLOW_SECTION = {
  eyebrow: "Instalacja",
  heading: "Od przyłącza do odpływu",
  nodes: ["Przyłącze", "Ciśnienie", "Rozprowadzenie", "Odpływ"],
} as const;

/* ---------------------------------------------------------------- Opinie */

export type Review = {
  author: string;
  body: string;
  /** ISO date as published. */
  date: string;
};

/**
 * EMPTY BY DESIGN. Individual quotes render only when verified ones are pasted
 * in here; until then the section stands on the aggregate, which is verified.
 * Never populate this with written-for-the-page testimonials.
 */
export const REVIEWS: Review[] = [];

export const REVIEWS_SECTION = {
  eyebrow: "Zaufanie",
  heading: "Opinie",
} as const;

/* --------------------------------------------------------------- Kontakt */

export const CTA = {
  eyebrow: "Kontakt",
  /**
   * NON-BREAKING spaces (U+00A0) bind "Nie czekaj." and "do HydroCzar". Both
   * lines wrap at 390 and without this the break can strand a single short word
   * on its own line. Screen readers announce them as ordinary spaces.
   */
  lineOne: "Awaria? Nie\u00A0czekaj.",
  lineTwo: "Zadzwoń do\u00A0HydroCzar",
  action: "Zadzwoń teraz",
} as const;

/* ------------------------------------------------------------- Nawigacja */

export const NAV = [
  { href: "#uslugi", label: "Usługi" },
  { href: "#instalacja", label: "Instalacja" },
  { href: "#opinie", label: "Opinie" },
  { href: "#kontakt", label: "Kontakt" },
] as const;
