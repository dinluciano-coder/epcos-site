import { getAllPublishedPosts } from '@/lib/db';

const BASE_URL = 'https://epcos.eng.br';

const staticImages = [
  { pageUrl: BASE_URL, src: BASE_URL + '/projeto-mecanico-1.jpg', title: 'Projeto Mecanico Industrial EPCOS Engenharia - Betim MG', caption: 'Projeto mecanico industrial com modelagem 3D CAD - EPCOS Engenharia Betim MG' },
  { pageUrl: BASE_URL, src: BASE_URL + '/projeto-mecanico-2.jpg', title: 'Maquina Especial EPCOS - Detalhamento Tecnico 2D e 3D', caption: 'Detalhamento tecnico de maquina especial industrial - EPCOS Engenharia' },
  { pageUrl: BASE_URL, src: BASE_URL + '/projeto-mecanico-3.jpg', title: 'Engenharia Reversa EPCOS - Modelagem CAD Betim MG', caption: 'Engenharia reversa e modelagem CAD - EPCOS Engenharia Betim Minas Gerais' },
  { pageUrl: BASE_URL, src: BASE_URL + '/novo-projeto-1-a.jpg', title: 'Projeto Industrial EPCOS - Automacao e Detalhamento Mecanico', caption: 'Automacao e detalhamento mecanico industrial - EPCOS Engenharia BH' },
  { pageUrl: BASE_URL, src: BASE_URL + '/novo-projeto-2-a.jpg', title: 'Maquinas Especiais e Gabaritos EPCOS - Betim MG', caption: 'Projeto de maquinas especiais e gabaritos industriais - EPCOS Engenharia' },
  { pageUrl: BASE_URL, src: BASE_URL + '/novo-projeto-3-a.jpg', title: 'Detalhamento 3D e Simulacao FEA - EPCOS Engenharia', caption: 'Detalhamento tecnico 3D e simulacao estrutural FEA - EPCOS Engenharia' },
  { pageUrl: BASE_URL, src: BASE_URL + '/novo-projeto-4-a.jpg', title: 'Automacao Industrial e NR12 EPCOS - Betim MG', caption: 'Automacao industrial e adequacao NR12 - EPCOS Engenharia Betim Minas Gerais' },
  { pageUrl: BASE_URL, src: BASE_URL + '/scanner-raptor-x.png', title: 'Scanner 3D Creality Raptor X - EPCOS Metrologia Betim', caption: 'Scanner 3D Raptor X escaneamento industrial alta precisao 0,02mm - EPCOS' },
  { pageUrl: BASE_URL, src: BASE_URL + '/scanner-accordion-1.jpg', title: 'Escaneamento 3D Industrial EPCOS - Nuvem de Pontos', caption: 'Escaneamento 3D industrial e nuvem de pontos - EPCOS Engenharia' },
  { pageUrl: BASE_URL, src: BASE_URL + '/scanner-accordion-2.jpg', title: 'Metrologia 3D EPCOS - Inspecao Dimensional Industrial', caption: 'Metrologia 3D e inspecao dimensional de pecas industriais - EPCOS Engenharia' },
  { pageUrl: BASE_URL, src: BASE_URL + '/scanner-accordion-3.jpg', title: 'Engenharia Reversa 3D EPCOS - Digitalizacao de Pecas', caption: 'Engenharia reversa com digitalizacao 3D de pecas para modelagem CAD - EPCOS' },
  { pageUrl: BASE_URL, src: BASE_URL + '/scanner-accordion-4.jpg', title: 'Controle Dimensional EPCOS 3D - Laudos Metrologicos', caption: 'Controle dimensional e laudos metrologicos - EPCOS 3D Engenharia' },
  { pageUrl: BASE_URL, src: BASE_URL + '/scanner-accordion-5.jpg', title: 'Digitalizacao 3D de Geometrias Complexas - EPCOS Betim', caption: 'Digitalizacao 3D de geometrias complexas em Betim MG - EPCOS Engenharia' },
  { pageUrl: BASE_URL, src: BASE_URL + '/reverse_engineering.png', title: 'Engenharia Reversa Industrial EPCOS - Betim MG', caption: 'Engenharia reversa industrial digitalizacao 3D e recriacao de pecas - EPCOS' },
  { pageUrl: BASE_URL, src: BASE_URL + '/infra-official-eng.jpg', title: 'Equipe EPCOS Engenharia Betim MG - Projetos Mecanicos', caption: 'Equipe de engenharia EPCOS especialistas projetos mecanicos automacao Betim MG' },
  { pageUrl: BASE_URL, src: BASE_URL + '/infra-official-meeting.jpg', title: 'Reuniao Tecnica EPCOS Engenharia - Projetos Mecanicos', caption: 'Reuniao tecnica de projetos mecanicos e automacao industrial - EPCOS Engenharia' },
  { pageUrl: BASE_URL, src: BASE_URL + '/infra-official-metrology.jpg', title: 'Laboratorio de Metrologia EPCOS - Inspecao 3D Betim', caption: 'Laboratorio de metrologia e inspecao dimensional 3D - EPCOS Engenharia Betim MG' },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getAllPublishedPosts();

  const staticEntries = staticImages.map(img =>
    '\n  <url>\n    <loc>' + escapeXml(img.pageUrl) + '</loc>\n    <image:image>\n      <image:loc>' + escapeXml(img.src) + '</image:loc>\n      <image:title>' + escapeXml(img.title) + '</image:title>\n      <image:caption>' + escapeXml(img.caption) + '</image:caption>\n    </image:image>\n  </url>'
  ).join('');

  const postEntries = posts
    .filter((post: { cover_url: string | null }) => post.cover_url)
    .map((post: { slug: string; cover_url: string | null; title: string; excerpt: string | null }) =>
      '\n  <url>\n    <loc>' + escapeXml(BASE_URL + '/news/' + post.slug) + '</loc>\n    <image:image>\n      <image:loc>' + escapeXml(post.cover_url!) + '</image:loc>\n      <image:title>' + escapeXml(post.title + ' - EPCOS Engenharia') + '</image:title>\n      <image:caption>' + escapeXml(post.excerpt || 'Artigo tecnico sobre engenharia mecanica industrial - EPCOS Engenharia Betim MG') + '</image:caption>\n    </image:image>\n  </url>'
    ).join('');

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' + staticEntries + '\n' + postEntries + '\n</urlset>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}