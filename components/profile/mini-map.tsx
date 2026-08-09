"use client";

import { useI18n } from "@/i18n/provider";

const points = [
  { x: 50, y: 50, state: "mastered" }, { x: 26, y: 24, state: "learning" }, { x: 74, y: 22, state: "available" },
  { x: 18, y: 62, state: "available" }, { x: 81, y: 61, state: "mastered" }, { x: 40, y: 82, state: "learning" },
  { x: 67, y: 83, state: "distant" }, { x: 8, y: 35, state: "distant" }, { x: 91, y: 36, state: "distant" },
];

export function MiniMap() {
  const { t } = useI18n();
  return <div className="mini-expertise-map" aria-label={t("profile.miniMap")}>
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {points.slice(1).map((point, index) => <line key={index} x1="50" y1="50" x2={point.x} y2={point.y} />)}
    </svg>
    {points.map((point, index) => <span key={index} className={point.state} style={{ left: `${point.x}%`, top: `${point.y}%` }} />)}
  </div>;
}
