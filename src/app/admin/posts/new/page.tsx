import { checkAuth } from '@/app/actions';
import { redirect } from 'next/navigation';
import PostForm from '@/components/blog/PostForm';
import Link from 'next/link';

export default async function NewPostPage() {
  const isAuth = await checkAuth();
  if (!isAuth) redirect('/admin');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/admin/posts" className="text-[#6B6B6B] hover:text-white transition-colors">
            ← Voltar
          </Link>
          <div>
            <h1 className="text-3xl font-black text-white">Novo Post</h1>
            <p className="text-[#6B6B6B] text-sm">Crie e publique um novo artigo ou projeto.</p>
          </div>
        </div>
        <PostForm />
      </div>
    </div>
  );
}
