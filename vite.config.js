import { copyFile, cp } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const root = process.cwd();

// GitHub Pages has no rewrite rules, so a deep link like /projects/rag falls through to 404.html.
// Shipping the app as 404.html too lets the client router render that page directly.
const staticSitePlugin = {
  name: 'static-site',
  apply: 'build',
  async closeBundle() {
    await cp(resolve(root, 'assets'), resolve(root, 'dist/assets'), { recursive: true });
    await copyFile(resolve(root, 'dist/index.html'), resolve(root, 'dist/404.html'));
  }
};

export default defineConfig({
  base: '/',
  publicDir: false,
  plugins: [staticSitePlugin]
});
