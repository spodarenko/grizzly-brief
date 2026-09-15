import { useEffect, useRef, useState } from "react";
import { questionBlocks } from "../content/questions";
import type { Translate } from "../lib/i18n";

interface Props {
  saved: Record<string, number>;
  t: Translate;
  onJump: (blockId: string) => void;
}

export function Stepper({ saved, t, onJump }: Props) {
  const ref = useRef<HTMLOListElement>(null);
  const [stuck, setStuck] = useState(false);

  // прилиплий степер отримує компактний нижній відступ
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const top = parseFloat(getComputedStyle(el).top) || 0;
      setStuck(el.getBoundingClientRect().top <= top + 0.5 && window.scrollY > 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", check);
    check();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", check);
      cancelAnimationFrame(frame);
    };
  }, []);

  const next = questionBlocks.find((b) => !saved[b.id])?.id;

  return (
    <ol className={`hsteps${stuck ? " stuck" : ""}`} ref={ref}>
      {questionBlocks.map((block, n) => {
        const prevDone = n > 0 && saved[questionBlocks[n - 1].id];
        const cls = [
          saved[block.id] && "done",
          block.id === next && "next",
          prevDone && "after-done",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <li key={block.id} className={cls || undefined}>
            <button type="button" className="hstep" onClick={() => onJump(block.id)}>
              <span className="hmark">{n + 1}</span>
              <span className="hname">{t(block.titleKey)}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
