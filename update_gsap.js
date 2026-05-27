const fs = require('fs');
const path = require('path');

const files = [
  'AboutSection.tsx',
  'CareersSection.tsx',
  'ContactSection.tsx',
  'FooterSection.tsx',
  'GlassCardsSection.tsx',
  'MachineShowcaseSection.tsx',
  'ProjectsSection.tsx',
  'ScannerSection.tsx',
  'ServicesSection.tsx'
];

files.forEach(file => {
  const p = path.join('c:/SITE/epcos-site/src/components', file);
  if (!fs.existsSync(p)) return;
  
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/scrollTrigger:\s*{([^}]+)}/g, (match, inner) => {
    if (!inner.includes('toggleActions') && !inner.includes('scrub')) {
      return match.replace(/start:\s*"[^"]+",?/, "$&\n          toggleActions: \"play reverse play reverse\",");
    }
    return match;
  });
  fs.writeFileSync(p, content);
});
console.log('Done!');
