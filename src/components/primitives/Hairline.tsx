import { motion } from "framer-motion";
import { COLOR, DUR, EASE } from "../../tokens";
import type { RevealFn } from "../../lib/useReveal";

/**
 * The site's only divider. Draws from the left on entry.
 *
 * `accent` swaps the warm-white hairline for the cyan one — used sparingly, to
 * mark the start of a section rather than to separate rows.
 */
export function Hairline({
  reveal,
  delay = 0,
  accent = false,
  strong = false,
  className = "",
}: {
  reveal: RevealFn;
  delay?: number;
  accent?: boolean;
  strong?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      aria-hidden="true"
      {...reveal(
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1 },
        { duration: DUR.rule, ease: EASE, delay },
      )}
      className={`h-px w-full origin-left ${className}`}
      style={{
        backgroundColor: accent
          ? COLOR.accent
          : strong
            ? COLOR.lineStrong
            : COLOR.line,
        opacity: accent ? 0.7 : 1,
      }}
    />
  );
}

/** Non-animating hairline, for section boundaries and fixed chrome. */
export function StaticHairline({
  accent = false,
  className = "",
}: {
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`h-px w-full ${className}`}
      style={{ backgroundColor: accent ? COLOR.accentSoft : COLOR.line }}
    />
  );
}

/**
 * A short accent segment that sits at the head of a section, above the
 * eyebrow. Two tokens of the brand in one mark: the hairline and the cyan.
 */
export function AccentTick({
  reveal,
  delay = 0,
}: {
  reveal: RevealFn;
  delay?: number;
}) {
  return (
    <motion.span
      aria-hidden="true"
      {...reveal(
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1 },
        { duration: 0.7, ease: EASE, delay },
      )}
      className="block h-[2px] w-10 origin-left"
      style={{ backgroundColor: COLOR.accent }}
    />
  );
}
