const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'src', 'imports', 'brushes');

function random(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function between(rand, min, max) {
  return min + rand() * (max - min);
}

function makeTexture(seed) {
  const rand = random(seed);
  const width = 960;
  const height = 320;
  const mid = between(rand, 130, 180);
  const lift = between(rand, -82, 82);
  const end = between(rand, -74, 74);

  const body = [
    `M 20 ${mid + between(rand, -20, 20)}`,
    `C ${between(rand, 190, 280)} ${mid + lift}`,
    `${between(rand, 500, 620)} ${mid - lift}`,
    `940 ${mid + end}`,
    `L 940 ${mid + end + between(rand, 34, 72)}`,
    `C ${between(rand, 610, 720)} ${mid - lift + between(rand, 48, 90)}`,
    `${between(rand, 240, 360)} ${mid + lift + between(rand, 42, 96)}`,
    `20 ${mid + between(rand, 38, 76)}`,
    'Z',
  ].join(' ');

  const bristles = Array.from({ length: 72 }, (_, index) => {
    const x = between(rand, 30, 900);
    const y = mid + between(rand, -84, 84);
    const len = between(rand, 80, 290);
    const bend = between(rand, -44, 44);
    const opacity = between(rand, 0.26, 0.86).toFixed(2);
    const strokeWidth = between(rand, 1, 4.5).toFixed(2);
    return `<path d="M ${x.toFixed(1)} ${y.toFixed(1)} Q ${(x + len * 0.42).toFixed(1)} ${(y + bend).toFixed(1)} ${(x + len).toFixed(1)} ${(y + between(rand, -20, 20)).toFixed(1)}" stroke="black" stroke-width="${strokeWidth}" stroke-linecap="round" opacity="${opacity}" />`;
  }).join('\n');

  const dryGaps = Array.from({ length: 58 }, (_, index) => {
    const x = between(rand, 60, 870);
    const y = mid + between(rand, -72, 82);
    const len = between(rand, 50, 210);
    const opacity = between(rand, 0.28, 0.72).toFixed(2);
    const strokeWidth = between(rand, 2, 9).toFixed(2);
    return `<path d="M ${x.toFixed(1)} ${y.toFixed(1)} Q ${(x + len * 0.55).toFixed(1)} ${(y + between(rand, -26, 26)).toFixed(1)} ${(x + len).toFixed(1)} ${(y + between(rand, -18, 18)).toFixed(1)}" stroke="white" stroke-width="${strokeWidth}" stroke-linecap="round" opacity="${opacity}" />`;
  }).join('\n');

  const splatters = Array.from({ length: 82 }, () => {
    const x = between(rand, 0, width);
    const y = mid + between(rand, -130, 130);
    const r = rand() < 0.12 ? between(rand, 3, 9) : between(rand, 0.7, 2.4);
    const opacity = between(rand, 0.32, 0.88).toFixed(2);
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="black" opacity="${opacity}" />`;
  }).join('\n');

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="roughen">
          <feTurbulence type="fractalNoise" baseFrequency="0.022 0.18" numOctaves="3" seed="${seed}" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.92" numOctaves="2" seed="${seed + 11}" result="grain"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.2"/>
          </feComponentTransfer>
          <feBlend in="SourceGraphic" mode="multiply"/>
        </filter>
      </defs>
      <g filter="url(#roughen)">
        <path d="${body}" fill="black" opacity="0.92"/>
        ${bristles}
        ${dryGaps}
      </g>
      <g>${splatters}</g>
    </svg>
  `;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  await Promise.all(
    Array.from({ length: 8 }, async (_, index) => {
      const svg = makeTexture(index + 3);
      await sharp(Buffer.from(svg)).png().toFile(path.join(outDir, `brush-${index + 1}.png`));
    })
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
