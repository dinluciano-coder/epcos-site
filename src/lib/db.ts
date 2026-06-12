import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.STORAGE_POSTGRES_URL!);

export { sql };

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_url: string | null;
  tags: string[];
  meta_title: string | null;
  meta_desc: string | null;
  published: boolean;
  likes: number;
  created_at: string;
  published_at: string | null;
}

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getAllPublishedPosts(): Promise<Post[]> {
  const rows = await sql`
    SELECT * FROM posts 
    WHERE published = true 
    ORDER BY published_at DESC
  `;
  return rows as Post[];
}

export async function getAllPostsAdmin(): Promise<Post[]> {
  const rows = await sql`
    SELECT * FROM posts 
    ORDER BY created_at DESC
  `;
  return rows as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const rows = await sql`
    SELECT * FROM posts WHERE slug = ${slug} LIMIT 1
  `;
  return (rows[0] as Post) ?? null;
}

export async function getPostById(id: string): Promise<Post | null> {
  const rows = await sql`
    SELECT * FROM posts WHERE id = ${id} LIMIT 1
  `;
  return (rows[0] as Post) ?? null;
}

export async function getRelatedPosts(postId: string, tags: string[]): Promise<Post[]> {
  if (!tags.length) return [];
  const rows = await sql`
    SELECT * FROM posts 
    WHERE published = true 
      AND id != ${postId}
      AND tags && ${tags}::text[]
    ORDER BY published_at DESC
    LIMIT 3
  `;
  return rows as Post[];
}

export async function createPost(data: {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  cover_url?: string;
  tags?: string[];
  meta_title?: string;
  meta_desc?: string;
  published?: boolean;
}): Promise<Post> {
  const rows = await sql`
    INSERT INTO posts (slug, title, excerpt, content, cover_url, tags, meta_title, meta_desc, published, published_at)
    VALUES (
      ${data.slug},
      ${data.title},
      ${data.excerpt ?? null},
      ${data.content},
      ${data.cover_url ?? null},
      ${data.tags ?? []}::text[],
      ${data.meta_title ?? null},
      ${data.meta_desc ?? null},
      ${data.published ?? false},
      ${data.published ? new Date().toISOString() : null}
    )
    RETURNING *
  `;
  return rows[0] as Post;
}

export async function updatePost(id: string, data: {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  cover_url?: string;
  tags?: string[];
  meta_title?: string;
  meta_desc?: string;
}): Promise<Post> {
  const rows = await sql`
    UPDATE posts SET
      title      = COALESCE(${data.title ?? null}, title),
      slug       = COALESCE(${data.slug ?? null}, slug),
      excerpt    = COALESCE(${data.excerpt ?? null}, excerpt),
      content    = COALESCE(${data.content ?? null}, content),
      cover_url  = COALESCE(${data.cover_url ?? null}, cover_url),
      tags       = COALESCE(${data.tags ?? null}::text[], tags),
      meta_title = COALESCE(${data.meta_title ?? null}, meta_title),
      meta_desc  = COALESCE(${data.meta_desc ?? null}, meta_desc)
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Post;
}

export async function togglePublish(id: string): Promise<Post> {
  const rows = await sql`
    UPDATE posts SET
      published    = NOT published,
      published_at = CASE WHEN NOT published THEN NOW() ELSE published_at END
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Post;
}

export async function deletePost(id: string): Promise<void> {
  await sql`DELETE FROM posts WHERE id = ${id}`;
}

export async function likePost(postId: string, sessionId: string): Promise<{ liked: boolean; likes: number }> {
  try {
    // Try to insert a like record
    await sql`
      INSERT INTO post_likes (post_id, session_id)
      VALUES (${postId}, ${sessionId})
    `;
    // Increment likes counter
    const rows = await sql`
      UPDATE posts SET likes = likes + 1 WHERE id = ${postId} RETURNING likes
    `;
    return { liked: true, likes: rows[0].likes };
  } catch {
    // UNIQUE constraint violation = already liked, so unlike
    await sql`
      DELETE FROM post_likes WHERE post_id = ${postId} AND session_id = ${sessionId}
    `;
    const rows = await sql`
      UPDATE posts SET likes = GREATEST(0, likes - 1) WHERE id = ${postId} RETURNING likes
    `;
    return { liked: false, likes: rows[0].likes };
  }
}

export async function hasLiked(postId: string, sessionId: string): Promise<boolean> {
  const rows = await sql`
    SELECT 1 FROM post_likes WHERE post_id = ${postId} AND session_id = ${sessionId}
  `;
  return rows.length > 0;
}
