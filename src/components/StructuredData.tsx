// Structured Data / JSON-LD para SEO máximo
// Gera rich snippets no Google: endereço, telefone, serviços, breadcrumbs
export default function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@graph": [
      // ── 1. LocalBusiness + Organization ─────────────────────────────────
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://epcos.eng.br/#organization",
        "name": "EPCOS Engenharia",
        "alternateName": [
          "EPCOS",
          "EPCOS Projetos",
          "EPCOS 3D",
          "EPCOS Automação",
          "EPCOS NR12",
          "EPCOS Metrologia"
        ],
        "url": "https://epcos.eng.br",
        "logo": {
          "@type": "ImageObject",
          "url": "https://epcos.eng.br/logo-epcos.png",
          "width": 240,
          "height": 88
        },
        "image": "https://epcos.eng.br/logo-epcos.png",
        "description": "Especialistas em projetos mecânicos industriais, escaneamento 3D, engenharia reversa, detalhamento 2D/3D, automação industrial e metrologia dimensional em Betim, Minas Gerais. Atendemos toda a região metropolitana de Belo Horizonte com soluções de Indústria 4.0.",
        "telephone": "+55-31-99282-5058",
        "email": "jackson@epcos.eng.br",
        "foundingDate": "2015",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": "10"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rua Eli Geraldo Braga, 93B",
          "addressLocality": "Betim",
          "addressRegion": "MG",
          "postalCode": "32669-212",
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -19.9663,
          "longitude": -44.1986
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Betim"
          },
          {
            "@type": "City",
            "name": "Belo Horizonte"
          },
          {
            "@type": "State",
            "name": "Minas Gerais"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Região Metropolitana de Belo Horizonte"
          }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+55-31-99282-5058",
          "contactType": "customer service",
          "availableLanguage": "Portuguese",
          "areaServed": "BR"
        },
        "sameAs": [
          "https://www.linkedin.com/company/epcos-engenharia-ltda",
          "https://www.instagram.com/epcos.engenharia/"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Serviços de Engenharia Mecânica Industrial",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Projetos Mecânicos Industriais",
                "description": "Desenvolvimento completo de projetos mecânicos industriais com modelagem 3D CAD, detalhamento 2D, simulação e análise de elementos finitos (FEA). Projetos de máquinas especiais, gabaritos, dispositivos e ferramentais."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Escaneamento 3D e Metrologia",
                "description": "Digitalização tridimensional com scanner 3D de alta precisão (até 0,02mm). Geração de nuvem de pontos, malha 3D e modelos CAD para engenharia reversa e controle dimensional. Laudos metrológicos e inspeção dimensional de peças."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Engenharia Reversa",
                "description": "Recreação de geometrias de peças sem documentação técnica através de escaneamento 3D e modelagem CAD. Ideal para peças descontinuadas, importadas ou sem desenho técnico original."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Detalhamento Técnico 2D e 3D",
                "description": "Elaboração de desenhos técnicos conforme normas ABNT/ISO/ASME, GD&T, tolerâncias dimensionais e geométricas. Documentação técnica completa para fabricação, usinagem e montagem."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Automação Industrial e NR12",
                "description": "Projetos de automação industrial, retrofitting de máquinas, integração de sistemas e adequação às normas de segurança NR12. Máquinas especiais e sistemas automáticos para linhas de produção."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Simulação e Análise Estrutural",
                "description": "Simulação computacional de esforços mecânicos, análise de elementos finitos (FEA/FEM), análise térmica e dinâmica de fluidos (CFD) para validação de projetos antes da fabricação."
              }
            }
          ]
        }
      },
      // ── 2. WebSite (habilita SearchAction / Search Box) ──────────────────
      {
        "@type": "WebSite",
        "@id": "https://epcos.eng.br/#website",
        "url": "https://epcos.eng.br",
        "name": "EPCOS Engenharia",
        "description": "Projetos mecânicos industriais, escaneamento 3D, engenharia reversa e automação industrial em Betim, MG.",
        "inLanguage": "pt-BR",
        "publisher": {
          "@id": "https://epcos.eng.br/#organization"
        }
      },
      // ── 3. BreadcrumbList ────────────────────────────────────────────────
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Início",
            "item": "https://epcos.eng.br"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Serviços",
            "item": "https://epcos.eng.br#servicos"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Projetos",
            "item": "https://epcos.eng.br#projetos"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Infraestrutura",
            "item": "https://epcos.eng.br#infraestrutura"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Contato",
            "item": "https://epcos.eng.br#contato"
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
