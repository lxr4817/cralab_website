const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const input = path.join(root, 'src', 'imports', '가로로고_1.png');
const output = path.join(root, 'src', 'imports', '가로로고_black.png');

async function main() {
  const image = sharp(input).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  for (let index = 0; index < data.length; index += info.channels) {
    const alpha = data[index + 3];

    if (alpha > 0) {
      data[index] = 0;
      data[index + 1] = 0;
      data[index + 2] = 0;
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png()
    .toFile(output);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
