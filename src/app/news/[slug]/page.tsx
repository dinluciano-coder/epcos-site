import { getPostBySlug, getRelatedPosts, getAllPublishedPosts } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import LikeButton from '@/components/blog/LikeButton';
import ShareButton from '@/components/blog/ShareButton';
import PostCard from '@/components/blog/PostCard';

const BASE_URL = 'https://epcos.eng.br';

export const revalidate = 60; // revalidate every 60 seconds
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPublishedPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.meta_title || post.title;
  const description = post.meta_desc || post.excerpt || `Artigo técnico da EPCOS Engenharia: ${post.title}`;
  const url = `${BASE_URL}/news/${post.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.published_at ?? post.created_at,
      tags: post.tags,
      images: post.cover_url
        ? [{ url: post.cover_url, width: 1200, height: 630, alt: post.title }]
        : [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.cover_url ? [post.cover_url] : [`${BASE_URL}/og-image.jpg`],
    },
    alternates: { canonical: url },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const related = await getRelatedPosts(post.id, post.tags ?? []);
  const url = `${BASE_URL}/news/${post.slug}`;

  // JSON-LD for the article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { '@type': 'Organization', name: 'EPCOS Engenharia', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'EPCOS Engenharia', url: BASE_URL },
    image: post.cover_url || `${BASE_URL}/og-image.jpg`,
    url,
    keywords: post.tags?.join(', '),
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-8">
        <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-[#9A9A9A] text-sm">
          <span className="font-bold text-white">EPCOS Engenharia</span>
          <span>•</span>
          <span>{post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}</span>
        </div>
      </div>

      {/* Featured Image */}
      {post.cover_url && (
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#111111]">
            <Image 
              src={post.cover_url} 
              alt={post.title} 
              width={1200} 
              height={675} 
              className="w-full h-auto object-contain" 
              priority 
            />
          </div>
        </div>
      )}

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-6 py-4">
        {/* Excerpt / intro */}
        {post.excerpt && (
          <p className="text-xl text-[#9A9A9A] leading-relaxed mb-10 pb-10 border-b border-white/10">
            {post.excerpt}
          </p>
        )}

        {/* Rich text content */}
        <div
          className="prose-epcos"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Action bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center gap-4">
          <LikeButton postId={post.id} initialLikes={post.likes} />
          <ShareButton title={post.title} url={url} />
          <Link href="/news" className="ml-auto text-sm text-[#6B6B6B] hover:text-white transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Todos os posts
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="border-t border-white/5 pt-14">
            <h2 className="text-2xl font-bold text-white mb-8">Posts Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(p => <PostCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
