"use client";

import { useI18n } from "@/i18n/provider";
import type { ProfileRollup } from "@/lib/profile/model";

const positions = [
  { x: 25, y: 23 }, { x: 74, y: 21 }, { x: 17, y: 57 }, { x: 82, y: 58 },
  { x: 38, y: 82 }, { x: 66, y: 84 }, { x: 8, y: 35 }, { x: 92, y: 36 },
];

export function MiniMap({ overall, items }: { overall: ProfileRollup; items: ProfileRollup[] }) {
  const { t } = useI18n();
  const points = items.slice(0, positions.length).map((item, index) => ({ ...item, ...positions[index] }));
  return <div className="mini-expertise-map" aria-label={t("profile.miniMap")}>
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {points.map((point) => <line key={point.id} x1="50" y1="50" x2={point.x} y2={point.y} />)}
    </svg>
    <span className={`map-center ${overall.state}`} aria-label={t("profile.mapPoint", { area: overall.title, mastery: overall.mastery })}>
      <strong>{overall.mastery}</strong>
    </span>
    {points.map((point) => <span
      key={point.id}
      className={point.state}
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
      title={t("profile.mapPoint", { area: point.title, mastery: point.mastery })}
    />)}
  </div>;
}
