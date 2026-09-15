import type { BriefApi } from "../app/useBrief";
import { Carriers } from "../components/sections/Carriers";
import { Hero } from "../components/sections/Hero";
import { Packages } from "../components/sections/Packages";
import { Questions } from "../components/sections/Questions";
import { SendSection } from "../components/sections/SendSection";

/** Єдина сторінка сайту: бриф від hero до відправки */
export function BriefPage({ brief }: { brief: BriefApi }) {
  return (
    <>
      <Hero t={brief.t} />
      <Questions brief={brief} />
      <section id="package">
        <Packages brief={brief} />
        <Carriers brief={brief} />
      </section>
      <SendSection brief={brief} />
    </>
  );
}
