'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Post } from '@/lib/db';
import { useRouter } from 'next/navigation';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function PostsTable({ posts: initialPosts }: { posts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const togglePublish = async (id: string) => {
    setLoading(id);
    const res = await fetch(`/api/posts/${id}`, { method: 'PATCH' });
    if (res.ok) {
      const updated = await res.json();
      setPosts(prev => prev.map(p => p.id === id ? updated : p));
    }
    setLoading(null);
  };

  const deletePost = async (id: string, title: string) => {
    if (!confirm(`Deletar "${title}"? Esta ação não pode ser desfeita.`)) return;
    setLoading(id);
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts(prev => prev.filter(p => p.id !== id));
    setLoading(null);
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-24 border border-white/5 rounded-3xl">
        <p className="text-[#6B6B6B] mb-4">Nenhum post ainda.</p>
        <Link href="/admin/posts/new" className="text-[#7B2D3B] hover:text-white transition-colors underline">
          Criar o primeiro post
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-white/5 rounded-3xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5 bg-[#111111]">
            <th className="text-left px-6 py-4 text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">Título</th>
            <th className="text-left px-4 py-4 text-xs font-bold text-[#6B6B6B] uppercase tracking-wider hidden md:table-cell">Status</th>
            <th className="text-left px-4 py-4 text-xs font-bold text-[#6B6B6B] uppercase tracking-wider hidden lg:table-cell">Data</th>
            <th className="text-left px-4 py-4 text-xs font-bold text-[#6B6B6B] uppercase tracking-wider hidden md:table-cell">❤️</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, i) => (
            <tr key={post.id} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-[#0A0A0A]' : 'bg-[#0D0D0D]'} hover:bg-[#111111] transition-colors`}>
              <td className="px-6 py-4">
                <div>
                  <p className="text-white font-medium line-clamp-1">{post.title}</p>
                  <p className="text-[#4A4A4A] text-xs mt-0.5">/news/{post.slug}</p>
                </div>
              </td>
              <td className="px-4 py-4 hidden md:table-cell">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${post.published ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${post.published ? 'bg-green-400' : 'bg-yellow-400'}`} />
                  {post.published ? 'Publicado' : 'Rascunho'}
                </span>
              </td>
              <td className="px-4 py-4 text-[#6B6B6B] text-sm hidden lg:table-cell">
                {post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}
              </td>
              <td className="px-4 py-4 text-[#6B6B6B] text-sm hidden md:table-cell">{post.likes}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 justify-end">
                  <Link href={`/news/${post.slug}`} target="_blank"
                    className="p-2 text-[#6B6B6B] hover:text-white transition-colors" title="Ver post">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                  </Link>
                  <Link href={`/admin/posts/${post.id}/edit`}
                    className="p-2 text-[#6B6B6B] hover:text-white transition-colors" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" /></svg>
                  </Link>
                  <button onClick={() => togglePublish(post.id)} disabled={loading === post.id}
                    className="p-2 text-[#6B6B6B] hover:text-yellow-400 transition-colors disabled:opacity-40" title={post.published ? 'Despublicar' : 'Publicar'}>
                    {post.published
                      ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    }
                  </button>
                  <button onClick={() => deletePost(post.id, post.title)} disabled={loading === post.id}
                    className="p-2 text-[#6B6B6B] hover:text-red-500 transition-colors disabled:opacity-40" title="Deletar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
