import { motion } from "framer-motion";
import { CONTAINER, COLOR, DUR, EASE, TYPE } from "../tokens";
import { BUSINESS, CTA } from "../content";
import { useSectionReveal } from "../lib/useReveal";
import { Eyebrow, LineReveal } from "../components/primitives/LineReveal";
import { CallAction } from "../components/primitives/CallAction";
import { Hairline } from "../components/primitives/Hairline";

/**
 * The page resolves into one action: the phone number.
 *
 * No form. Someone with water coming through a ceiling is not filling in
 * fields, and a form would be the first generic element on the page. The number
 * appears three times on the route to here — header, sticky bar, and this —
 * which is the whole conversion strategy for a trade like this one.
 */
export default function FinalCTA() {
  const { ref, reveal, reduced } = useSectionReveal();

  return (
    <section
      id="kontakt"
      ref={ref}
      aria-labelledby="kontakt-heading"
      className="relative overflow-hidden"
      style={{ backgroundColor: COLOR.raised }}
    >
      <div
        className={`${CONTAINER} relative z-10 flex min-h-[62vh] flex-col justify-end py-20 sm:py-24 lg:min-h-[70vh] lg:py-28`}
      >
        <Hairline reveal={reveal} accent className="mb-12 lg:mb-16" />

        <Eyebrow reveal={reveal} delay={0.05}>
          {CTA.eyebrow}
        </Eyebrow>

        <LineReveal
          reveal={reveal}
          id="kontakt-heading"
          lines={[CTA.lineOne, CTA.lineTwo]}
          size={TYPE.h1}
          weight={700}
          delay={0.12}
          className="mt-6"
        />

        <motion.a
          href={BUSINESS.phoneHref}
          {...reveal(
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0 },
            { duration: DUR.body, ease: EASE, delay: 0.34 },
          )}
          className="mt-12 block font-mono tabular-nums"
          style={{
            color: COLOR.accent,
            fontSize: "clamp(2rem, 6.5vw, 4.2rem)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
          aria-label={`Zadzwoń: ${BUSINESS.phone}`}
        >
          {BUSINESS.phone}
        </motion.a>

        <div className="mt-12">
          <CallAction
            href={BUSINESS.phoneHref}
            reveal={reveal}
            reduced={reduced}
            delay={0.44}
            ariaLabel={`Zadzwoń: ${BUSINESS.phone}`}
          >
            {CTA.action}
          </CallAction>
        </div>
      </div>
    </section>
  );
}
