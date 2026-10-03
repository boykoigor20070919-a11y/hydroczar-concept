import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { COLOR, DUR, EASE, STAGGER } from "../../tokens";
import type { RevealFn } from "../../lib/useReveal";

/**
 * Heading treatment for the whole site: each line rises from behind a mask.
 *
 * This is the identity move — chosen precisely because it is nothing like the
 * grey→white fade the forked codebase used. Nothing fades; lines are clipped
 * and pushed up, which reads as mechanical rather than atmospheric and suits a
 * trade that deals in pressure and flow.
 *
 * Under reduced motion the mask still exists but the line starts in place, so
 * the type is never hidden waiting on an animation.
 */
export function LineReveal({
  reveal,
  lines,
  level = 2,
  id,
  size,
  weight = 700,
  color = COLOR.text,
  delay = 0,
  className = "",
  lineMaxCh,
}: {
  reveal: RevealFn;
  lines: string[];
  level?: 1 | 2;
  id?: string;
  size: string;
  weight?: 500 | 700;
  color?: string;
  delay?: number;
  className?: string;
  /**
   * Measure cap in `ch`, applied to the LINE ELEMENTS, never to the heading.
   * `ch` resolves against the font size of the element carrying it, and
   * Tailwind's preflight resets heading font-size to `inherit` — so a cap on
   * the <h1> would silently resolve against 16px.
   */
  lineMaxCh?: number;
}) {
  const body = lines.map((line, i) => (
    <span
      key={line}
      className="block overflow-hidden"
      style={lineMaxCh === undefined ? undefined : { maxWidth: `${lineMaxCh}ch`, fontSize: size }}
    >
      <motion.span
        {...reveal(
          { y: "110%" },
          { y: "0%" },
          {
            duration: DUR.heading,
            ease: EASE,
            delay: delay + i * STAGGER.lines,
          },
        )}
        className="block"
        style={{
          fontSize: size,
          fontWeight: weight,
          lineHeight: 1.04,
          letterSpacing: "-0.03em",
          color,
        }}
      >
        {line}
      </motion.span>
    </span>
  ));

  return level === 1 ? (
    <h1 id={id} className={className}>
      {body}
    </h1>
  ) : (
    <h2 id={id} className={className}>
      {body}
    </h2>
  );
}

/** Small spaced-caps label in the mono face. Sits above every heading. */
export function Eyebrow({
  reveal,
  children,
  delay = 0,
  className = "",
}: {
  reveal: RevealFn;
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.p
      {...reveal(
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0 },
        { duration: DUR.small, ease: EASE, delay },
      )}
      className={`font-mono uppercase ${className}`}
      style={{
        color: COLOR.muted,
        fontSize: "0.7rem",
        letterSpacing: "0.22em",
      }}
    >
      {children}
    </motion.p>
  );
}
