/**
 * HydroCzar design tokens.
 *
 * This file is the whole visual identity. Nothing below is shared with the
 * MegaRemont concept it was forked from: different ground, different type,
 * different easing. The only things carried over are the mechanisms —
 * `useReveal`, `useMediaQuery`, the asset resolver — never the look.
 *
 * Contrast values quoted below are computed against `COLOR.base`, per WCAG.
 */

/** Entrances. Sharper than a standard expo-out — it arrives and stops. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Anything water-driven: the pipe fill, the display-word level. */
export const EASE_FLOW: [number, number, number, number] = [0.65, 0, 0.35, 1];

/** The same entrance curve for CSS transitions, so JS and CSS agree. */
export const CSS_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** One scroll trigger for the whole site. */
export const VIEWPORT = { once: true, margin: "-60px" } as const;

export const FONT_DISPLAY = "'Archivo', system-ui, sans-serif";
/** Every number on the site is set in this: rating, count, phone, indices. */
export const FONT_MONO = "'IBM Plex Mono', ui-monospace, 'SFMono-Regular', monospace";

export const COLOR = {
  /** Cool graphite. Deliberately blue-shifted, not a neutral black. */
  base: "#0B0E11",
  /** One step up, for the trust band and the sticky bar. */
  raised: "#12171B",

  /** Warm white — all body and display type. ~18:1 on base. */
  text: "#F4F1EC",
  /** Cool grey for secondary type. 6.3:1 on base — clears AA at any size. */
  muted: "#8B959C",
  /** 4.3:1 — LARGE or decorative text only (AA large needs 3:1). */
  faint: "#6B757C",

  /** The one accent. 9.4:1 on base, so it is safe for text as well as line. */
  accent: "#4FC3DE",
  accentSoft: "rgba(79, 195, 222, 0.30)",
  accentFaint: "rgba(79, 195, 222, 0.12)",

  /** Hairlines: the only dividers on the site. */
  line: "rgba(244, 241, 236, 0.10)",
  lineStrong: "rgba(244, 241, 236, 0.26)",
} as const;

export const DUR = {
  heading: 0.8,
  body: 0.6,
  small: 0.5,
  rule: 1.0,
  flow: 1.4,
} as const;

export const STAGGER = {
  services: 0.06,
  stats: 0.08,
  lines: 0.09,
} as const;

export const TYPE = {
  /**
   * Decorative wordmark, cropped by the hero's bottom edge. Sized so
   * "HYDROCZAR" (9 characters, ~6.1em of advance in Archivo 700 at this
   * tracking) stays on one line from 360px to ultra-wide.
   */
  display: "clamp(2.6rem, 14vw, 12rem)",
  /** The page's single H1. */
  h1: "clamp(2.4rem, 6vw, 4.6rem)",
  sub: "clamp(1.02rem, 1.7vw, 1.35rem)",
  sectionHeading: "clamp(1.9rem, 3.2vw, 2.8rem)",
  serviceName: "clamp(1.2rem, 2.6vw, 2.1rem)",
  /** Mono figures in the trust band and the reviews aggregate. */
  stat: "clamp(1.5rem, 3.2vw, 2.4rem)",
  /** The phone number, wherever it is the primary action. */
  phone: "clamp(1.5rem, 3.6vw, 2.6rem)",
  eyebrow: "0.7rem",
  meta: "0.72rem",
} as const;

/** Shared container and vertical rhythm. */
export const CONTAINER = "mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-14";
export const SECTION_Y = "py-20 sm:py-24 lg:py-32";
