import { PageLayout } from "../layouts/PageLayout";
import { BriefPage } from "../pages/BriefPage";
import { useBrief } from "./useBrief";

export function App() {
  const brief = useBrief();
  return (
    <PageLayout brief={brief}>
      <BriefPage brief={brief} />
    </PageLayout>
  );
}
