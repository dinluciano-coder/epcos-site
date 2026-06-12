"use client";

import { useState, useRef, useEffect } from "react";
import { login, logout, getFiles, deleteFile, uploadFileAction } from "../actions";
import MagneticButton from "@/components/MagneticButton";

export default function AdminClient({ initialAuth }: { initialAuth: boolean }) {
  const [isAuth, setIsAuth] = useState(initialAuth);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [files, setFiles] = useState<any[]>([]);
  const [fetchingFiles, setFetchingFiles] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFiles = async () => {
    setFetchingFiles(true);
    const res = await getFiles();
    if (res.success && res.files) {
      setFiles(res.files);
    } else {
      setError(res.error || "Erro ao carregar arquivos");
    }
    setFetchingFiles(false);
  };

  useEffect(() => {
    if (isAuth) {
      loadFiles();
    }
  }, [isAuth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await login(password);
    if (res.success) {
      setIsAuth(true);
    } else {
      setError(res.error || "Senha incorreta");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsAuth(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setUploading(true);
    setError("");
    
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Timeout de 15 segundos para evitar travamento se a Vercel demorar
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Timeout: O servidor demorou muito para responder.")), 15000)
      );

      const res = await Promise.race([uploadFileAction(formData), timeout]) as any;
      
      if (res.success) {
        await loadFiles();
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setError(`Erro no envio: ${res.error}`);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (err: any) {
      console.error("Upload error details:", err);
      setError(`Erro crítico: ${err.message || "Tamanho excedido ou erro de rede."}`);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (url: string) => {
    if (!confirm("Tem certeza que deseja deletar este arquivo? Ele sumirá do site imediatamente.")) return;
    
    setFetchingFiles(true);
    const res = await deleteFile(url);
    if (res.success) {
      await loadFiles();
    } else {
      setError(res.error || "Erro ao deletar arquivo");
      setFetchingFiles(false);
    }
  };

  if (!isAuth) {
    return (
      <div className="glass-card-dark p-8 md:p-12 bg-[#1A1A1A]/80 border border-white/10 rounded-3xl max-w-md mx-auto mt-10">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Painel Admin</h1>
        <p className="text-[#9A9A9A] text-center mb-8 text-sm">Acesso restrito à diretoria EPCOS.</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {error && <div className="p-3 bg-red-500/10 text-red-400 rounded-xl text-sm border border-red-500/20 text-center">{error}</div>}
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-white uppercase tracking-wider">Senha Mestra</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#7B2D3B] focus:ring-1 focus:ring-[#7B2D3B] transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <MagneticButton type="submit" theme="red" disabled={loading} className="w-full mt-2 py-4 font-bold tracking-wider">
            {loading ? "Verificando..." : "Entrar"}
          </MagneticButton>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Painel de Controle</h1>
          <p className="text-[#9A9A9A]">Bem-vindo à área restrita da EPCOS.</p>
        </div>
        <button onClick={handleLogout} className="text-sm text-[#9A9A9A] hover:text-white underline underline-offset-4 transition-colors">
          Sair
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex gap-4 mb-10 pb-4 border-b border-white/10">
        <div className="px-5 py-2.5 bg-white/10 text-white rounded-xl font-bold border border-white/5">
          📁 Downloads
        </div>
        <a href="/admin/posts" className="px-5 py-2.5 text-[#9A9A9A] hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
          📝 Blog / News
        </a>
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20">{error}</div>}

      {/* Upload Section */}
      <div className="glass-card-dark p-8 bg-[#1A1A1A]/50 border border-white/10 rounded-3xl mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Novo Arquivo</h3>
          <p className="text-sm text-[#6B6B6B]">Formatos aceitos: PDF, ZIP, DOCX, Imagens. Limite recomendado: 50MB.</p>
        </div>
        
        <div>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.zip,.docx,.png,.jpg,.jpeg,.svg"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className={`px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${uploading ? "bg-[#7B2D3B]/50 text-white/50 cursor-not-allowed" : "bg-[#7B2D3B] text-white hover:bg-[#9A3A4A] shadow-lg shadow-[#7B2D3B]/20"}`}
          >
            {uploading ? "Processando..." : "Fazer Upload"}
          </button>
        </div>
      </div>

      {/* Files List */}
      <div className="glass-card-dark p-8 bg-[#1A1A1A]/80 border border-white/10 rounded-3xl">
        <h3 className="text-xl font-bold text-white mb-6">Arquivos Ativos no Site ({files.length})</h3>
        
        {fetchingFiles && files.length === 0 ? (
          <div className="text-center py-10 text-[#6B6B6B]">Carregando arquivos...</div>
        ) : files.length === 0 ? (
          <div className="text-center py-10 text-[#6B6B6B]">Nenhum arquivo na nuvem no momento.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {files.map((file) => (
              <div key={file.url} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-[#7B2D3B]/20 flex items-center justify-center text-[#7B2D3B]">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium truncate">{file.pathname}</p>
                    <p className="text-xs text-[#6B6B6B]">{(file.size / 1024 / 1024).toFixed(2)} MB • Enviado em {new Date(file.uploadedAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 ml-4 shrink-0">
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="p-2 text-[#9A9A9A] hover:text-white transition-colors" title="Baixar/Visualizar">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </a>
                  <button onClick={() => handleDelete(file.url)} className="p-2 text-[#9A9A9A] hover:text-red-500 transition-colors" title="Deletar">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
