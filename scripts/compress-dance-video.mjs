/**
 * Compress public dance clip for GitHub (<100MB). Run: node scripts/compress-dance-video.mjs
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const input = path.join(root, 'pictures', 'WeChat_20260511234357.mp4');
const output = path.join(root, 'public', 'media', 'WeChat_20260511234357.mp4');
const maxBytes = 99 * 1024 * 1024;

if (!ffmpegPath) {
  console.error('ffmpeg-static binary not found');
  process.exit(1);
}
if (!fs.existsSync(input)) {
  console.error('Missing input:', input);
  process.exit(1);
}

/** comma escaped for ffmpeg filter */
const vfScale = 'scale=min(1280\\,iw):-2';

for (const crf of [26, 28, 30, 32, 34, 36, 38]) {
  const tmp = `${output}.tmp.${crf}.mp4`;
  const args = [
    '-y',
    '-i',
    input,
    '-c:v',
    'libx264',
    '-crf',
    String(crf),
    '-preset',
    'medium',
    '-vf',
    vfScale,
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    '-movflags',
    '+faststart',
    tmp,
  ];
  console.log('Running ffmpeg crf=%s ...', crf);
  const r = spawnSync(ffmpegPath, args, { stdio: 'inherit' });
  if (r.status !== 0) {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    process.exit(r.status ?? 1);
  }
  const size = fs.statSync(tmp).size;
  const mb = (size / (1024 * 1024)).toFixed(2);
  console.log('  -> %s MB', mb);
  if (size <= maxBytes) {
    fs.renameSync(tmp, output);
    console.log('OK: wrote', output);
    process.exit(0);
  }
  fs.unlinkSync(tmp);
}

console.error('Could not get under 99MB with tested CRF values; try lowering resolution manually.');
process.exit(1);
