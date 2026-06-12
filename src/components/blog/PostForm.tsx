'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import slugify from 'slugify';

const RichTextEditor = dynamic(() => import('@/components/blog/RichTextEditor'), { ssr: false });

interface PostFormProps {
  initialData?: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    cover_url: string;
    tags: string[];
    meta_title: string;
    meta_desc: string;
    published: boolean;
  };
}

export default function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const isEdit = !!initialData?.id;

  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [coverUrl, setCoverUrl] = useState(initialData?.cover_url ?? '');
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);
  const [tagInput, setTagInput] = useState('');
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title ?? '');
  const [metaDesc, setMetaDesc] = useState(initialData?.meta_desc ?? '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (v: string) => {
    setTitle(v);
    setSlug(slugify(v, { lower: true, strict: true, locale: 'pt' }));
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags(prev => [...prev, t]);
    setTagInput('');
  };

  const uploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) setCoverUrl(data.url);
    setUploading(false);
  };

  const save = async (publish: boolean) => {
    if (!title.trim() || !content.trim()) {
      setError('Título e conteúdo são obrigatórios.');
      return;
    }
    setSaving(true);
    setError('');

    const payload = { title, excerpt, content, cover_url: coverUrl, tags, meta_title: metaTitle, meta_desc: metaDesc, published: publish };

    const url = isEdit ? `/api/posts/${initialData!.id}` : '/api/posts';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/posts');
      router.refresh();
    } else {
      const d = await res.json();
      setError(d.error ?? 'Erro ao salvar post.');
    }
    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {error && <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20">{error}</div>}

      <div className="flex flex-col gap-6">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">Título *</label>
          <input value={title} onChange={e => handleTitleChange(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white text-xl font-bold focus:outline-none focus:border-[#7B2D3B] transition-colors"
            placeholder="Título do post..." />
          {slug && <p className="mt-1 text-xs text-[#6B6B6B]">URL: /news/<span className="text-[#7B2D3B]">{slug}</span></p>}
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">Resumo (excerpt)</label>
          <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-[#7B2D3B] transition-colors"
            placeholder="Breve resumo do post (~160 caracteres)..." />
          <p className="text-xs text-[#4A4A4A] mt-1">{excerpt.length}/160 chars</p>
        </div>

        {/* Cover image */}
        <div>
          <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">Imagem de Capa</label>
          <div className="flex gap-4 items-start">
            {coverUrl && (
              <div className="relative w-40 h-28 rounded-xl overflow-hidden border border-white/10 shrink-0">
                <Image src={coverUrl} alt="Capa" fill className="object-cover" />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <button type="button" onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="px-5 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-sm text-white hover:border-white/30 transition-colors disabled:opacity-50">
                {uploading ? 'Enviando...' : coverUrl ? '↔ Trocar imagem' : '+ Escolher imagem'}
              </button>
              {coverUrl && (
                <button type="button" onClick={() => setCoverUrl('')} className="text-xs text-red-400 hover:text-red-300">Remover</button>
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={uploadCover} className="hidden" />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(t => (
              <span key={t} className="flex items-center gap-1.5 px-3 py-1 bg-[#7B2D3B]/20 text-[#c0505f] border border-[#7B2D3B]/30 rounded-full text-sm">
                {t}
                <button type="button" onClick={() => setTags(prev => prev.filter(x => x !== t))} className="hover:text-white">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={tagInput} onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#7B2D3B] transition-colors"
              placeholder="Ex: Scanner 3D, NR12, Automação..." />
            <button type="button" onClick={addTag}
              className="px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-xl text-sm text-white hover:border-white/30 transition-colors">
              + Adicionar
            </button>
          </div>
        </div>

        {/* Editor */}
        <div>
          <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">Conteúdo *</label>
          <RichTextEditor content={content} onChange={setContent} />
        </div>

        {/* SEO */}
        <details className="group">
          <summary className="cursor-pointer text-xs font-bold text-[#9A9A9A] uppercase tracking-wider list-none flex items-center gap-2 hover:text-white transition-colors">
            <span className="group-open:rotate-90 transition-transform">▶</span>
            Configurações de SEO (opcional)
          </summary>
          <div className="mt-4 flex flex-col gap-4 pl-4 border-l border-white/10">
            <div>
              <label className="block text-xs text-[#6B6B6B] mb-1">Meta Title (se vazio, usa o título do post)</label>
              <input value={metaTitle} onChange={e => setMetaTitle(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#7B2D3B] transition-colors"
                placeholder="Título para o Google..." />
            </div>
            <div>
              <label className="block text-xs text-[#6B6B6B] mb-1">Meta Description (~160 chars)</label>
              <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} rows={2}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none focus:outline-none focus:border-[#7B2D3B] transition-colors"
                placeholder="Descrição para o Google..." />
            </div>
          </div>
        </details>

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t border-white/10 sticky bottom-6">
          <button type="button" onClick={() => save(false)} disabled={saving}
            className="flex-1 py-4 bg-[#1A1A1A] border border-white/10 rounded-xl text-white font-semibold hover:bg-[#222] transition-colors disabled:opacity-50">
            {saving ? 'Salvando...' : '💾 Salvar Rascunho'}
          </button>
          <button type="button" onClick={() => save(true)} disabled={saving}
            className="flex-1 py-4 bg-[#7B2D3B] rounded-xl text-white font-bold hover:bg-[#9A3A4A] transition-colors shadow-lg shadow-[#7B2D3B]/20 disabled:opacity-50">
            {saving ? 'Publicando...' : '🚀 Publicar'}
          </button>
        </div>
      </div>
    </div>
  );
}
