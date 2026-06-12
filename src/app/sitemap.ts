import { MetadataRoute } from 'next'

const BASE_URL = 'https://epcos.eng.br'

// Imagens dos projetos mecânicos para indexação no Google Imagens
const projectImages = [
  { url: '/projeto-mecanico-1.jpg', alt: 'Projeto mecânico industrial EPCOS Engenharia - modelagem 3D CAD em Betim MG', caption: 'Projeto Mecânico Industrial - EPCOS Engenharia' },
  { url: '/projeto-mecanico-2.jpg', alt: 'Projeto de máquina especial EPCOS - detalhamento técnico 2D e 3D industrial', caption: 'Máquina Especial - Detalhamento Técnico EPCOS' },
  { url: '/projeto-mecanico-3.jpg', alt: 'Projeto mecânico EPCOS - engenharia reversa e modelagem CAD Betim Minas Gerais', caption: 'Engenharia Reversa e Projeto 3D - EPCOS' },
  { url: '/novo-projeto-1-a.jpg', alt: 'Projeto industrial EPCOS Engenharia - automação e detalhamento mecânico BH', caption: 'Projeto Industrial EPCOS - Automação Mecânica' },
  { url: '/novo-projeto-2-a.jpg', alt: 'Projeto mecânico industrial EPCOS - máquinas especiais e gabaritos Betim MG', caption: 'Máquinas Especiais e Gabaritos - EPCOS Engenharia' },
  { url: '/novo-projeto-3-a.jpg', alt: 'Detalhamento técnico EPCOS - projeto 3D CAD e simulação estrutural FEA industrial', caption: 'Detalhamento 3D e Simulação FEA - EPCOS' },
  { url: '/novo-projeto-4-a.jpg', alt: 'Projeto mecânico EPCOS - automação industrial e adequação NR12 Betim Minas Gerais', caption: 'Automação Industrial e NR12 - EPCOS Engenharia' },
  { url: '/scanner-raptor-x.png', alt: 'Scanner 3D EPCOS - Raptor X para escaneamento industrial de alta precisão 0,02mm', caption: 'Scanner 3D Raptor X - EPCOS Metrologia' },
  { url: '/scanner-accordion-1.jpg', alt: 'Escaneamento 3D industrial EPCOS - nuvem de pontos e metrologia dimensional', caption: 'Escaneamento 3D Industrial - EPCOS Engenharia' },
  { url: '/scanner-accordion-2.jpg', alt: 'Metrologia 3D EPCOS - inspeção dimensional e laudo técnico de peças industriais', caption: 'Metrologia e Inspeção Dimensional - EPCOS' },
  { url: '/scanner-accordion-3.jpg', alt: 'Engenharia reversa EPCOS - digitalização 3D de peças para modelagem CAD', caption: 'Engenharia Reversa 3D - EPCOS Engenharia' },
  { url: '/scanner-accordion-4.jpg', alt: 'EPCOS 3D - escaneamento de precisão para controle dimensional e laudos metrológicos', caption: 'Controle Dimensional - EPCOS 3D' },
  { url: '/scanner-accordion-5.jpg', alt: 'Scanner 3D industrial EPCOS - digitalização de geometrias complexas em Betim MG', caption: 'Digitalização de Geometrias Complexas - EPCOS' },
  { url: '/reverse_engineering.png', alt: 'Engenharia reversa EPCOS Betim MG - digitalização 3D e recriação de peças sem documentação', caption: 'Engenharia Reversa Industrial - EPCOS Engenharia' },
  { url: '/infra-official-eng.jpg', alt: 'Equipe de engenharia EPCOS Betim MG - especialistas em projetos mecânicos e automação', caption: 'Equipe EPCOS Engenharia - Betim MG' },
  { url: '/infra-official-meeting.jpg', alt: 'EPCOS Engenharia - reunião técnica de projetos mecânicos e automação industrial', caption: 'EPCOS Engenharia - Projetos e Reuniões Técnicas' },
  { url: '/infra-official-metrology.jpg', alt: 'Metrologia EPCOS Engenharia - laboratório de inspeção dimensional e escaneamento 3D', caption: 'Laboratório de Metrologia - EPCOS Engenharia' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      images: projectImages.map(img => `${BASE_URL}${img.url}`),
    },
    {
      url: `${BASE_URL}/downloads`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacidade`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
