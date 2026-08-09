"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaseIcon, CompassIcon, GraphIcon, HomeIcon, ProfileIcon } from "./icons";
import { LanguageSwitch } from "./language-switch";
import { useI18n } from "@/i18n/provider";
import type { TranslationKey } from "@/i18n/config";
import profile from "@/content/profile/sample-profile.json";

const nav = [
  { href: "/home", label: "nav.home" as TranslationKey, icon: HomeIcon },
  { href: "/skala", label: "nav.skala" as TranslationKey, icon: GraphIcon },
  { href: "/explore", label: "nav.explore" as TranslationKey, icon: CompassIcon },
  { href: "/cases", label: "nav.cases" as TranslationKey, icon: CaseIcon },
  { href: "/profile", label: "nav.profile" as TranslationKey, icon: ProfileIcon },
];

export function ProductShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useI18n();
  const initials = profile.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="product-shell">
      <aside className="sidebar">
        <Link href="/home" className="brand-mark" aria-label={`Skala · ${t("nav.home")}`}>
          <span className="brand-glyph" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <span>{t("brand.name")}</span>
        </Link>
        <nav className="side-nav" aria-label={t("nav.primary")}>
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return <Link key={item.href} href={item.href} className={active ? "active" : ""}><item.icon /><span>{t(item.label)}</span></Link>;
          })}
        </nav>
        <LanguageSwitch />
        <div className="sidebar-foot">
          <div className="profile-orb">{initials}</div>
          <div><strong>{profile.name}</strong><span>{t("profile.private")}</span></div>
        </div>
      </aside>
      <div className="mobile-language"><LanguageSwitch /></div>
      <main className="product-main">{children}</main>
      <nav className="mobile-nav" aria-label={t("nav.mobile")}>
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return <Link key={item.href} href={item.href} className={active ? "active" : ""}><item.icon /><span>{item.href === "/skala" ? t("nav.skalaShort") : t(item.label)}</span></Link>;
        })}
      </nav>
    </div>
  );
}
