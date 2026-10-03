import { useState } from "react";
import { motion } from "framer-motion";
import {
  CONTAINER,
  COLOR,
  CSS_EASE,
  DUR,
  EASE,
  SECTION_Y,
  STAGGER,
  TYPE,
} from "../tokens";
import { SERVICES, SERVICES_SECTION } from "../content";
import { useSectionReveal } from "../lib/useReveal";
import { AccentTick, StaticHairline } from "../components/primitives/Hairline";
import { Eyebrow, LineReveal } from "../components/primitives/LineReveal";

/**
 * Editorial index of the service categories.
 *
 * Names only, deliberately. Any sentence under these headings would be an
 * unverified claim about scope, method or speed, and this concept states
 * nothing the owner has not confirmed. The composition carries the weight
 * instead: full-bleed rows, a small mono index, and an accent rule that draws
 * across the row on hover or focus — pressure moving through a line.
 */
export default function Services() {
  const { ref, reveal, reduced } = useSectionReveal();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="uslugi"
      ref={ref}
      aria-labelledby="uslugi-heading"
      className="relative"
      style={{ backgroundColor: COLOR.base }}
    >
      <div className={`${CONTAINER} ${SECTION_Y}`}>
        <AccentTick reveal={reveal} />
        <Eyebrow reveal={reveal} delay={0.06} className="mt-5">
          {SERVICES_SECTION.eyebrow}
        </Eyebrow>
        <LineReveal
          reveal={reveal}
          id="uslugi-heading"
          lines={[SERVICES_SECTION.heading]}
          size={TYPE.sectionHeading}
          weight={700}
          delay={0.12}
          className="mt-4"
        />

        <p className="mt-6 max-w-xl font-mono text-xs leading-relaxed text-muted">Proponowany zakres strony. Kategorie usług do potwierdzenia z właścicielem.</p>
        <ol className="m-0 mt-14 list-none p-0 sm:mt-16">
          {SERVICES.map((name, i) => {
            const isActive = active === i;
            return (
              <li key={name}>
                <motion.div
                  {...reveal(
                    { opacity: 0, y: 18 },
                    { opacity: 1, y: 0 },
                    {
                      duration: DUR.body,
                      ease: EASE,
                      delay: 0.1 + i * STAGGER.services,
                    },
                  )}
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive(null)}
                  className="relative border-t py-7 sm:py-9"
                  style={{ borderColor: COLOR.line }}
                >
                  {/* The accent rule: pressure travelling along the row. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-px w-full origin-left"
                    style={{
                      backgroundColor: COLOR.accent,
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transition: reduced
                        ? "none"
                        : `transform 0.6s ${CSS_EASE}`,
                    }}
                  />

                  <div
                    className="flex items-baseline gap-5 sm:gap-8"
                    style={{
                      transform:
                        isActive && !reduced ? "translateX(8px)" : "none",
                      transition: reduced
                        ? "none"
                        : `transform 0.5s ${CSS_EASE}`,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-mono tabular-nums"
                      style={{
                        color: isActive ? COLOR.accent : COLOR.muted,
                        fontSize: TYPE.meta,
                        letterSpacing: "0.12em",
                        transition: reduced
                          ? "none"
                          : `color 0.4s ${CSS_EASE}`,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h3
                      className="font-display"
                      style={{
                        color: COLOR.text,
                        fontSize: TYPE.serviceName,
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.15,
                      }}
                    >
                      {name}
                    </h3>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ol>

        <StaticHairline />
      </div>
    </section>
  );
}
