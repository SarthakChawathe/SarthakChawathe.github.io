import { cp } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const root = process.cwd();
const pageFiles = [
  'index.html', 'about.html', 'experience.html', 'projects.html',
  'off-the-clock.html', 'gaming.html', 'anime.html', 'contact.html', '404.html',
  'projects/auto_ml.html', 'projects/covid.html', 'projects/drowsiness.html',
  'projects/portfolio.html', 'projects/rag.html', 'projects/spaceX.html',
  'projects/splitright.html', 'projects/uber_data_analyis.html',
  'projects/uber_data_viz.html', 'projects/unimatch.html'
];

// Runs before first paint so the page opens in the visitor's time-of-day theme without a flash.
const themeBootstrap = `<meta name="theme-color" content="#f6f6f4">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<script>try{var p=localStorage.getItem('portfolio-theme-pref')||'auto',t=new URLSearchParams(location.search).get('time'),h=new Date().getHours(),d=p==='auto'?(t?t==='evening'||t==='night':h<5||h>=17):p==='dark';document.documentElement.dataset.theme=d?'dark':'light';document.documentElement.style.colorScheme=d?'dark':'light';document.querySelector('meta[name="theme-color"]').content=d?'#121212':'#f6f6f4'}catch(e){}</script>`;

const reactPagePlugin = {
  name: 'portfolio-react-pages',
  transformIndexHtml: {
    order: 'pre',
    handler(html) {
      const appHtml = html
        .replace(/<link\b[^>]*(?:assets\/(?:css|vendor)\/|fonts\.(?:googleapis|gstatic)\.com)[^>]*>/gi, '')
        .replace(/<meta\b[^>]*name="theme-color"[^>]*>/gi, '')
        .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
        .replace('</head>', `${themeBootstrap}</head>`)
        .replace(/<body\b[^>]*>[\s\S]*?<\/body\s*>/i, '<body><div id="root"></div></body>');

      return appHtml.replace('</body>', '<script type="module" src="/src/main.jsx"></script></body>');
    }
  }
};

const staticAssetsPlugin = {
  name: 'copy-static-assets',
  apply: 'build',
  async closeBundle() {
    await cp(resolve(root, 'assets'), resolve(root, 'dist/assets'), { recursive: true });
  }
};

export default defineConfig({
  base: '/',
  publicDir: false,
  plugins: [reactPagePlugin, staticAssetsPlugin],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pageFiles.map((file) => [file.replaceAll('/', '_').replace('.html', ''), resolve(root, file)]))
    }
  }
});