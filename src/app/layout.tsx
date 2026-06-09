import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollIndicator from "@/components/ScrollIndicator";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileContactBar from "@/components/MobileContactBar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EPCOS Engenharia | Automação Industrial & Metrologia 3D",
  description:
    "Especialistas em automação industrial, engenharia mecânica, robótica e escaneamento 3D em Betim/MG. Projetos sob medida para a Indústria 4.0.",
  keywords: [
    "EPCOS",
    "EPCOS Engenharia",
    "automação industrial",
    "engenharia mecânica",
    "metrologia 3D",
    "scanner 3D",
    "projetos industriais",
    "robótica industrial",
    "Indústria 4.0",
    "usinagem de precisão",
    "retrofitting de máquinas",
    "desenvolvimento de máquinas especiais",
    "Betim",
    "Minas Gerais",
    "Belo Horizonte",
    "projetos 3D",
    "engenharia reversa",
    "laudos dimensionais",
    "integração de sistemas automação",
    "manutenção mecânica"
  ],
  authors: [{ name: "EPCOS Engenharia", url: "https://epcos.com.br" }],
  openGraph: {
    title: "EPCOS Engenharia | Soluções Avançadas para Indústria",
    description:
      "Transformamos o chão de fábrica com projetos avançados em automação industrial, escaneamento 3D e engenharia de precisão.",
    type: "website",
    locale: "pt_BR",
    url: "https://epcos.com.br",
    siteName: "EPCOS Engenharia",
  },
  twitter: {
    card: "summary_large_image",
    title: "EPCOS Engenharia | Automação Industrial",
    description: "Transformamos o chão de fábrica com projetos avançados em automação e engenharia 3D.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://epcos.com.br",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-bg-primary text-text font-sans antialiased md:pb-0 pb-16">
        <CustomCursor />
        {children}
        <ScrollIndicator />
        <WhatsAppButton />
        <MobileContactBar />
        <CookieBanner />
      </body>
    </html>
  );
}
