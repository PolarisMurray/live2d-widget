/**
 * Script to copy necessary assets to chrome-extension directory
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Directories
const distDir = path.join(projectRoot, 'dist');
const extensionDir = __dirname;
const extensionDistDir = path.join(extensionDir, 'dist');
const extensionAssetsDir = path.join(extensionDir, 'assets');

// Create directories if they don't exist
if (!fs.existsSync(extensionDistDir)) {
  fs.mkdirSync(extensionDistDir, { recursive: true });
}
if (!fs.existsSync(extensionAssetsDir)) {
  fs.mkdirSync(extensionAssetsDir, { recursive: true });
}

// Files to copy from dist
const filesToCopy = [
  'waifu.css',
  'waifu-tips.js',
  'waifu-tips.json',
  'live2d.min.js'
];

// Copy files
filesToCopy.forEach(file => {
  const src = path.join(distDir, file);
  const dest = path.join(extensionDistDir, file);
  
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied ${file}`);
  } else {
    console.warn(`⚠ File not found: ${file}`);
  }
});

// Copy chunk directory if it exists
const chunkDir = path.join(distDir, 'chunk');
const extensionChunkDir = path.join(extensionDistDir, 'chunk');
if (fs.existsSync(chunkDir)) {
  if (!fs.existsSync(extensionChunkDir)) {
    fs.mkdirSync(extensionChunkDir, { recursive: true });
  }
  
  const chunkFiles = fs.readdirSync(chunkDir);
  chunkFiles.forEach(file => {
    const src = path.join(chunkDir, file);
    const dest = path.join(extensionChunkDir, file);
    if (fs.statSync(src).isFile()) {
      fs.copyFileSync(src, dest);
      console.log(`✓ Copied chunk/${file}`);
    }
  });
}

// Create placeholder icons (SVG converted to PNG would be better, but this is a placeholder)
console.log('\n⚠ Please create icon files:');
console.log('  - assets/icon16.png (16x16)');
console.log('  - assets/icon48.png (48x48)');
console.log('  - assets/icon128.png (128x128)');
console.log('\nYou can use any image editor or online tool to create these icons.');

console.log('\n✓ Asset copying complete!');

