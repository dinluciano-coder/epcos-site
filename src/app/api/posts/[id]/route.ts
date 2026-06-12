import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPostById, updatePost, deletePost, togglePublish } from '@/lib/db';
import slugify from 'slugify';

async function isAdmin() {
  const c = await cookies();
  return c.get('epcos_admin_session')?.value === 'true';
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  const { id } = await params;
  const body = await req.json();

  if (body.title) {
    body.slug = slugify(body.title, { lower: true, strict: true, locale: 'pt' });
  }

  const post = await updatePost(id, body);
  return NextResponse.json(post);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  const { id } = await params;
  await deletePost(id);
  return NextResponse.json({ success: true });
}

export async function PATCH(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  const { id } = await params;
  const post = await togglePublish(id);
  return NextResponse.json(post);
}
