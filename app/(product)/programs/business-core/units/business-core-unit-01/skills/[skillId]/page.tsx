"use client";

import { useParams } from "next/navigation";
import { EconomicsSkillSession } from "@/components/programs/economics-skill-session";
import { getEconomicsSkill } from "@/content/programs/economics-unit";

export default function EconomicsSkillPage() {
  const { skillId } = useParams<{ skillId: string }>();
  return getEconomicsSkill(skillId) ? <EconomicsSkillSession skillId={skillId} /> : null;
}

