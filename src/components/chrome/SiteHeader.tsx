import { CONTAINER, COLOR, CSS_EASE, TYPE } from "../../tokens";
import { BUSINESS, NAV } from "../../content";

/**
 * Fixed chrome.
 *
 * The phone number is in the header at EVERY width, including phones. An
 * emergency trade that hides its number behind a burger menu is broken, so
 * there is no menu panel at all — navigation is inline on desktop, and on
 * mobile the header carries the wordmark and the number while the sticky bar
 * carries the action.
 */
export default function SiteHeader() {
  return (
    <>
      {/* Scrim, so the chrome stays legible over the hero without a filled bar. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,14,17,0.92) 0%, rgba(11,14,17,0) 100%)",
        }}
      />

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`${CONTAINER} flex items-center justify-between gap-4 py-4 sm:py-5`}
        >
          <a
            href="#gora"
            className="font-display"
            style={{
              color: COLOR.text,
              fontWeight: 700,
              fontSize: "0.92rem",
              letterSpacing: "0.16em",
            }}
          >
            HYDROCZAR
          </a>

          <nav aria-label="Główna nawigacja" className="hidden lg:block">
            <ul className="m-0 flex list-none items-center gap-8 p-0">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-mono uppercase text-muted transition-colors duration-300 hover:text-warm"
                    style={{
                      fontSize: TYPE.meta,
                      letterSpacing: "0.16em",
                      transitionTimingFunction: CSS_EASE,
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Always visible, every breakpoint. */}
          <a
            href={BUSINESS.phoneHref}
            className="flex shrink-0 items-center gap-2 font-mono tabular-nums"
            style={{
              color: COLOR.accent,
              fontSize: "0.86rem",
              letterSpacing: "0.04em",
              fontWeight: 500,
            }}
            aria-label={`Zadzwoń: ${BUSINESS.phone}`}
          >
            <span
              aria-hidden="true"
              className="block h-[6px] w-[6px]"
              style={{ backgroundColor: COLOR.accent }}
            />
            {BUSINESS.phone}
          </a>
        </div>
      </header>
    </>
  );
}
