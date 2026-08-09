import type { Metadata } from "next";
import "@xyflow/react/dist/style.css";
import "./globals.css";
import { I18nProvider } from "@/i18n/provider";
import { defaultLocale, translate } from "@/i18n/config";
import { SkalaStateProvider } from "@/lib/state/provider";

export const metadata: Metadata = {
  title: translate(defaultLocale, "meta.title"),
  description: translate(defaultLocale, "meta.description"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body><I18nProvider><SkalaStateProvider>{children}</SkalaStateProvider></I18nProvider></body>
    </html>
  );
}
