const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.inkfetish.in';

// Static routes from src/main.tsx
const staticRoutes = [
  '',
  '/authors',
  '/catalog',
  '/services',
  '/contact',
  '/contests',
  '/awards',
  '/launchpad',
  '/published/author',
  '/learning/poet-framework',
  '/writers-vault',
  '/journey',
  '/love-at-minus-one',
  '/love-at-minus-one/register',
  '/love-at-minus-one/submission',
  '/anthology/join',
  '/anthology/petals-and-scars',
  '/anthology/hearts-under-construction',
  '/anthology/hearts-under-construction/register',
  '/anthology/thank-you',
  '/anthology-manuscript-view',
  '/love-at-minus-one/manuscript',
  '/indian-writers-league',
  '/iwl-top-200',
  '/lucky-draw',
  '/learning/15-day-guide',
  '/portfoliosite/onboard',
  '/authorsite/login',
  '/authorsite/signup'
];

// Authors from src/pages/AuthorsDirectory.tsx
const authors = [
  'anwesha',
  'richa',
  'daniya',
  'tadashi',
  'shreyo',
  'bhavin',
  'priya',
  'shambhavi',
  'anonymous'
];

// Books from src/pages/Catalog.tsx
const books = [
  '/books/silfira',
  '/books/shakespeare-and-what-remained'
];

const generateSitemap = () => {
  const allRoutes = [
    ...staticRoutes,
    ...authors.map(slug => `/publishedauthor/${slug}`),
    ...books
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap generated successfully at ${outputPath}`);
};

generateSitemap();
