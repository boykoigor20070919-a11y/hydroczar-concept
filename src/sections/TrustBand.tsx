import { motion } from "framer-motion";
import { CONTAINER, COLOR, DUR, EASE, STAGGER, TYPE } from "../tokens";
import { TRUST, TRUST_FOOTNOTE } from "../content";
import { useSectionReveal } from "../lib/useReveal";
import { StaticHairline } from "../components/primitives/Hairline";

/**
 * Four verified figures, set in the mono face so they read as instrument
 * values rather than marketing.
 *
 * Every number on this site comes from the Google profile, and the asterisk on
 * the availability figure is resolved by one footnote directly beneath — so
 * the claim is qualified where it is made, not in a page footer nobody reads.
 * No stronger availability or response-time wording appears anywhere else.
 */
export default function TrustBand() {
  const { ref, reveal } = useSectionReveal();

  return (
    <section
      ref={ref}
      aria-label="Dane z profilu Google"
      style={{ backgroundColor: COLOR.raised }}
    >
      <StaticHairline />

      <div className={`${CONTAINER} py-10 sm:py-12`}>
        <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-8 p-0 md:grid-cols-4 md:gap-x-4">
          {TRUST.map((item, i) => (
            <li key={item.label}>
              <motion.div
                {...reveal(
                  { opacity: 0, y: 14 },
                  { opacity: 1, y: 0 },
                  {
                    duration: DUR.body,
                    ease: EASE,
                    delay: i * STAGGER.stats,
                  },
                )}
                className="md:border-l md:pl-6"
                style={{ borderColor: COLOR.line }}
              >
                <span
                  aria-hidden="true"
                  className="mb-4 block h-[2px] w-6"
                  style={{ backgroundColor: COLOR.accent }}
                />

                <p
                  className="font-mono tabular-nums"
                  style={{
                    color: COLOR.text,
                    fontSize: TYPE.stat,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                  {item.mark && (
                    <span style={{ color: COLOR.accent }} aria-hidden="true">
                      *
                    </span>
                  )}
                </p>

                <p
                  className="mt-3 font-mono uppercase"
                  style={{
                    color: COLOR.muted,
                    fontSize: TYPE.meta,
                    letterSpacing: "0.18em",
                  }}
                >
                  {item.label}
                </p>
              </motion.div>
            </li>
          ))}
        </ul>

        <motion.p
          {...reveal(
            { opacity: 0 },
            { opacity: 1 },
            { duration: DUR.small, ease: EASE, delay: 0.4 },
          )}
          className="mt-10 font-mono"
          style={{
            color: COLOR.muted,
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
            lineHeight: 1.6,
          }}
        >
          {TRUST_FOOTNOTE}
        </motion.p>
      </div>

      <StaticHairline />
    </section>
  );
}
