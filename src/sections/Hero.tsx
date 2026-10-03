import { useEffect } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { CONTAINER, COLOR, DUR, EASE, EASE_FLOW, TYPE } from "../tokens";
import { BUSINESS, HERO } from "../content";
import { useSectionReveal } from "../lib/useReveal";
import { Eyebrow, LineReveal } from "../components/primitives/LineReveal";
import { CallAction } from "../components/primitives/CallAction";

/** Where the water settles in the wordmark, as a percentage of its height. */
const FILL_LEVEL = 26;

export default function Hero() {
  // Above the fold: plays on mount, not on scroll.
  const { ref, reveal, reduced } = useSectionReveal(true);

  /**
   * The wordmark fills with water on load: a hard-edged gradient stop rising
   * through the letterforms via background-clip, so the type itself becomes the
   * vessel. One motion value, no canvas, no repaint of anything else.
   */
  const level = useMotionValue(reduced ? FILL_LEVEL : 0);
  const levelPct = useTransform(level, (v: number) => `${v}%`);
  const wordFill = useMotionTemplate`linear-gradient(to top, rgba(79,195,222,0.62) ${levelPct}, rgba(244,241,236,0.13) ${levelPct})`;

  useEffect(() => {
    if (reduced) {
      level.set(FILL_LEVEL);
      return;
    }
    const controls = animate(level, FILL_LEVEL, {
      duration: 1.8,
      ease: EASE_FLOW,
      delay: 0.5,
    });
    return () => controls.stop();
  }, [level, reduced]);

  return (
    <section
      id="gora"
      ref={ref}
      className="relative flex min-h-[92svh] w-full flex-col overflow-hidden"
      aria-labelledby="hero-heading"
      style={{ backgroundColor: COLOR.base }}
    >
      {/* Ambient flow field. Static by design — the motion budget belongs to
          the wordmark fill here and to the pipe section further down. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="flowFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={COLOR.accent} stopOpacity="0" />
            <stop offset="45%" stopColor={COLOR.accent} stopOpacity="0.5" />
            <stop offset="100%" stopColor={COLOR.accent} stopOpacity="0" />
          </linearGradient>
          <radialGradient id="vignette" cx="50%" cy="38%" r="75%">
            <stop offset="0%" stopColor="#0B0E11" stopOpacity="0" />
            <stop offset="100%" stopColor="#0B0E11" stopOpacity="0.85" />
          </radialGradient>
        </defs>

        {[140, 212, 284, 356, 428].map((y, i) => (
          <path
            key={y}
            d={`M-40 ${y} C 220 ${y - 34 - i * 5}, 420 ${y + 34 + i * 5}, 660 ${y} S 1020 ${y - 26}, 1240 ${y + 12}`}
            fill="none"
            stroke="url(#flowFade)"
            strokeWidth={i === 2 ? 1.4 : 0.8}
            opacity={0.5 - i * 0.06}
          />
        ))}

        <rect width="1200" height="800" fill="url(#vignette)" />
      </svg>

      {/* ------------------------------------------------------- content */}
      <div className="relative z-10 flex min-h-[92svh] flex-col justify-end pt-28">
        <div className={`${CONTAINER} pb-8 sm:pb-10`}>
          <Eyebrow reveal={reveal}>{HERO.eyebrow}</Eyebrow>

          <LineReveal
            reveal={reveal}
            id="hero-heading"
            level={1}
            lines={[HERO.h1]}
            size={TYPE.h1}
            weight={700}
            delay={0.12}
            className="mt-6"
          />

          <motion.p
            {...reveal(
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0 },
              { duration: DUR.body, ease: EASE, delay: 0.3 },
            )}
            className="mt-6 max-w-[34ch] font-display"
            style={{
              color: COLOR.muted,
              fontSize: TYPE.sub,
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            {HERO.sub}
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center gap-5 sm:gap-7">
            <CallAction
              href={BUSINESS.phoneHref}
              reveal={reveal}
              reduced={reduced}
              delay={0.42}
              ariaLabel={`Zadzwoń: ${BUSINESS.phone}`}
            >
              {HERO.cta}
            </CallAction>

            <motion.a
              href={BUSINESS.phoneHref}
              {...reveal(
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0 },
                { duration: DUR.small, ease: EASE, delay: 0.5 },
              )}
              className="font-mono tabular-nums"
              style={{
                color: COLOR.text,
                fontSize: TYPE.phone,
                letterSpacing: "-0.01em",
                fontWeight: 500,
              }}
            >
              {BUSINESS.phone}
            </motion.a>
          </div>
        </div>

        {/* ------------------------------------------- decorative wordmark */}
        <div
          aria-hidden="true"
          className="relative w-full select-none overflow-hidden"
        >
          <motion.span
            {...reveal(
              { opacity: 0, y: "30%" },
              { opacity: 1, y: "0%" },
              { duration: 1.1, ease: EASE, delay: 0.35 },
            )}
            className="block w-full whitespace-nowrap text-center font-display"
            style={{
              fontSize: TYPE.display,
              fontWeight: 700,
              lineHeight: 0.8,
              letterSpacing: "-0.045em",
              marginBottom: "-0.16em",
              backgroundImage: wordFill,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            {HERO.display}
          </motion.span>
        </div>
      </div>
    </section>
  );
}
