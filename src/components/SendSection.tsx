import { useState } from "react";
import type { BriefApi } from "../app/useBrief";
import { buildMessage } from "../lib/message";
import { openWhatsApp } from "../lib/whatsapp";

export function SendSection({ brief }: { brief: BriefApi }) {
  const { state, t } = brief;
  const [blocked, setBlocked] = useState(false);

  const send = () => setBlocked(!openWhatsApp(buildMessage(state, t)));

  return (
    <section id="send">
      <div className="title">
        <h3>{t("send_h")}</h3>
        <p>{t("send_p")}</p>
      </div>
      <div className="btn-row">
        <button type="button" className="btn brand" onClick={send}>
          {t("btn_wa")}
        </button>
        {blocked && (
          <span className="status" aria-live="polite">
            {t("send_hint")}
          </span>
        )}
      </div>
      <p className="note gap-t">{t("send_hint")}</p>
    </section>
  );
}
