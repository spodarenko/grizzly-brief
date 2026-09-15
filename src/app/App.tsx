import { Carriers } from "../components/Carriers";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Packages } from "../components/Packages";
import { Questions } from "../components/Questions";
import { SendSection } from "../components/SendSection";
import { useBrief } from "./useBrief";

export function App() {
  const brief = useBrief();
  return (
    <>
      <div className="container" id="top">
        <Header brief={brief} />
        <Hero t={brief.t} />
        <Questions brief={brief} />
        <section id="package">
          <Packages brief={brief} />
          <Carriers brief={brief} />
        </section>
        <SendSection brief={brief} />
      </div>
      <Footer t={brief.t} />
    </>
  );
}
