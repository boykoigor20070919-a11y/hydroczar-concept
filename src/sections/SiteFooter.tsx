import { CONTAINER, COLOR, TYPE } from "../tokens";
import { BUSINESS, NAV } from "../content";
import { StaticHairline } from "../components/primitives/Hairline";

/**
 * Footer. Carries the wordmark, navigation and the number — and no claims.
 *
 * No registration numbers, no slogan, no badges: none of that is verified, and
 * a footer is exactly where unverified boilerplate tends to get smuggled in.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative sticky-bar-clearance"
      style={{ backgroundColor: COLOR.base }}
    >
      <StaticHairline />

      <div className={`${CONTAINER} py-14 lg:py-16`}>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          <div>
            <p
              className="font-display"
              style={{
                color: COLOR.text,
                fontWeight: 700,
                fontSize: "0.92rem",
                letterSpacing: "0.16em",
              }}
            >
              HYDROCZAR
            </p>
            <p
              className="mt-3 font-mono uppercase"
              style={{
                color: COLOR.muted,
                fontSize: TYPE.meta,
                letterSpacing: "0.16em",
              }}
            >
              {BUSINESS.city}
            </p>
          </div>

          <nav aria-label="Stopka">
            <ul className="m-0 list-none space-y-3 p-0">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-mono uppercase underline-offset-4 hover:underline"
                    style={{
                      color: COLOR.muted,
                      fontSize: TYPE.meta,
                      letterSpacing: "0.16em",
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <a
              href={BUSINESS.phoneHref}
              className="block font-mono tabular-nums underline-offset-4 hover:underline"
              style={{
                color: COLOR.accent,
                fontSize: "1.05rem",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
              aria-label={`Zadzwoń: ${BUSINESS.phone}`}
            >
              {BUSINESS.phone}
            </a>
          </div>
        </div>

        <StaticHairline className="mt-12" />

        <p
          className="mt-6 font-mono uppercase"
          style={{
            color: COLOR.muted,
            fontSize: "0.66rem",
            letterSpacing: "0.16em",
          }}
        >
          {year} · {BUSINESS.name} · {BUSINESS.city} · Koncepcja strony do akceptacji właściciela
        </p>
      </div>
    </footer>
  );
}
