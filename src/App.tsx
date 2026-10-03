import { COLOR, FONT_DISPLAY } from "./tokens";
import SiteHeader from "./components/chrome/SiteHeader";
import StickyCallBar from "./components/chrome/StickyCallBar";
import Hero from "./sections/Hero";
import TrustBand from "./sections/TrustBand";
import Services from "./sections/Services";
import FlowSection from "./sections/FlowSection";
import Reviews from "./sections/Reviews";
import FinalCTA from "./sections/FinalCTA";
import SiteFooter from "./sections/SiteFooter";

/**
 * Page order is a conversion argument, not a layout.
 *
 * The number appears in the header before anything is read; proof lands
 * immediately after the hero while attention is highest; the schematic earns
 * credibility in the middle; the aggregate rating backs it; and the page
 * resolves into the call. On mobile the sticky bar means the action is never
 * more than a thumb away at any point in that sequence.
 */
export default function App() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: COLOR.base,
        fontFamily: FONT_DISPLAY,
        overflowX: "clip",
      }}
    >
      <a href="#tresc" className="skip-link">
        Przejdź do treści
      </a>

      <SiteHeader />

      <main id="tresc">
        <Hero />
        <TrustBand />
        <Services />
        <FlowSection />
        <Reviews />
        <FinalCTA />
      </main>

      <SiteFooter />
      <StickyCallBar />
    </div>
  );
}
