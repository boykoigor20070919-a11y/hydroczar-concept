import { motion } from "framer-motion";
import { CONTAINER, COLOR, DUR, EASE, SECTION_Y, TYPE } from "../tokens";
import { BUSINESS, REVIEWS, REVIEWS_SECTION } from "../content";
import { useSectionReveal } from "../lib/useReveal";
import { AccentTick, StaticHairline } from "../components/primitives/Hairline";
import { Eyebrow, LineReveal } from "../components/primitives/LineReveal";

/**
 * Reviews, built around the one thing that is verified: the aggregate.
 *
 * The quote list is driven by `REVIEWS` in content.ts, which is empty. Nothing
 * here is written for the page — no invented names, no invented praise — and
 * the section is designed to look finished without quotes, so there is no
 * "testimonials coming soon" hole to apologise for. Paste verified reviews into
 * that array and the grid appears underneath with no other change.
 */
export default function Reviews() {
  const { ref, reveal } = useSectionReveal();

  return (
    <section
      id="opinie"
      ref={ref}
      aria-labelledby="opinie-heading"
      style={{ backgroundColor: COLOR.base }}
    >
      <div className={`${CONTAINER} ${SECTION_Y}`}>
        <AccentTick reveal={reveal} />
        <Eyebrow reveal={reveal} delay={0.06} className="mt-5">
          {REVIEWS_SECTION.eyebrow}
        </Eyebrow>
        <LineReveal
          reveal={reveal}
          id="opinie-heading"
          lines={[REVIEWS_SECTION.heading]}
          size={TYPE.sectionHeading}
          weight={700}
          delay={0.12}
          className="mt-4"
        />

        <div className="mt-14 flex flex-col gap-10 sm:mt-16 sm:flex-row sm:items-end sm:gap-16">
          {/* The rating, as an instrument reading. */}
          <motion.div
            {...reveal(
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0 },
              { duration: DUR.body, ease: EASE, delay: 0.16 },
            )}
          >
            <p
              className="font-mono tabular-nums"
              style={{
                color: COLOR.text,
                fontSize: "clamp(3.4rem, 9vw, 6.5rem)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
              }}
            >
              {BUSINESS.rating}
            </p>

            <div className="mt-5 flex gap-[6px]" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="block h-[3px] w-7"
                  style={{ backgroundColor: COLOR.accent }}
                />
              ))}
            </div>
          </motion.div>

          <motion.dl
            {...reveal(
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0 },
              { duration: DUR.body, ease: EASE, delay: 0.26 },
            )}
            className="m-0 flex gap-12"
          >
            <div>
              <dt
                className="font-mono uppercase"
                style={{
                  color: COLOR.muted,
                  fontSize: TYPE.meta,
                  letterSpacing: "0.18em",
                }}
              >
                opinii
              </dt>
              <dd
                className="mt-2 font-mono tabular-nums"
                style={{
                  color: COLOR.text,
                  fontSize: TYPE.stat,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                {BUSINESS.reviews}
              </dd>
            </div>

            <div>
              <dt
                className="font-mono uppercase"
                style={{
                  color: COLOR.muted,
                  fontSize: TYPE.meta,
                  letterSpacing: "0.18em",
                }}
              >
                lokalizacja
              </dt>
              <dd
                className="mt-2 font-mono"
                style={{
                  color: COLOR.text,
                  fontSize: TYPE.stat,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                {BUSINESS.city}
              </dd>
            </div>
          </motion.dl>
        </div>

        {/* Verified quotes only. Empty until real ones are supplied. */}
        {REVIEWS.length > 0 && (
          <ul className="m-0 mt-16 grid list-none gap-px p-0 md:grid-cols-3">
            {REVIEWS.map((review, i) => (
              <li key={`${review.author}-${review.date}`}>
                <motion.figure
                  {...reveal(
                    { opacity: 0, y: 18 },
                    { opacity: 1, y: 0 },
                    { duration: DUR.body, ease: EASE, delay: 0.1 + i * 0.07 },
                  )}
                  className="m-0 border-t pt-8"
                  style={{ borderColor: COLOR.line }}
                >
                  <blockquote
                    className="m-0 font-display"
                    style={{
                      color: COLOR.text,
                      fontSize: "1.02rem",
                      lineHeight: 1.6,
                      fontWeight: 500,
                    }}
                  >
                    {review.body}
                  </blockquote>
                  <figcaption
                    className="mt-5 font-mono uppercase"
                    style={{
                      color: COLOR.muted,
                      fontSize: TYPE.meta,
                      letterSpacing: "0.16em",
                    }}
                  >
                    {review.author}
                  </figcaption>
                </motion.figure>
              </li>
            ))}
          </ul>
        )}

        <StaticHairline className="mt-16" />
      </div>
    </section>
  );
}
