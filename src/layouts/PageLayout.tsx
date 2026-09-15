import type { ReactNode } from "react";
import type { BriefApi } from "../app/useBrief";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Каркас: рамка контейнера, sticky-хедер, футер */
export function PageLayout({ brief, children }: { brief: BriefApi; children: ReactNode }) {
  return (
    <>
      <div className="container" id="top">
        <Header brief={brief} />
        {children}
      </div>
      <Footer t={brief.t} />
    </>
  );
}
