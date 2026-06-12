import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/db';

const TAG_COLORS: Record<string, string> = {
  'Scanner 3D':          'bg-blue-500/20 text-blue-300',
  'Engenharia Reversa':  'bg-purple-500/20 text-purple-300',
  'Projetos Mecânicos':  'bg-orange-500/20 text-orange-300',
  'Automação':           'bg-green-500/20 text-green-300',
  'NR12':                'bg-red-500/20 text-red-300',
  'Metrologia':          'bg-cyan-500/20 text-cyan-300',
  'Detalhamento':        'bg-yellow-500/20 text-yellow-300',
  'Simulação':           'bg-pink-500/20 text-pink-300',
};

function tagColor(tag: string) {
  return TAG_COLORS[tag] ?? 'bg-white/10 text-white/60';
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/news/${post.slug}`} className="group block">
      <article className="h-full bg-[#111111] border border-white/5 rounded-3xl overflow-hidden hover:border-[#7B2D3B]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#7B2D3B]/10">
        {/* Cover image */}
        <div className="relative h-52 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] overflow-hidden">
          {post.cover_url ? (
            <Image
              src={post.cover_url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-white/5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#c0505f] transition-colors duration-300 leading-snug">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-[#6B6B6B] text-sm leading-relaxed line-clamp-3 mb-4">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-[#4A4A4A]">
            <span>{post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}</span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#7B2D3B]">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
              {post.likes}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
