"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import identity from "@/content/profile/sample-profile.json";
import { seedEvidence } from "@/content/mastery/seed";
import { ArrowIcon, GraphIcon } from "@/components/layout/icons";
import { MasteryExplainer } from "@/components/mastery/mastery-explainer";
import { MasteryRing } from "@/components/mastery/mastery-ring";
import { MiniMap } from "@/components/profile/mini-map";
import { useI18n } from "@/i18n/provider";
import type { TranslationKey } from "@/i18n/config";
import { trackProfileEvent } from "@/lib/analytics/profile";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap } from "@/lib/demo/state";
import { buildExpertiseProfile } from "@/lib/profile/model";
import { useSkalaState } from "@/lib/state/provider";
import type { EvidenceType } from "@/lib/mastery/engine";
import { economicsUnit, localizedProgramText, programCopy } from "@/content/programs/business-core";
import { deriveUnitProgress } from "@/lib/programs/progress";

const evidenceTypeKeys: Record<EvidenceType, TranslationKey> = {
  exposure: "profile.evidenceExposure",
  recall: "profile.evidenceRecall",
  application: "profile.evidenceApplication",
  case: "profile.evidenceCase",
  delayed: "profile.evidenceDelayed",
};

export default function ProfilePage() {
  const { locale, t } = useI18n();
  const { evidence, caseCompletions, completions, checkpointCompletions } = useSkalaState();
  const [shareOpen, setShareOpen] = useState(false);
  const graph = useMemo(() => loadGraph(locale), [locale]);
  const profile = useMemo(
    () => buildExpertiseProfile(graph, [...seedEvidence, ...evidence], caseCompletions),
    [caseCompletions, evidence, graph],
  );
  const strongestArea = profile.specializations[0]?.title ?? profile.domains[0]?.title ?? t("brand.name");
  const unitProgress = deriveUnitProgress(economicsUnit, completions, checkpointCompletions, buildMasteryMap(graph.nodes, evidence));
  const programText = programCopy[locale];
  const nodeName = (id: string) => graph.nodes.find((node) => node.id === id)?.title ?? id;
  const formatDate = (value: string | null) => value
    ? new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value))
    : t("profile.noValidation");

  useEffect(() => {
    trackProfileEvent("profile_opened", { locale, evidenceCount: profile.evidenceCount });
  }, [locale, profile.evidenceCount]);

  const toggleShare = () => {
    const next = !shareOpen;
    setShareOpen(next);
    if (next) trackProfileEvent("profile_share_previewed", { locale, privacy: "private" });
  };

  return (
    <div className="profile-page page-frame">
      <header className="profile-header">
        <div className="profile-monogram">{identity.initials}</div>
        <div><p className="eyebrow">{t("profile.eyebrow")}</p><h1>{identity.name}</h1><p>{t("profile.location", { role: t("profile.role") })}</p></div>
        <div className="profile-header-actions">
          <span className="privacy-label"><i />{t("profile.privateDefault")}</span>
          <button type="button" className="profile-share-action" aria-expanded={shareOpen} onClick={toggleShare}>{t("profile.shareAction")}</button>
        </div>
      </header>

      {shareOpen && <section className="profile-share-panel" aria-live="polite">
        <div><p className="eyebrow">{t("profile.shareEyebrow")}</p><h2>{t("profile.shareTitle")}</h2><p>{t("profile.shareBody")}</p></div>
        <div className="share-status"><span>{t("profile.publicLink")}</span><strong>{t("profile.publicLinkOff")}</strong><small>{t("profile.shareFuture")}</small></div>
        <button type="button" onClick={toggleShare}>{t("profile.closeShare")}</button>
      </section>}

      <section className="profile-hero refined">
        <div className="profile-capability-lead">
          <p className="eyebrow">{t("profile.evidenceBased")}</p>
          <h2>{t("profile.heroTitle", { area: strongestArea })}</h2>
          <p>{t("profile.heroBody")}</p>
          <div className="capability-chips" aria-label={t("profile.capabilities")}>
            {profile.capabilities.map(({ node, mastery }) => <span key={node.id}>{node.title}<small>{mastery.mastery}</small></span>)}
          </div>
        </div>
        <div className="profile-map-stack">
          <MiniMap overall={profile.overall} items={profile.specializations} />
          <div className="overall-secondary"><MasteryRing value={profile.overall.mastery} size={74} label={t("brand.name")} /><span>{t("profile.overallSecondary")}</span></div>
        </div>
      </section>

      <section className="profile-metrics" aria-label={t("common.evidence")}>
        <div><strong>{profile.demonstratedSkills.length}</strong><span>{t("profile.demonstratedSkills")}</span></div>
        <div><strong>{profile.masteredSkills.length}</strong><span>{t("profile.skillsMastered")}</span></div>
        <div><strong>{profile.casesCompleted}</strong><span>{t("profile.casesCompleted")}</span></div>
        <div><strong>{profile.evidenceCount}</strong><span>{t("profile.evidenceEvents")}</span></div>
      </section>

      <section className="profile-program-progress">
        <div><p className="section-label"><GraphIcon />{programText.eyebrow} · 01</p><h2>{localizedProgramText(economicsUnit.title, locale)}</h2><p>{localizedProgramText(economicsUnit.exitCapability, locale)}</p></div>
        <div><span><strong>{unitProgress.completion}%</strong>{programText.progress}</span><span><strong>{unitProgress.mastery}</strong>{programText.mastery}</span><span><strong>{unitProgress.coverage}%</strong>{programText.coverage}</span></div>
        <Link className="text-action" href={`/programs/business-core/units/${economicsUnit.id}`}>{programText.open}<ArrowIcon /></Link>
      </section>

      <section className="domain-mastery">
        <div className="section-heading"><div><p className="eyebrow">{t("profile.domainMastery")}</p><h2>{t("profile.depthCoverage")}</h2></div><p>{t("profile.domainExplanation")}</p></div>
        <div className="profile-domain-grid">
          {profile.domains.map((domain) => <article key={domain.id}>
            <div><span className={`profile-state ${domain.state}`} /> <small>{t("profile.assessedSkills", { assessed: domain.assessedSkills, total: domain.assessableSkills })}</small></div>
            <h3>{domain.title}</h3>
            <p>{domain.summary}</p>
            <div className="profile-domain-values"><span><strong>{domain.mastery}</strong>{t("common.mastery")}</span><span><strong>{domain.coverage}%</strong>{t("common.coverage")}</span></div>
            <div className="domain-bar"><span style={{ width: `${domain.mastery}%` }} /></div>
            <MasteryExplainer data={domain.evidence} />
          </article>)}
        </div>
      </section>

      <section className="profile-specializations">
        <div className="section-heading"><div><p className="eyebrow">{t("profile.specializationEyebrow")}</p><h2>{t("profile.specializationTitle")}</h2></div><p>{t("profile.specializationBody")}</p></div>
        <div className="specialization-grid">
          {profile.specializations.map((item) => <article key={item.id}>
            <div><span className={`profile-state ${item.state}`} /><small>{t("profile.evidenceCountShort", { count: item.evidenceCount })}</small></div>
            <h3>{item.title}</h3>
            <div className="specialization-score"><strong>{item.mastery}</strong><span>{item.coverage}% {t("common.coverage")}</span></div>
            <div className="domain-bar"><span style={{ width: `${item.mastery}%` }} /></div>
          </article>)}
        </div>
      </section>

      <section className="demonstrated-section">
        <div className="section-heading"><div><p className="eyebrow">{t("common.demonstrated")}</p><h2>{t("profile.usedUnderPressure")}</h2></div><p>{t("profile.demonstratedExplanation")}</p></div>
        {profile.demonstratedSkills.length > 0 ? <div className="demonstrated-list">
          {profile.demonstratedSkills.map(({ node, mastery }) => <Link href={`/skala?focus=${encodeURIComponent(node.id)}`} key={node.id}>
            <span><i />{node.title}</span>
            <strong>{mastery.mastery}</strong>
            <small>{t("profile.caseEvidence", { count: mastery.caseEvidenceCount })}</small>
            <small>{t("profile.validatedOn", { date: formatDate(mastery.lastValidatedAt) })}</small>
          </Link>)}
        </div> : <p className="profile-empty-state">{t("profile.noDemonstrated")}</p>}
        <p className="validation-date">{t("profile.latestValidation", { date: formatDate(profile.latestValidation) })}</p>
      </section>

      <section className="profile-evidence-section">
        <div className="section-heading"><div><p className="eyebrow">{t("profile.evidencePortfolio")}</p><h2>{t("profile.recentEvidence")}</h2></div><p>{t("profile.evidencePrivacy")}</p></div>
        <div className="profile-evidence-list">
          {profile.recentEvidence.map((event) => <article key={event.id}>
            <span className={`evidence-kind ${event.type}`}>{t(evidenceTypeKeys[event.type])}</span>
            <div><strong>{nodeName(event.skillId)}</strong><small>{formatDate(event.occurredAt)}</small></div>
            <b>{Math.round(event.performance * 100)}</b>
          </article>)}
        </div>
        <Link href="/skala" className="text-action"><GraphIcon />{t("profile.openMap")}<ArrowIcon /></Link>
      </section>
    </div>
  );
}
