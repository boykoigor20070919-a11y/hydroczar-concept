import { useRef, type RefObject } from "react";
import {
  useInView,
  useReducedMotion,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";
import { VIEWPORT } from "../tokens";

export type RevealProps = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
};

export type RevealFn = (
  from: TargetAndTransition,
  to: TargetAndTransition,
  transition: Transition,
  /** Optional distinct resting state for reduced motion (e.g. keyframed opacity). */
  reducedTo?: TargetAndTransition,
) => RevealProps;

/**
 * Builds motion props that respect `prefers-reduced-motion`: when reduced, the
 * element renders in its final state with zero duration rather than animating.
 *
 * Spreading the result onto a motion component is the only way animation
 * should enter a section — it keeps the reduced-motion branch impossible to
 * forget.
 */
export function makeReveal(inView: boolean, reduced: boolean): RevealFn {
  return (from, to, transition, reducedTo = to) =>
    reduced
      ? { initial: reducedTo, animate: reducedTo, transition: { duration: 0 } }
      : { initial: from, animate: inView ? to : from, transition };
}

/**
 * Section-level reveal. One call per section root; pass `reveal` down.
 *
 * `mountOnly` is for above-the-fold content (the hero), which plays on mount
 * rather than waiting to be scrolled into view.
 */
export function useSectionReveal(mountOnly = false) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as RefObject<Element>, VIEWPORT);
  const reduced = useReducedMotion() ?? false;
  const active = mountOnly ? true : inView;

  return {
    ref,
    inView: active,
    reduced,
    reveal: makeReveal(active, reduced),
  };
}
