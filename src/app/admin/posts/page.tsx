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
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Link href="/admin" className="text-[#6B6B6B] hover:text-white text-sm transition-colors">← Admin</Link>
              <span className="text-[#333]">/</span>
              <span className="text-white font-bold">Posts</span>
            </div>
            <h1 className="text-3xl font-black">Gerenciar Posts</h1>
            <p className="text-[#6B6B6B] text-sm mt-1">{posts.length} post(s) no total</p>
          </div>
          <Link href="/admin/posts/new"
            className="px-6 py-3 bg-[#7B2D3B] text-white font-bold rounded-xl hover:bg-[#9A3A4A] transition-colors shadow-lg shadow-[#7B2D3B]/20">
            + Novo Post
          </Link>
        </div>

        <PostsTable posts={posts} />
      </div>
    </div>
  );
}
