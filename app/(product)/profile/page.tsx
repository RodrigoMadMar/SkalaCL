import profile from "@/content/profile/sample-profile.json";
import { MasteryRing } from "@/components/mastery/mastery-ring";
import { MiniMap } from "@/components/profile/mini-map";

const domains = [
  { name: "AI", mastery: 44, coverage: 29 },
  { name: "Strategy", mastery: 42, coverage: 38 },
  { name: "Finance", mastery: 35, coverage: 31 },
  { name: "Data & Decisions", mastery: 29, coverage: 24 },
];

export default function ProfilePage() {
  return (
    <div className="profile-page page-frame">
      <header className="profile-header">
        <div className="profile-monogram">MS</div>
        <div><p className="eyebrow">PRIVATE EXPERTISE PROFILE</p><h1>{profile.name}</h1><p>{profile.role} · Santiago, Chile</p></div>
        <span className="privacy-label">PRIVATE BY DEFAULT</span>
      </header>
      <section className="profile-hero">
        <div className="profile-overall"><MasteryRing value={profile.overallSkala} size={144} label="OVERALL SKALA" /><div><p className="eyebrow">EVIDENCE-BASED EXPERTISE</p><h2>An interdisciplinary foundation with emerging depth in AI economics.</h2><p>Your profile reflects demonstrated evidence, not content completion.</p></div></div>
        <MiniMap />
      </section>
      <section className="profile-metrics" aria-label="Profile evidence summary">
        <div><strong>{profile.demonstratedSkills}</strong><span>DEMONSTRATED SKILLS</span></div>
        <div><strong>{profile.skillsMastered}</strong><span>SKILLS MASTERED</span></div>
        <div><strong>{profile.casesCompleted}</strong><span>CASES COMPLETED</span></div>
        <div><strong>{profile.evidenceCount}</strong><span>EVIDENCE EVENTS</span></div>
      </section>
      <section className="domain-mastery">
        <div className="section-heading"><div><p className="eyebrow">DOMAIN MASTERY</p><h2>Depth and coverage</h2></div><p>Mastery measures assessed performance. Coverage shows how much of the active graph has evidence.</p></div>
        {domains.map((domain) => <div className="domain-row" key={domain.name}>
          <strong>{domain.name}</strong>
          <div className="domain-bar"><span style={{ width: `${domain.mastery}%` }} /></div>
          <div><b>{domain.mastery}</b><small>MASTERY</small></div>
          <div><b>{domain.coverage}%</b><small>COVERAGE</small></div>
        </div>)}
      </section>
      <section className="demonstrated-section">
        <div><p className="eyebrow">DEMONSTRATED</p><h2>Skills used under pressure</h2></div>
        <div className="demonstrated-list">
          <span><i />Competitive advantage<small>2 case evidence events</small></span>
          <span><i />Unit economics<small>2 case evidence events</small></span>
          <span><i />Models vs products<small>2 case evidence events</small></span>
        </div>
        <p className="validation-date">LATEST VALIDATION · 06 AUG 2026</p>
      </section>
    </div>
  );
}
