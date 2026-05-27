"use client";

import { useState } from "react";
import MagneticButton from "./MagneticButton";
import TiltWrapper from "./TiltWrapper";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LeadCaptureModal({ isOpen, onClose, onSuccess }: LeadCaptureModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "24e58fe8-93ff-4d00-a653-6fb5b75d5d58");
    formData.append("subject", "Novo Lead Capturado - Portal de Downloads");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("epcos_lead_captured", "true");
        onSuccess();
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose}></div>
      <TiltWrapper maxTilt={5} className="relative z-10 w-full max-w-md">
        <div className="glass-card p-8 bg-[#1A1A1A]/90 border border-white/10 rounded-3xl w-full">
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h3>
              <p className="text-sm text-[#9A9A9A]">Preencha os dados abaixo para liberar o download dos materiais oficiais da EPCOS.</p>
            </div>
            <button onClick={onClose} className="text-[#9A9A9A] hover:text-white transition-colors">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isError && (
              <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm border border-red-500/20">
                Erro ao liberar acesso. Tente novamente.
              </div>
            )}
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#9A9A9A] ml-1 uppercase tracking-wider">Nome Completo</label>
              <input type="text" name="name" required placeholder="João Silva" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#9A9A9A] ml-1 uppercase tracking-wider">E-mail Profissional</label>
              <input type="email" name="email" required placeholder="joao@empresa.com.br" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all" />
            </div>

            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <div className="mt-4">
              <MagneticButton 
                type="submit" 
                theme="dark"
                disabled={isSubmitting}
                className="w-full !px-6 !py-3 uppercase text-sm font-semibold tracking-wider"
              >
                {isSubmitting ? "Liberando..." : "Liberar Download"}
              </MagneticButton>
            </div>
            <p className="text-[10px] text-center text-[#6B6B6B] mt-2">
              Ao liberar o acesso, você concorda com nossa <a href="/privacidade" target="_blank" className="underline hover:text-white">Política de Privacidade</a>.
            </p>
          </form>

        </div>
      </TiltWrapper>
    </div>
  );
}
