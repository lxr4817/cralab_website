const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const serverDir = path.join(distDir, 'server');
const openaiDir = path.join(distDir, '.openai');
const sourceHostingPath = path.join(root, '.openai', 'hosting.json');
const outputHostingPath = path.join(openaiDir, 'hosting.json');
const outputServerPath = path.join(serverDir, 'index.js');

fs.mkdirSync(serverDir, { recursive: true });
fs.mkdirSync(openaiDir, { recursive: true });

fs.copyFileSync(sourceHostingPath, outputHostingPath);

fs.writeFileSync(
  outputServerPath,
  `export default {
  async fetch(request, env) {
    const assetResponse = await env.ASSETS.fetch(request);

    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    const url = new URL(request.url);
    url.pathname = '/index.html';
    url.search = '';

    return env.ASSETS.fetch(new Request(url, request));
  },
};
`,
  'utf8'
);
