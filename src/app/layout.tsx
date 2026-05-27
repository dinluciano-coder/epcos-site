import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EPCOS Engenharia | Automação Industrial & Engenharia de Precisão",
  description:
    "Soluções avançadas em automação industrial, escaneamento 3D e engenharia mecânica de precisão. Tecnologia que transforma a indústria.",
  keywords: [
    "automação industrial",
    "engenharia mecânica",
    "scanner 3D",
    "projetos industriais",
    "EPCOS Engenharia",
  ],
  authors: [{ name: "EPCOS Engenharia" }],
  openGraph: {
    title: "EPCOS Engenharia | Automação Industrial & Engenharia de Precisão",
    description:
      "Soluções avançadas em automação industrial, escaneamento 3D e engenharia mecânica de precisão.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-bg-primary text-text font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
