import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { COLOR, CSS_EASE } from "../../tokens";
import { BUSINESS } from "../../content";

/**
 * Mobile conversion bar: the number is one thumb-reach away at all times.
 *
 * It hides itself while the final CTA is on screen — two identical calls to
 * action stacked on top of each other look like a bug, and the section version
 * is the larger, more persuasive one. An IntersectionObserver on `#kontakt`
 * does this without any scroll listener.
 *
 * Respects `env(safe-area-inset-bottom)` so it clears the home indicator on
 * iPhones rather than sitting under it.
 */
export default function StickyCallBar() {
  const reduced = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.querySelector("#kontakt a[href^='tel:']");
    if (!target || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting && entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.5] },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
      aria-hidden={hidden}
      onFocusCapture={() => setHidden(false)}
      style={{
        transform: hidden ? "translateY(110%)" : "translateY(0)",
        transition: reduced ? "none" : `transform 0.4s ${CSS_EASE}`,
        visibility: hidden ? "hidden" : "visible",
        paddingBottom: "env(safe-area-inset-bottom)",
        backgroundColor: COLOR.raised,
        borderTop: `1px solid ${COLOR.line}`,
      }}
    >
      <div className="px-4 py-3">
        <a
          href={BUSINESS.phoneHref}
          tabIndex={hidden ? -1 : 0}
          aria-label={`Zadzwoń: ${BUSINESS.phone}`}
          className="flex w-full items-center justify-center gap-3 py-4"
          style={{
            border: `1px solid ${COLOR.accent}`,
            color: COLOR.accent,
          }}
        >
          <span
            aria-hidden="true"
            className="block h-[6px] w-[6px]"
            style={{ backgroundColor: COLOR.accent }}
          />
          <span
            className="font-mono uppercase"
            style={{ fontSize: "0.74rem", letterSpacing: "0.2em", fontWeight: 500 }}
          >
            Zadzwoń
          </span>
          <span
            className="font-mono tabular-nums"
            style={{ fontSize: "0.95rem", letterSpacing: "0.02em", fontWeight: 500 }}
          >
            {BUSINESS.phone}
          </span>
        </a>
      </div>
    </div>
  );
}
