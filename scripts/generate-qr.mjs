import QRCode from 'qrcode';
import { mkdir } from 'fs/promises';

const outDir = './public';
await mkdir(outDir, { recursive: true });

const items = [
  { file: `${outDir}/fredmusic-qr-prod.png`, url: 'https://www.fredmusic.fr/demande-musique' },
  { file: `${outDir}/fredmusic-qr-local.png`, url: 'http://localhost:5173/demande-musique' },
];

for (const it of items) {
  await QRCode.toFile(it.file, it.url, { width: 1200, margin: 1, color: { dark: '#000000', light: '#FFFFFF' } });
  console.log('Wrote', it.file);
}

console.log('Done');
