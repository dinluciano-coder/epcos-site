// Script de migração — cria as tabelas do blog no Neon Postgres
// Executar: node scripts/migrate.mjs

import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env.local') });

const sql = neon(process.env.STORAGE_POSTGRES_URL);

async function migrate() {
  console.log('🚀 Iniciando migração do banco de dados...');

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug         VARCHAR(255) UNIQUE NOT NULL,
      title        VARCHAR(500) NOT NULL,
      excerpt      TEXT,
      content      TEXT NOT NULL DEFAULT '',
      cover_url    VARCHAR(1000),
      tags         TEXT[] DEFAULT '{}',
      meta_title   VARCHAR(500),
      meta_desc    TEXT,
      published    BOOLEAN DEFAULT false,
      likes        INTEGER DEFAULT 0,
      created_at   TIMESTAMPTZ DEFAULT NOW(),
      published_at TIMESTAMPTZ
    )
  `;
  console.log('✅ Tabela "posts" criada');

  await sql`
    CREATE TABLE IF NOT EXISTS post_likes (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      post_id    UUID REFERENCES posts(id) ON DELETE CASCADE,
      session_id VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(post_id, session_id)
    )
  `;
  console.log('✅ Tabela "post_likes" criada');

  // Índices para performance
  await sql`CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published, published_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes(post_id)`;

  console.log('✅ Índices criados');
  console.log('🎉 Migração concluída com sucesso!');
}

migrate().catch((err) => {
  console.error('❌ Erro na migração:', err);
  process.exit(1);
});
