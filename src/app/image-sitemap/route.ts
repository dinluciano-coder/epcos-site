import { getAllPublishedPosts } from '@/lib/db';

const B = 'https://epcos.eng.br';

// Todas as imagens do site mapeadas com alt text rico para SEO
const ALL_STATIC_IMAGES = [
  // ── Logo e identidade da marca ─────────────────────────────────────────────
  { page: B, src: B + '/logo-epcos.png',       title: 'Logo EPCOS Engenharia - Projetos Mecanicos Betim MG',         caption: 'Logotipo da EPCOS Engenharia, empresa de projetos mecanicos e automacao industrial em Betim MG' },
  { page: B, src: B + '/logo-epcos-white.png', title: 'Logo EPCOS Engenharia Branco - Engenharia Mecanica Betim',     caption: 'Logotipo branco da EPCOS Engenharia - projetos mecanicos, escaneamento 3D e automacao Betim MG' },
  { page: B, src: B + '/og-image.jpg',         title: 'EPCOS Engenharia - Projetos Mecanicos e Scanner 3D Betim MG', caption: 'EPCOS Engenharia: especialistas em projetos mecanicos industriais, escaneamento 3D e automacao NR12 em Betim Minas Gerais' },

  // ── Logos de parceiros e clientes ─────────────────────────────────────────
  { page: B, src: B + '/logo-1.png', title: 'Parceiro Industrial EPCOS Engenharia - Betim MG', caption: 'Empresa parceira da EPCOS Engenharia em projetos mecanicos e automacao industrial' },
  { page: B, src: B + '/logo-2.png', title: 'Cliente EPCOS Engenharia - Projetos Mecanicos MG', caption: 'Cliente industrial atendido pela EPCOS Engenharia em Minas Gerais' },
  { page: B, src: B + '/logo-3.png', title: 'Parceiro EPCOS - Engenharia Mecanica Industrial', caption: 'Parceiro comercial da EPCOS Engenharia - projetos mecanicos e maquinas especiais' },
  { page: B, src: B + '/logo-4.png', title: 'Cliente EPCOS Engenharia - Automacao Industrial BH', caption: 'Empresa cliente da EPCOS Engenharia - automacao e detalhamento mecanico regiao BH' },
  { page: B, src: B + '/logo-5.png', title: 'Parceiro Industrial EPCOS - Detalhamento 3D Minas Gerais', caption: 'Parceiro da EPCOS Engenharia em projetos de detalhamento 3D e maquinas especiais MG' },
  { page: B, src: B + '/logo-6.png', title: 'Cliente EPCOS Engenharia - Projeto Mecanico CAD', caption: 'Cliente atendido pela EPCOS Engenharia com projetos mecanicos e modelagem CAD' },
  { page: B, src: B + '/logo-7.png', title: 'Parceiro EPCOS - Engenharia Mecanica Betim Contagem', caption: 'Parceiro industrial da EPCOS Engenharia na regiao de Betim e Contagem MG' },
  { page: B, src: B + '/logo-8.png', title: 'Cliente EPCOS Engenharia - Automacao e NR12', caption: 'Empresa parceira da EPCOS Engenharia em adequacao NR12 e automacao industrial' },
  { page: B, src: B + '/logo-9.png', title: 'Parceiro EPCOS - Projeto Mecanico Industrial Brasil', caption: 'Parceiro nacional da EPCOS Engenharia em projetos mecanicos industriais' },
  { page: B, src: B + '/logo-nov.png',       title: 'Parceiro EPCOS Engenharia - Industria Mineira',    caption: 'Empresa parceira da EPCOS Engenharia na industria mineira' },
  { page: B, src: B + '/logo-reciclabr.png', title: 'ReciclaBR Parceiro EPCOS - Sustentabilidade Industrial', caption: 'ReciclaBR, empresa parceira da EPCOS Engenharia em projetos sustentaveis' },

  // ── Infraestrutura e equipe ────────────────────────────────────────────────
  { page: B, src: B + '/infra-official-eng.jpg',       title: 'Equipe EPCOS Engenharia Betim MG - Especialistas em Projetos Mecanicos',      caption: 'Equipe de engenheiros da EPCOS Engenharia, especialistas em projetos mecanicos, automacao industrial e escaneamento 3D em Betim MG' },
  { page: B, src: B + '/infra-official-meeting.jpg',   title: 'EPCOS Engenharia - Reuniao Tecnica de Projetos Mecanicos',                    caption: 'Reuniao tecnica de projetos mecanicos e automacao industrial da equipe EPCOS Engenharia em Betim Minas Gerais' },
  { page: B, src: B + '/infra-official-metrology.jpg', title: 'EPCOS Metrologia - Laboratorio de Inspecao Dimensional Betim MG',             caption: 'Laboratorio de metrologia e inspecao dimensional 3D da EPCOS Engenharia em Betim MG' },
  { page: B, src: B + '/infra-eng.png',       title: 'Infraestrutura de Engenharia EPCOS - Escritorio Betim MG',  caption: 'Escritorio e infraestrutura de engenharia da EPCOS Engenharia localizada em Betim Minas Gerais' },
  { page: B, src: B + '/infra-meeting.png',   title: 'EPCOS Engenharia - Reuniao de Equipe Tecnica Industrial',   caption: 'Reuniao da equipe tecnica da EPCOS Engenharia discutindo projetos mecanicos e automacao industrial' },
  { page: B, src: B + '/infra-metrology.png', title: 'EPCOS 3D - Infraestrutura de Metrologia e Inspecao 3D',     caption: 'Infraestrutura de metrologia e escaneamento 3D da EPCOS Engenharia em Betim MG' },
  { page: B, src: B + '/infra-official-1.jpg', title: 'EPCOS Engenharia Betim - Equipe de Engenheiros Especializados', caption: 'Equipe especializada da EPCOS Engenharia em Betim MG - projetos mecanicos e automacao' },
  { page: B, src: B + '/infra-official-2.jpg', title: 'EPCOS Engenharia - Profissionais de Engenharia Mecanica MG', caption: 'Profissionais de engenharia mecanica da EPCOS em Minas Gerais' },
  { page: B, src: B + '/infra-official-3.jpg', title: 'EPCOS Engenharia - Time Tecnico em Betim MG', caption: 'Time tecnico da EPCOS Engenharia especializado em projetos CAD e automacao industrial' },

  // ── Scanner 3D ────────────────────────────────────────────────────────────
  { page: B, src: B + '/scanner-raptor-x.png',    title: 'Scanner 3D Creality Raptor X - EPCOS Metrologia Betim MG',              caption: 'Scanner 3D Creality Raptor X utilizado pela EPCOS Engenharia para escaneamento industrial de alta precisao 0,02mm em Betim MG' },
  { page: B, src: B + '/scanner.png',             title: 'Scanner 3D Industrial EPCOS Engenharia - Escaneamento de Precisao',     caption: 'Scanner 3D industrial da EPCOS Engenharia para digitalizacao de pecas e metrologia dimensional em Betim MG' },
  { page: B, src: B + '/scanner-diagonal.png',    title: 'EPCOS 3D - Scanner Industrial em Angulo - Metrologia Betim',            caption: 'Scanner 3D industrial em posicao diagonal - EPCOS Engenharia metrologia e escaneamento Betim MG' },
  { page: B, src: B + '/scanner-accordion-1.jpg', title: 'Escaneamento 3D Industrial EPCOS - Nuvem de Pontos de Peca',           caption: 'Escaneamento 3D industrial com geracao de nuvem de pontos para metrologia - EPCOS Engenharia' },
  { page: B, src: B + '/scanner-accordion-2.jpg', title: 'Metrologia 3D EPCOS - Inspecao Dimensional de Componentes Industriais', caption: 'Metrologia 3D e inspecao dimensional de componentes industriais - EPCOS Engenharia Betim MG' },
  { page: B, src: B + '/scanner-accordion-3.jpg', title: 'Engenharia Reversa EPCOS - Digitalizacao 3D para Modelagem CAD',       caption: 'Engenharia reversa com digitalizacao 3D de pecas para reconstrucao em modelagem CAD - EPCOS Engenharia' },
  { page: B, src: B + '/scanner-accordion-4.jpg', title: 'Controle Dimensional EPCOS - Laudo Metrologico Industrial',            caption: 'Controle dimensional e emissao de laudos metrologicos industriais - EPCOS 3D Engenharia Betim MG' },
  { page: B, src: B + '/scanner-accordion-5.jpg', title: 'Digitalizacao 3D de Geometrias Complexas - EPCOS Betim MG',            caption: 'Digitalizacao 3D de geometrias complexas em pecas industriais - EPCOS Engenharia Betim Minas Gerais' },

  // ── Projetos Mecanicos ────────────────────────────────────────────────────
  { page: B, src: B + '/projeto-mecanico-1.jpg',   title: 'Projeto Mecanico Industrial EPCOS - Modelagem 3D CAD',            caption: 'Projeto mecanico industrial com modelagem 3D CAD desenvolvido pela EPCOS Engenharia em Betim MG' },
  { page: B, src: B + '/projeto-mecanico-1-a.jpg', title: 'Projeto Mecanico EPCOS - Detalhamento Tecnico Industrial A',      caption: 'Detalhamento tecnico de projeto mecanico industrial - EPCOS Engenharia Betim Minas Gerais' },
  { page: B, src: B + '/projeto-mecanico-1-b.jpg', title: 'Projeto Mecanico EPCOS - CAD 3D e Estrutural B',                 caption: 'Projeto CAD 3D e analise estrutural de maquina industrial - EPCOS Engenharia' },
  { page: B, src: B + '/projeto-mecanico-1-c.jpg', title: 'Projeto Mecanico EPCOS - Maquina Especial CAD C',                caption: 'Projeto de maquina especial com CAD 3D completo - EPCOS Engenharia Betim MG' },
  { page: B, src: B + '/projeto-mecanico-2.jpg',   title: 'Maquina Especial EPCOS Engenharia - Detalhamento Tecnico 2D 3D', caption: 'Maquina especial industrial com detalhamento tecnico 2D e 3D - EPCOS Engenharia Betim MG' },
  { page: B, src: B + '/projeto-mecanico-2-a.jpg', title: 'Projeto Mecanico EPCOS - Automacao Industrial CAD A',           caption: 'Projeto de automacao industrial com modelagem CAD - EPCOS Engenharia Betim Minas Gerais' },
  { page: B, src: B + '/projeto-mecanico-2-b.jpg', title: 'Projeto Mecanico EPCOS - Dispositivo de Montagem B',            caption: 'Projeto de dispositivo de montagem industrial - EPCOS Engenharia' },
  { page: B, src: B + '/projeto-mecanico-2-c.jpg', title: 'Projeto Mecanico EPCOS - Gabarito Industrial CAD C',            caption: 'Projeto de gabarito industrial com modelagem 3D - EPCOS Engenharia Betim MG' },
  { page: B, src: B + '/projeto-mecanico-3.jpg',   title: 'Engenharia Reversa EPCOS - Modelagem CAD Betim MG',             caption: 'Projeto de engenharia reversa com modelagem CAD - EPCOS Engenharia Betim Minas Gerais' },
  { page: B, src: B + '/projeto-mecanico-3-a.jpg', title: 'Engenharia Reversa EPCOS - Digitalizacao e CAD A',              caption: 'Engenharia reversa com digitalizacao 3D e modelagem CAD - EPCOS Engenharia' },
  { page: B, src: B + '/projeto-mecanico-3-b.jpg', title: 'Engenharia Reversa EPCOS - Reconstrucao de Peca Industrial B',  caption: 'Reconstrucao de peca industrial via engenharia reversa - EPCOS Engenharia Betim MG' },
  { page: B, src: B + '/projeto-mecanico-3-c.jpg', title: 'Engenharia Reversa EPCOS - Modelo 3D Reconstruido C',           caption: 'Modelo 3D reconstruido via engenharia reversa - EPCOS Engenharia' },

  // ── Portfólio de Projetos ─────────────────────────────────────────────────
  { page: B + '/#projetos', src: B + '/novo-projeto-1-a.jpg', title: 'Celula Robotica EPCOS - Projeto de Automacao Industrial A', caption: 'Projeto de celula robotica e automacao industrial desenvolvido pela EPCOS Engenharia Betim MG' },
  { page: B + '/#projetos', src: B + '/novo-projeto-1-b.jpg', title: 'Celula Robotica EPCOS - Projeto de Automacao Industrial B', caption: 'Celula robotica de automacao industrial - EPCOS Engenharia Betim Minas Gerais' },
  { page: B + '/#projetos', src: B + '/novo-projeto-1-c.jpg', title: 'Celula Robotica EPCOS - Automacao e CAD 3D C',             caption: 'Projeto 3D de celula robotica para automacao industrial - EPCOS Engenharia' },
  { page: B + '/#projetos', src: B + '/novo-projeto-1-d.jpg', title: 'Celula Robotica EPCOS - Detalhamento Mecanico D',          caption: 'Detalhamento mecanico de celula robotica industrial - EPCOS Engenharia Betim MG' },
  { page: B + '/#projetos', src: B + '/novo-projeto-1-e.jpg', title: 'Celula Robotica EPCOS - Projeto Final Industrial E',       caption: 'Projeto finalizado de celula robotica industrial - EPCOS Engenharia' },
  { page: B + '/#projetos', src: B + '/novo-projeto-2-a.jpg', title: 'Dispositivo de Montagem EPCOS - Engenharia Mecanica A',    caption: 'Projeto de dispositivo de montagem e inspecao industrial - EPCOS Engenharia Betim MG' },
  { page: B + '/#projetos', src: B + '/novo-projeto-2-b.jpg', title: 'Dispositivo de Montagem EPCOS - Gabarito Industrial B',   caption: 'Gabarito industrial de precisao - EPCOS Engenharia Betim Minas Gerais' },
  { page: B + '/#projetos', src: B + '/novo-projeto-2-c.jpg', title: 'Dispositivo de Montagem EPCOS - Detalhamento CAD C',      caption: 'Detalhamento CAD de dispositivo de montagem industrial - EPCOS Engenharia' },
  { page: B + '/#projetos', src: B + '/novo-projeto-2-d.jpg', title: 'Dispositivo de Montagem EPCOS - Estrutura 3D D',          caption: 'Estrutura 3D de dispositivo de montagem - EPCOS Engenharia Betim MG' },
  { page: B + '/#projetos', src: B + '/novo-projeto-2-e.jpg', title: 'Dispositivo de Montagem EPCOS - Projeto Final E',         caption: 'Projeto finalizado de dispositivo de montagem industrial - EPCOS Engenharia' },
  { page: B + '/#projetos', src: B + '/novo-projeto-3-a.jpg', title: 'Automacao Industrial EPCOS - Sistema de Manufatura A',    caption: 'Sistema de automacao e manufatura industrial desenvolvido pela EPCOS Engenharia Betim MG' },
  { page: B + '/#projetos', src: B + '/novo-projeto-3-b.jpg', title: 'Automacao Industrial EPCOS - Layout 3D Fabril B',         caption: 'Layout 3D fabril de sistema de automacao industrial - EPCOS Engenharia' },
  { page: B + '/#projetos', src: B + '/novo-projeto-3-c.jpg', title: 'Automacao Industrial EPCOS - Maquina Customizada C',      caption: 'Maquina customizada para automacao industrial - EPCOS Engenharia Betim MG' },
  { page: B + '/#projetos', src: B + '/novo-projeto-3-d.jpg', title: 'Automacao Industrial EPCOS - Cinemática e Estrutura D',   caption: 'Analise de cinematica e estrutura de maquina de automacao - EPCOS Engenharia' },
  { page: B + '/#projetos', src: B + '/novo-projeto-3-e.jpg', title: 'Automacao Industrial EPCOS - Projeto Finalizado E',       caption: 'Projeto finalizado de maquina de automacao industrial - EPCOS Engenharia Betim MG' },
  { page: B + '/#projetos', src: B + '/novo-projeto-4-a.jpg', title: 'Projeto Estrutural EPCOS - Analise FEA Industrial A',     caption: 'Projeto estrutural com analise FEA de equipamento industrial - EPCOS Engenharia Betim MG' },
  { page: B + '/#projetos', src: B + '/novo-projeto-4-b.jpg', title: 'Projeto Estrutural EPCOS - Simulacao CAD B',              caption: 'Simulacao CAD de projeto estrutural industrial - EPCOS Engenharia' },
  { page: B + '/#projetos', src: B + '/novo-projeto-4-c.jpg', title: 'Projeto Estrutural EPCOS - Detalhamento Final C',         caption: 'Detalhamento final de projeto estrutural industrial - EPCOS Engenharia Betim MG' },

  // ── Engenharia Reversa ────────────────────────────────────────────────────
  { page: B + '/#scanner', src: B + '/reverse_engineering.png', title: 'Engenharia Reversa EPCOS Betim MG - Digitalizacao 3D e Recriacao de Pecas', caption: 'Engenharia reversa industrial: digitalizacao 3D e recriacao de pecas sem documentacao original - EPCOS Engenharia Betim MG atendemos todo o Brasil' },
];

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getAllPublishedPosts();

  const staticEntries = ALL_STATIC_IMAGES.map(img =>
    '\n  <url>\n    <loc>' + escapeXml(img.page) + '</loc>\n    <image:image>\n      <image:loc>' + escapeXml(img.src) + '</image:loc>\n      <image:title>' + escapeXml(img.title) + '</image:title>\n      <image:caption>' + escapeXml(img.caption) + '</image:caption>\n    </image:image>\n  </url>'
  ).join('');

  const postEntries = posts
    .filter((post: { cover_url: string | null }) => post.cover_url)
    .map((post: { slug: string; cover_url: string | null; title: string; excerpt: string | null }) =>
      '\n  <url>\n    <loc>' + escapeXml(B + '/news/' + post.slug) + '</loc>\n    <image:image>\n      <image:loc>' + escapeXml(post.cover_url!) + '</image:loc>\n      <image:title>' + escapeXml(post.title + ' - EPCOS Engenharia Betim MG') + '</image:title>\n      <image:caption>' + escapeXml(post.excerpt || 'Artigo tecnico sobre engenharia mecanica industrial - EPCOS Engenharia Betim MG atendemos todo o Brasil') + '</image:caption>\n    </image:image>\n  </url>'
    ).join('');

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' + staticEntries + '\n' + postEntries + '\n</urlset>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}