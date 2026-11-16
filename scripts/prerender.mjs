/**
 * Пререндер всех маршрутов в статические HTML-файлы.
 *
 * Зачем: Яндекс и социальные краулеры плохо исполняют JS. После сборки Vite
 * поднимаем dist локально, рендерим каждую страницу в headless Chrome и
 * сохраняем готовый HTML с title/description/canonical/OG/JSON-LD.
 *
 * GitHub Pages отдаёт dist/care/index.html по адресу /sodeystvie/care/,
 * поэтому прямые ссылки работают без hash-роутера.
 *
 * Запуск: node scripts/prerender.mjs (входит в npm run build)
 * Пропустить: SKIP_PRERENDER=1 npm run build
 */

import fs from 'node:fs/promises';
import { existsSync, createReadStream } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const DIST = 'dist';
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  process.env.PUPPETEER_EXECUTABLE_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/opt/google/chrome/chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

const readEnvBase = async () => {
  try {
    const env = await fs.readFile('.env.production', 'utf8');
    const match = env.match(/^VITE_BASE=(.*)$/m);
    return (match?.[1] || '/').trim();
  } catch {
    return '/';
  }
};

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

const startServer = (base) => {
  const baseRoot = base.replace(/\/+$/, '');
  const server = http.createServer(async (request, response) => {
    const url = decodeURIComponent((request.url || '/').split('?')[0]);
    let relative = url;

    if (baseRoot && relative.startsWith(baseRoot)) {
      relative = relative.slice(baseRoot.length);
    }
    relative = relative.replace(/^\/+/, '');

    let filePath = path.join(DIST, relative);
    if (!relative || relative.endsWith('/')) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!existsSync(filePath) || !(await fs.stat(filePath)).isFile()) {
      filePath = path.join(DIST, 'index.html');
    }

    response.setHeader('Content-Type', MIME[path.extname(filePath)] || 'application/octet-stream');
    createReadStream(filePath).pipe(response);
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
};

const findChrome = () => CHROME_CANDIDATES.find((candidate) => existsSync(candidate));

const pages = [
  { path: '', file: 'index.html', priority: '1.0' },
  { path: 'funerals/', file: 'funerals/index.html', priority: '0.9' },
  { path: 'care/', file: 'care/index.html', priority: '0.8' },
  { path: 'monuments/', file: 'monuments/index.html', priority: '0.8' },
  { path: 'reviews/', file: 'reviews/index.html', priority: '0.7' },
  { path: 'contacts/', file: 'contacts/index.html', priority: '0.8' },
  { path: '404.html', file: '404.html', priority: null },
];

const main = async () => {
  if (process.env.SKIP_PRERENDER === '1') {
    console.log('prerender: skipped (SKIP_PRERENDER=1)');
    return;
  }

  const base = await readEnvBase();
  const chrome = findChrome();
  if (!chrome) {
    throw new Error(
      'Не найден Chrome для пререндера. Укажите CHROME_PATH или запустите SKIP_PRERENDER=1 npm run build.',
    );
  }

  const siteConfig = JSON.parse(await fs.readFile('site.config.json', 'utf8'));
  const siteUrl = siteConfig.siteUrl.replace(/\/+$/, '');
  const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');

  const { server, port } = await startServer(base);
  const urlBase = `http://127.0.0.1:${port}${base}`;

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chrome,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const results = [];

  try {
    for (const item of pages) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await page.evaluateOnNewDocument(() => {
        try {
          sessionStorage.setItem('intro_seen', 'true');
        } catch {
          // ignore
        }
      });

      const target = `${urlBase}${item.path}`;
      await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForSelector('main h1', { timeout: 20000 });
      await page.evaluate(() => document.fonts.ready);
      await new Promise((resolve) => setTimeout(resolve, 350));

      const captured = await page.evaluate(() => ({
        head: document.head.innerHTML,
        root: document.getElementById('root')?.innerHTML ?? '',
      }));

      const html = template
        .replace(/<head>[\s\S]*?<\/head>/, `<head>${captured.head}</head>`)
        .replace(/<div id="root"><\/div>/, `<div id="root">${captured.root}</div>`);

      const outPath = path.join(DIST, item.file);
      await fs.mkdir(path.dirname(outPath), { recursive: true });
      await fs.writeFile(outPath, html, 'utf8');

      results.push({ ...item, bytes: Buffer.byteLength(html) });
      console.log(`prerender: ${item.file} (${Math.round(html.length / 1024)} KB)`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  const sitemapEntries = results
    .filter((item) => item.priority)
    .map(
      (item) =>
        `  <url><loc>${siteUrl}/${item.path}</loc><changefreq>monthly</changefreq><priority>${item.priority}</priority></url>`,
    )
    .join('\n');

  await fs.writeFile(
    path.join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`,
    'utf8',
  );

  await fs.writeFile(
    path.join(DIST, 'robots.txt'),
    `User-agent: *\nAllow: /\nDisallow: /404.html\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    'utf8',
  );

  // Старые адреса: отдаём 200-заглушку с redirect и canonical,
  // чтобы поисковики не видели 404 и склеивали сигналы с новым разделом.
  const aliases = {
    services: 'funerals/',
    calculator: 'monuments/',
    info: 'contacts/',
    articles: 'reviews/',
  };

  for (const [from, to] of Object.entries(aliases)) {
    const target = `${base}${to}`;
    const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${siteUrl}/${to}">
<meta http-equiv="refresh" content="0; url=${target}">
<title>Переход — Содействие</title>
</head>
<body><p>Перейти: <a href="${target}">${target}</a></p></body>
</html>`;
    const aliasPath = path.join(DIST, from, 'index.html');
    await fs.mkdir(path.dirname(aliasPath), { recursive: true });
    await fs.writeFile(aliasPath, html, 'utf8');
  }

  console.log(`prerender: sitemap + robots готовы (${results.length} HTML)`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
