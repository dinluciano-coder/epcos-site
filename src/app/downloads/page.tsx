"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import LeadCaptureModal from "@/components/LeadCaptureModal";

const files = [
  {
    id: "logo",
    title: "Logotipo EPCOS",
    description: "Versões em alta resolução (PNG, SVG, EPS) para uso em web e impressão.",
    type: "ZIP",
    size: "12 MB",
    path: "/downloads/EPCOS_Logotipo_Exemplo.zip"
  },
  {
    id: "apresentacao",
    title: "Apresentação Institucional",
    description: "Deck completo sobre nossas soluções em engenharia mecânica e automação.",
    type: "PDF",
    size: "8.5 MB",
    path: "/downloads/EPCOS_Apresentacao_Exemplo.pdf"
  },
  {
    id: "timbrado",
    title: "Papel Timbrado",
    description: "Modelo oficial de documento comercial EPCOS.",
    type: "DOCX",
    size: "2 MB",
    path: "/downloads/EPCOS_Timbrado_Exemplo.docx"
  }
];

export default function DownloadsPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState<string | null>(null);

  useEffect(() => {
    // Check if user already unlocked the downloads
    if (localStorage.getItem("epcos_lead_captured") === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handleDownloadClick = (path: string) => {
    if (isUnlocked) {
      // Create a temporary anchor to trigger download
      const a = document.createElement("a");
      a.href = path;
      a.download = path.split("/").pop() || "download";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      setPendingFile(path);
      setModalOpen(true);
    }
  };

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    setModalOpen(false);
    
    // Automatically trigger the download they clicked before the modal
    if (pendingFile) {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = pendingFile;
        a.download = pendingFile.split("/").pop() || "download";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setPendingFile(null);
      }, 500);
    }
  };

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-32 flex flex-col">
      <Header />
      
      <section className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              Portal de Acesso
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">Materiais Oficiais</h1>
          <p className="text-lg text-[#9A9A9A] max-w-2xl">
            Acesse os recursos de marca e documentos institucionais da EPCOS Engenharia.
            {isUnlocked ? (
              <span className="block mt-2 text-[#00D4FF]">Acesso liberado. Você já pode realizar os downloads.</span>
            ) : (
              <span className="block mt-2">Os downloads exigem uma rápida identificação por motivos de segurança e controle.</span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {files.map((file) => (
            <div key={file.id} className="glass-card p-8 flex flex-col justify-between h-full bg-[#1A1A1A]/80 border border-white/10 hover:border-white/30 transition-colors group">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs font-bold px-2 py-1 bg-white/10 text-[#9A9A9A] rounded-md">{file.type}</span>
                    <span className="text-xs font-bold px-2 py-1 bg-white/10 text-[#9A9A9A] rounded-md">{file.size}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{file.title}</h3>
                <p className="text-sm text-[#6B6B6B] mb-8 line-clamp-3">{file.description}</p>
              </div>

              <button 
                onClick={() => handleDownloadClick(file.path)}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  isUnlocked 
                    ? "bg-[#00D4FF]/10 text-[#00D4FF] hover:bg-[#00D4FF]/20 border border-[#00D4FF]/30" 
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10 group-hover:border-[#7B2D3B] group-hover:text-[#7B2D3B]"
                }`}
              >
                {isUnlocked ? (
                  <>
                    Baixar Arquivo
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </>
                ) : (
                  <>
                    Liberar Acesso
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      <FooterSection />
      
      <LeadCaptureModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSuccess={handleUnlockSuccess}
      />
    </main>
  );
}
