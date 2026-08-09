"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaseIcon, CompassIcon, GraphIcon, HomeIcon, ProfileIcon } from "./icons";

const nav = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/skala", label: "Your Skala", icon: GraphIcon },
  { href: "/explore", label: "Explore", icon: CompassIcon },
  { href: "/cases", label: "Cases", icon: CaseIcon },
  { href: "/profile", label: "Profile", icon: ProfileIcon },
];

export function ProductShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="product-shell">
      <aside className="sidebar">
        <Link href="/home" className="brand-mark" aria-label="Skala home">
          <span className="brand-glyph" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <span>skala</span>
        </Link>
        <nav className="side-nav" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return <Link key={item.href} href={item.href} className={active ? "active" : ""}><item.icon /><span>{item.label}</span></Link>;
          })}
        </nav>
        <div className="sidebar-foot">
          <div className="profile-orb">MS</div>
          <div><strong>Martina Silva</strong><span>Private profile</span></div>
        </div>
      </aside>
      <main className="product-main">{children}</main>
      <nav className="mobile-nav" aria-label="Primary mobile">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return <Link key={item.href} href={item.href} className={active ? "active" : ""}><item.icon /><span>{item.label === "Your Skala" ? "Skala" : item.label}</span></Link>;
        })}
      </nav>
    </div>
  );
}
