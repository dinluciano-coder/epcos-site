import { getAllPublishedPosts } from '@/lib/db';
import PostCard from '@/components/blog/PostCard';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'News & Projetos | EPCOS Engenharia',
  description: 'Acompanhe os projetos, artigos técnicos e novidades da EPCOS Engenharia em automação industrial, escaneamento 3D, engenharia reversa e projetos mecânicos.',
  openGraph: {
    title: 'News & Projetos | EPCOS Engenharia',
    description: 'Projetos e artigos técnicos de engenharia mecânica, scanner 3D, automação e muito mais.',
    url: 'https://epcos.eng.br/news',
  },
};

export const revalidate = 60; // revalidate every 60 seconds

export default async function NewsPage() {
  const posts = await getAllPublishedPosts();

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20">
      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 mb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-64 bg-[#7B2D3B]/10 blur-[120px] pointer-events-none" />
        <div className="relative text-center">
          <span className="inline-block text-xs font-bold tracking-[0.3em] text-[#7B2D3B] uppercase mb-4">
            EPCOS Engenharia
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-5">
            News &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2D3B] to-[#c0505f]">
              Projetos
            </span>
          </h1>
          <p className="text-[#9A9A9A] text-lg max-w-2xl mx-auto">
            Artigos técnicos, projetos recentes e novidades sobre automação industrial,
            escaneamento 3D, engenharia reversa e metrologia.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-6">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#1A1A1A] border border-white/5 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Em breve, novos artigos</h2>
            <p className="text-[#6B6B6B]">Estamos preparando conteúdo técnico de alta qualidade.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-20 text-center">
        <p className="text-[#6B6B6B] text-sm">
          Quer falar sobre um projeto?{' '}
          <Link href="/#contato" className="text-[#7B2D3B] hover:text-white transition-colors underline underline-offset-4">
            Entre em contato
          </Link>
        </p>
      </section>
    </main>
  );
}
