import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { likePost, hasLiked } from '@/lib/db';
import { randomUUID } from 'crypto';

async function getOrCreateSession(): Promise<string> {
  const c = await cookies();
  let sessionId = c.get('epcos_session')?.value;
  if (!sessionId) {
    sessionId = randomUUID();
    c.set('epcos_session', sessionId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      sameSite: 'lax',
    });
  }
  return sessionId;
}

export async function POST(_: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const sessionId = await getOrCreateSession();
  const result = await likePost(postId, sessionId);
  return NextResponse.json(result);
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const sessionId = await getOrCreateSession();
  const liked = await hasLiked(postId, sessionId);
  return NextResponse.json({ liked });
}
