import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { COLOR, CSS_EASE, DUR, EASE } from "../../tokens";
import type { RevealFn } from "../../lib/useReveal";

/**
 * The primary action, everywhere it appears.
 *
 * A rectangle with a standing accent border, filled on hover by a plane that
 * rises from the bottom — water filling a vessel. Deliberately bottom-origin:
 * a left-to-right wipe is the generic button fill, and this site's whole
 * language is vertical pressure.
 *
 * Always an <a href="tel:…">: on a plumbing site the button IS the phone.
 */
export function CallAction({
  href,
  children,
  reveal,
  reduced,
  delay = 0,
  variant = "solid",
  className = "",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  reveal: RevealFn;
  reduced: boolean;
  delay?: number;
  /** `solid` fills on hover; `quiet` is the same shape at lower emphasis. */
  variant?: "solid" | "quiet";
  className?: string;
  ariaLabel?: string;
}) {
  const border = variant === "solid" ? COLOR.accent : COLOR.lineStrong;

  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      {...reveal(
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0 },
        { duration: DUR.body, ease: EASE, delay },
      )}
      className={`group relative inline-flex items-center justify-center overflow-hidden px-8 py-4 sm:px-10 sm:py-5 ${className}`}
      style={{ border: `1px solid ${border}` }}
    >
      {/* Rising fill. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100"
        style={{
          backgroundColor: COLOR.accent,
          transition: reduced ? "none" : `transform 0.45s ${CSS_EASE}`,
        }}
      />

      <span
        className={`relative z-10 font-mono uppercase group-hover:text-[#0B0E11] group-focus-visible:text-[#0B0E11] ${variant === "solid" ? "text-accent" : "text-warm"}`}
        style={{
          fontSize: "0.78rem",
          letterSpacing: "0.2em",
          fontWeight: 500,
          transition: reduced ? "none" : `color 0.45s ${CSS_EASE}`,
        }}
      >
        {children}
      </span>
    </motion.a>
  );
}
