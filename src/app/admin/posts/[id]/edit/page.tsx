import { checkAuth } from '@/app/actions';
import { getPostById } from '@/lib/db';
import { redirect, notFound } from 'next/navigation';
import PostForm from '@/components/blog/PostForm';
import Link from 'next/link';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const isAuth = await checkAuth();
  if (!isAuth) redirect('/admin');

  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/admin/posts" className="text-[#6B6B6B] hover:text-white transition-colors">← Voltar</Link>
          <div>
            <h1 className="text-3xl font-black text-white">Editar Post</h1>
            <p className="text-[#6B6B6B] text-sm">{post.title}</p>
          </div>
        </div>
        <PostForm initialData={{
          id: post.id,
          title: post.title,
          excerpt: post.excerpt ?? '',
          content: post.content,
          cover_url: post.cover_url ?? '',
          tags: post.tags ?? [],
          meta_title: post.meta_title ?? '',
          meta_desc: post.meta_desc ?? '',
          published: post.published,
        }} />
      </div>
    </div>
  );
}
