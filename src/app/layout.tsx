import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollIndicator from "@/components/ScrollIndicator";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileContactBar from "@/components/MobileContactBar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://epcos.eng.br"),

  title: {
    default: "EPCOS Engenharia | Projetos Mecânicos, Escaneamento 3D e Automação Industrial em Betim MG",
    template: "%s | EPCOS Engenharia",
  },
  description:
    "EPCOS Engenharia: especialistas em projetos mecânicos industriais, escaneamento 3D (precisão 0,02mm), engenharia reversa, detalhamento 2D/3D, automação industrial e adequação NR12 em Betim, Minas Gerais. Atendemos toda a região metropolitana de Belo Horizonte.",

  keywords: [
    // ── Marca ────────────────────────────────────────────────────────────
    "EPCOS", "EPCOS Engenharia", "EPCOS 3D", "EPCOS Projetos",
    "EPCOS Automação", "EPCOS NR12", "EPCOS Metrologia", "EPCOS Betim",
    "EPCOS Minas Gerais", "EPCOS scanner", "EPCOS engenharia reversa",
    // ── Escaneamento 3D ─────────────────────────────────────────────────
    "escaneamento 3D", "scanner 3D industrial", "digitalização 3D",
    "nuvem de pontos", "scan 3D peças", "metrologia 3D",
    "inspeção dimensional", "laudo dimensional", "laudo metrológico",
    "controle dimensional", "Raptor X scanner", "scanner blue laser",
    // ── Engenharia Reversa ───────────────────────────────────────────────
    "engenharia reversa", "reverse engineering", "recriação de peças",
    "modelagem de peça sem desenho", "digitalização de peça",
    "reconstrução CAD", "engenharia reversa CAD",
    // ── Projetos Mecânicos ───────────────────────────────────────────────
    "projetos mecânicos", "projeto mecânico industrial",
    "detalhamento 2D", "detalhamento 3D", "projeto 3D",
    "modelagem 3D", "modelagem CAD", "CAD industrial", "SolidWorks",
    "desenho técnico", "desenho mecânico", "normas ABNT",
    "tolerâncias dimensionais", "GD&T", "máquinas especiais",
    "gabaritos e dispositivos", "ferramentais industriais",
    "projeto de fixturing", "layout fabril", "planta industrial",
    "lista de materiais BOM", "PPAP", "DFM", "DFA", "DFMEA",
    // ── Simulação e Análise ──────────────────────────────────────────────
    "simulação estrutural", "análise de elementos finitos", "FEA", "FEM",
    "análise térmica", "CFD", "simulação mecânica", "validação de projeto",
    // ── Automação e NR12 ─────────────────────────────────────────────────
    "automação industrial", "automação NR12", "adequação NR12",
    "retrofitting de máquinas", "retrofitting industrial",
    "integração de sistemas", "máquinas especiais automação",
    "linha de produção automatizada", "sistema automático industrial",
    // ── Usinagem e Fabricação ────────────────────────────────────────────
    "usinagem de precisão", "CNC", "prototipagem rápida",
    "manutenção mecânica industrial", "projeto de usinagem",
    // ── Local ────────────────────────────────────────────────────────────
    "Betim", "Betim MG", "Minas Gerais", "Belo Horizonte", "Grande BH",
    "Contagem", "região metropolitana Belo Horizonte",
    "engenharia mecânica Betim", "projetos mecânicos BH",
    "automação industrial Minas Gerais"
  ],

  authors: [{ name: "EPCOS Engenharia", url: "https://epcos.eng.br" }],
  creator: "EPCOS Engenharia",
  publisher: "EPCOS Engenharia",
  category: "Engenharia Mecânica Industrial",

  // ── Google Search Console Verification ───────────────────────────────
  verification: {
    google: "E-_NgPCAQv-tP1xptna89EtJAh7-HszeYVfGGIGIZJs",
  },

  // ── Open Graph (WhatsApp, LinkedIn, Facebook, Google Imagens) ─────────
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://epcos.eng.br",
    siteName: "EPCOS Engenharia",
    title: "EPCOS Engenharia | Projetos Mecânicos, Scanner 3D e Automação Industrial",
    description:
      "Especialistas em projetos mecânicos industriais, escaneamento 3D de alta precisão (0,02mm), engenharia reversa e automação NR12 em Betim, Minas Gerais.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EPCOS Engenharia - Projetos Mecânicos e Scanner 3D em Betim MG",
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "EPCOS Engenharia | Projetos Mecânicos e Scanner 3D",
    description:
      "Projetos mecânicos industriais, escaneamento 3D de precisão e automação industrial em Betim, Minas Gerais.",
    images: ["/og-image.jpg"],
  },

  // ── Indexação ─────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Canonical ────────────────────────────────────────────────────────
  alternates: {
    canonical: "https://epcos.eng.br",
    languages: {
      "pt-BR": "https://epcos.eng.br",
    },
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
        <StructuredData />
        <CustomCursor />
        {children}
        <ScrollIndicator />
        <WhatsAppButton />
        <MobileContactBar />
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
