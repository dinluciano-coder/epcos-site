import { checkAuth } from '@/app/actions';
import { getAllPostsAdmin } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import PostsTable from './PostsTable';

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
  const isAuth = await checkAuth();
  if (!isAuth) redirect('/admin');

  const posts = await getAllPostsAdmin();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black">Painel de Controle</h1>
            <p className="text-[#6B6B6B] text-sm mt-1">Gerencie os conteúdos do site.</p>
          </div>
          <Link href="/admin/posts/new"
            className="px-6 py-3 bg-[#7B2D3B] text-white font-bold rounded-xl hover:bg-[#9A3A4A] transition-colors shadow-lg shadow-[#7B2D3B]/20">
            + Novo Post
          </Link>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex gap-4 mb-10 pb-4 border-b border-white/10">
          <Link href="/admin" className="px-5 py-2.5 text-[#9A9A9A] hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            📁 Downloads
          </Link>
          <div className="px-5 py-2.5 bg-white/10 text-white rounded-xl font-bold border border-white/5">
            📝 Blog / News ({posts.length})
          </div>
        </div>

        <PostsTable posts={posts} />
      </div>
    </div>
  );
}
