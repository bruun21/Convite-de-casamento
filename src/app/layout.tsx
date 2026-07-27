import type { Metadata, Viewport } from "next";
import { Lato, Playfair_Display } from "next/font/google";

import "./globals.css";
import { ScrollReveal } from "./scroll-reveal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  icons: { icon: "/logo.svg" },
  title: "Suzyellen | Formatura 25.08.2026",
  description:
    "Convite para a festa de formatura da Suzyellen, em Belém/PA, no dia 25 de agosto de 2026.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Suzyellen | Formatura 25.08.2026",
    description:
      "Convite para a festa de formatura da Suzyellen, em Belém/PA, no dia 25 de agosto de 2026.",
    siteName: "Formatura da Suzyellen",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suzyellen | Formatura 25.08.2026",
    description:
      "Convite para a festa de formatura da Suzyellen, em Belém/PA, no dia 25 de agosto de 2026.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fff9f1",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${playfair.variable} ${lato.variable}`} lang="pt-BR">
      <body suppressHydrationWarning>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
