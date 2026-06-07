#!/usr/bin/env node
// finggu-life — Icon generator
// Run: node generate-icons.js
// Requires: npm install canvas (optional) OR uses SVG fallback

const fs   = require('fs');
const path = require('path');

const FINGGU_ICONS_DIR = path.join(__dirname, 'icons');
if (!fs.existsSync(FINGGU_ICONS_DIR)) fs.mkdirSync(FINGGU_ICONS_DIR);

// Generate SVG icon for all sizes
const fingguFn_generateSVGIcon = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f78166"/>
      <stop offset="100%" style="stop-color:#ffa657"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size*0.2}" fill="#0d1117"/>
  <rect width="${size}" height="${size}" rx="${size*0.2}" fill="url(#fg)" opacity="0.15"/>
  <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle"
    font-size="${size*0.55}" font-family="Arial,sans-serif">₹</text>
  <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle"
    font-size="${size*0.55}" font-family="Arial,sans-serif" fill="#f78166">₹</text>
</svg>`;

const FINGGU_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

FINGGU_SIZES.forEach(size => {
  const FINGGU_svg  = fingguFn_generateSVGIcon(size);
  const FINGGU_path = path.join(FINGGU_ICONS_DIR, `icon-${size}.svg`);
  fs.writeFileSync(FINGGU_path, FINGGU_svg);
  console.log(`✓ Generated icon-${size}.svg`);
});

console.log('\nNote: For PNG icons (required for PWA), convert SVGs using:');
console.log('  npm install -g svgexport');
console.log('  svgexport icons/icon-192.svg icons/icon-192.png 192:192');
