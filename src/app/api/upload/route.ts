import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { put } from '@vercel/blob';

async function isAdmin() {
  const c = await cookies();
  return c.get('epcos_admin_session')?.value === 'true';
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 400 });

  const blob = await put(`blog/${Date.now()}-${file.name}`, file, { access: 'public' });
  return NextResponse.json({ url: blob.url });
}
