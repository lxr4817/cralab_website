const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const sourceDir = path.join(root, 'src', 'imports', 'members');
const outputDir = path.join(sourceDir, 'optimized');

const images = [
  ['mhk.jpg', 'mhk.jpg'],
  ['shl.png', 'shl.jpg'],
  ['yro.jpg', 'yro.jpg'],
  ['hjy.png', 'hjy.jpg'],
  ['msk.jpg', 'msk.jpg'],
  ['yrk.jpeg', 'yrk.jpg'],
  ['ywk.jpeg', 'ywk.jpg'],
  ['jys.jpg', 'jys.jpg'],
  ['syb.jpeg', 'syb.jpg'],
  ['yd.jpg', 'yd.jpg'],
  ['jy.png', 'jy.jpg'],
  ['cs.png', 'cs.jpg'],
];

async function main() {
  const fs = require('node:fs/promises');
  await fs.mkdir(outputDir, { recursive: true });

  await Promise.all(
    images.map(([input, output]) =>
      sharp(path.join(sourceDir, input))
        .rotate()
        .resize({
          width: 360,
          height: 432,
          fit: 'cover',
          position: sharp.strategy.attention,
          kernel: sharp.kernel.lanczos3,
        })
        .jpeg({
          quality: 90,
          chromaSubsampling: '4:4:4',
          mozjpeg: true,
        })
        .toFile(path.join(outputDir, output))
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
