import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CONTAINER, COLOR, DUR, EASE, SECTION_Y, TYPE } from "../tokens";
import { FLOW_SECTION } from "../content";
import { useSectionReveal } from "../lib/useReveal";
import { useIsDesktop } from "../lib/useMediaQuery";
import { AccentTick } from "../components/primitives/Hairline";
import { Eyebrow, LineReveal } from "../components/primitives/LineReveal";

/**
 * The signature section: an installation schematic that fills with water as
 * you scroll.
 *
 * Built as one inline SVG driven by a single `useScroll` motion value into
 * `strokeDashoffset`. No WebGL, no canvas, no library: a shader for this would
 * add ~150KB and battery drain to produce four seconds of water on a phone at
 * the side of a job. Everything here is one compositor-friendly property on
 * one path.
 *
 * Node labels light up as the fill passes them, which is what turns a decorative
 * animation into a diagram you can actually read.
 *
 * Reduced motion / mobile: the pipe renders fully filled and static, all nodes
 * lit. Nothing is scroll-linked and no work happens on the main thread.
 */

/** Where each node sits along the path, 0–1. */
const NODE_AT = [0, 340 / 1320, 690 / 1320, 1];

export default function FlowSection() {
  const { ref, reveal, reduced } = useSectionReveal();
  const isDesktop = useIsDesktop();
  const trackRef = useRef<HTMLDivElement>(null);

  const linked = isDesktop && !reduced;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 45%"],
  });

  /** 1 = empty, 0 = full, matching strokeDasharray="1". */
  const dashOffset = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [lit, setLit] = useState<number>(linked ? -1 : NODE_AT.length - 1);

  useEffect(() => {
    if (!linked) {
      setLit(NODE_AT.length - 1);
      return;
    }
    const syncNodes = (v: number) => {
      let n = -1;
      for (let i = 0; i < NODE_AT.length; i++) if (v >= NODE_AT[i]) n = i;
      setLit(n);
    };
    syncNodes(scrollYProgress.get());
    return scrollYProgress.on("change", syncNodes);
  }, [linked, scrollYProgress]);

  return (
    <section
      id="instalacja"
      ref={ref}
      aria-labelledby="instalacja-heading"
      className="relative overflow-hidden"
      style={{ backgroundColor: COLOR.base }}
    >
      <div className={`${CONTAINER} ${SECTION_Y}`}>
        <AccentTick reveal={reveal} />
        <Eyebrow reveal={reveal} delay={0.06} className="mt-5">
          {FLOW_SECTION.eyebrow}
        </Eyebrow>
        <LineReveal
          reveal={reveal}
          id="instalacja-heading"
          lines={[FLOW_SECTION.heading]}
          size={TYPE.sectionHeading}
          weight={700}
          delay={0.12}
          className="mt-4"
        />

        {/* The scroll track. Tall enough that the fill reads as a journey
            rather than a flicker, short enough not to hijack the page. */}
        <div ref={trackRef} className="relative mt-16 sm:mt-20">
          <motion.div
            {...reveal(
              { opacity: 0 },
              { opacity: 1 },
              { duration: DUR.body, ease: EASE },
            )}
          >
            <svg
              viewBox="0 0 1000 340"
              className="block h-auto w-full"
              role="img"
              aria-label="Schemat instalacji: przyłącze, ciśnienie, rozprowadzenie, odpływ."
            >
              <defs>
                <linearGradient id="pipeHead" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={COLOR.accent} stopOpacity="0.55" />
                  <stop offset="100%" stopColor={COLOR.accent} stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Empty pipe. */}
              <path
                d={PIPE}
                fill="none"
                stroke={COLOR.line}
                strokeWidth="10"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
              <path
                d={PIPE}
                fill="none"
                stroke={COLOR.base}
                strokeWidth="6"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />

              {/* Water. */}
              <motion.path
                d={PIPE}
                fill="none"
                stroke="url(#pipeHead)"
                strokeWidth="6"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={linked ? dashOffset : 0}
                style={{
                  filter: isDesktop
                    ? "drop-shadow(0 0 6px rgba(79,195,222,0.45))"
                    : undefined,
                }}
              />

              {/* Junction marks. */}
              {JUNCTIONS.map(([x, y], i) => (
                <rect
                  key={`${x}-${y}`}
                  x={x - 7}
                  y={y - 7}
                  width="14"
                  height="14"
                  fill={COLOR.base}
                  stroke={i <= lit ? COLOR.accent : COLOR.line}
                  strokeWidth="2"
                  style={{
                    transition: reduced ? "none" : "stroke 0.4s ease",
                  }}
                />
              ))}
            </svg>
          </motion.div>

          {/* Node labels, in the mono voice. */}
          <ol className="m-0 mt-10 grid list-none grid-cols-2 gap-x-6 gap-y-6 p-0 md:grid-cols-4">
            {FLOW_SECTION.nodes.map((node, i) => {
              const on = i <= lit;
              return (
                <li key={node}>
                  <span
                    aria-hidden="true"
                    className="mb-3 block h-[2px] w-5"
                    style={{
                      backgroundColor: on ? COLOR.accent : COLOR.line,
                      transition: reduced ? "none" : "background-color 0.4s ease",
                    }}
                  />
                  <p
                    className="font-mono uppercase"
                    style={{
                      color: on ? COLOR.text : COLOR.muted,
                      fontSize: TYPE.meta,
                      letterSpacing: "0.18em",
                      transition: reduced ? "none" : "color 0.4s ease",
                    }}
                  >
                    <span className="tabular-nums" style={{ color: COLOR.muted }}>
                      {String(i + 1).padStart(2, "0")}{" "}
                    </span>
                    {node}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/**
 * The run: in at the left, down through a pressure riser, across a
 * distribution manifold, and out at the right. Square joins throughout — this
 * is pipework, not a ribbon.
 */
const PIPE =
  "M 20 60 L 250 60 L 250 170 L 520 170 L 520 90 L 720 90 L 720 260 L 980 260";

const JUNCTIONS: [number, number][] = [
  [20, 60],
  [250, 170],
  [520, 90],
  [980, 260],
];
