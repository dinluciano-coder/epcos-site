import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAllPublishedPosts, getAllPostsAdmin, createPost } from '@/lib/db';
import slugify from 'slugify';

async function isAdmin() {
  const c = await cookies();
  return c.get('epcos_admin_session')?.value === 'true';
}

export async function GET(req: NextRequest) {
  const isAdm = await isAdmin();
  const posts = isAdm
    ? await getAllPostsAdmin()
    : await getAllPublishedPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }
  const body = await req.json();
  const { title, excerpt, content, cover_url, tags, meta_title, meta_desc, published } = body;

  if (!title || !content) {
    return NextResponse.json({ error: 'Título e conteúdo são obrigatórios' }, { status: 400 });
  }

  const slug = slugify(title, { lower: true, strict: true, locale: 'pt' });

  const post = await createPost({
    slug,
    title,
    excerpt,
    content,
    cover_url,
    tags: tags ?? [],
    meta_title,
    meta_desc,
    published: published ?? false,
  });

  return NextResponse.json(post, { status: 201 });
}
