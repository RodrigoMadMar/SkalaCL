"use client";

import profile from "@/content/profile/sample-profile.json";
import { MasteryRing } from "@/components/mastery/mastery-ring";
import { MasteryExplainer } from "@/components/mastery/mastery-explainer";
import { MiniMap } from "@/components/profile/mini-map";
import { loadGraph } from "@/lib/content/load-content";
import { useI18n } from "@/i18n/provider";
import { demonstratedSkillIds, domainMasterySeed, profileCapabilityIds } from "@/content/mastery/explanations";

export default function ProfilePage() {
  const { locale, t } = useI18n();
  const graph = loadGraph(locale);
  const nodeName = (id: string) => graph.nodes.find((node) => node.id === id)?.title ?? id;

  return (
    <div className="profile-page page-frame">
      <header className="profile-header">
        <div className="profile-monogram">MS</div>
        <div><p className="eyebrow">{t("profile.eyebrow")}</p><h1>{profile.name}</h1><p>{t("profile.location", { role: t("profile.role") })}</p></div>
        <span className="privacy-label">{t("profile.privateDefault")}</span>
      </header>
      <section className="profile-hero refined">
        <div className="profile-capability-lead">
          <p className="eyebrow">{t("profile.evidenceBased")}</p>
          <h2>{t("profile.heroTitle")}</h2>
          <p>{t("profile.heroBody")}</p>
          <div className="capability-chips" aria-label={t("profile.capabilities")}>
            {profileCapabilityIds.map((id) => <span key={id}>{nodeName(id)}</span>)}
          </div>
        </div>
        <div className="profile-map-stack">
          <MiniMap />
          <div className="overall-secondary"><MasteryRing value={profile.overallSkala} size={74} label={t("brand.name")} /><span>{t("profile.overallSecondary")}</span></div>
        </div>
      </section>
      <section className="profile-metrics" aria-label={t("common.evidence")}>
        <div><strong>{profile.demonstratedSkills}</strong><span>{t("profile.demonstratedSkills")}</span></div>
        <div><strong>{profile.skillsMastered}</strong><span>{t("profile.skillsMastered")}</span></div>
        <div><strong>{profile.casesCompleted}</strong><span>{t("profile.casesCompleted")}</span></div>
        <div><strong>{profile.evidenceCount}</strong><span>{t("profile.evidenceEvents")}</span></div>
      </section>
      <section className="domain-mastery">
        <div className="section-heading"><div><p className="eyebrow">{t("profile.domainMastery")}</p><h2>{t("profile.depthCoverage")}</h2></div><p>{t("profile.domainExplanation")}</p></div>
        {domainMasterySeed.map((domain) => <div className="domain-row" key={domain.id}>
          <strong>{nodeName(domain.id)}</strong>
          <div className="domain-bar"><span style={{ width: `${domain.mastery}%` }} /></div>
          <div className="domain-value"><b>{domain.mastery}</b><small>{t("common.mastery")}</small></div>
          <div className="domain-value"><b>{domain.coverage}%</b><small>{t("common.coverage")}</small></div>
          <MasteryExplainer data={domain.evidence} compact />
        </div>)}
      </section>
      <section className="demonstrated-section">
        <div><p className="eyebrow">{t("common.demonstrated")}</p><h2>{t("profile.usedUnderPressure")}</h2></div>
        <div className="demonstrated-list">
          {demonstratedSkillIds.map((id) => <span key={id}><i />{nodeName(id)}<small>{t("profile.caseEvidence", { count: 2 })}</small></span>)}
        </div>
        <p className="validation-date">{t("profile.latestValidation")}</p>
      </section>
    </div>
  );
}
