import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook. Starts `false` and resolves after mount, so the
 * first paint never assumes a capability the device may not have.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/**
 * True only for devices with a precise, hovering pointer — a mouse or
 * trackpad. Gates the two cursor-following mechanics on the page.
 *
 * This is deliberately SEPARATE from the reduced-motion check. A desktop user
 * who prefers reduced motion should lose the animation but keep the content;
 * a touch user has no cursor to follow at all. Conflating the two is the usual
 * bug here.
 */
export function usePointerFine(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/** Matches Tailwind's `md` breakpoint. Used to disable sticky mechanics. */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 768px)");
}
