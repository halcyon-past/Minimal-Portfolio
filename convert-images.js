import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Standard image configuration
const EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const QUALITY = 80;

/**
 * Standardized utility to convert images to modern formats.
 * Example Usage:
 *   node convert-images.js --webp ./public/assets
 *   node convert-images.js --favicon ./public/logo.png
 */

async function convertToWebp(inputPath, removeOriginal = false) {
  const ext = path.extname(inputPath);
  const webpPath = inputPath.replace(new RegExp(ext + '$', 'i'), '.webp');

  try {
    if (fs.existsSync(webpPath)) {
      console.log(`⏭️  Skipping (already exists): ${path.basename(webpPath)}`);
      return;
    }

    await sharp(inputPath).webp({ quality: QUALITY }).toFile(webpPath);
    console.log(`✅ Converted: ${path.basename(inputPath)} -> ${path.basename(webpPath)}`);

    if (removeOriginal) {
      fs.unlinkSync(inputPath);
      console.log(`🗑️  Deleted original: ${path.basename(inputPath)}`);
    }
  } catch (err) {
    console.error(`❌ Error converting ${inputPath}:`, err.message);
  }
}

async function generateFavicon(inputPath) {
  const dir = path.dirname(inputPath);
  const icoPath = path.join(dir, 'favicon.ico');

  try {
    const buf = await pngToIco(inputPath);
    fs.writeFileSync(icoPath, buf);
    console.log(`✅ Generated: favicon.ico from ${path.basename(inputPath)}`);

    // Also make a webp version of the logo for apple-touch-icon
    await convertToWebp(inputPath, false);
  } catch (err) {
    console.error(`❌ Favicon generation failed:`, err.message);
  }
}

async function processDirectory(dirPath, removeOriginal) {
  if (!fs.existsSync(dirPath)) {
    console.warn(`⚠️  Directory not found: ${dirPath}`);
    return;
  }

  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);

    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath, removeOriginal);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (EXTENSIONS.includes(ext)) {
        await convertToWebp(fullPath, removeOriginal);
      }
    }
  }
}

async function run() {
  const args = process.argv.slice(2);
  const isFavicon = args.includes('--favicon');
  const isWebp = args.includes('--webp');
  const removeOriginal = args.includes('--remove-original');
  const targetPaths = args.filter(arg => !arg.startsWith('--')).map(p => path.resolve(process.cwd(), p));

  if (!isFavicon && !isWebp) {
    console.log(`
Usage:
  node convert-images.js [options] <path1> <path2> ...

Options:
  --webp              Convert all images in the specified directories/files to .webp
  --favicon           Generate a favicon.ico from a specified .png file
  --remove-original   Delete original files after successful conversion

Examples:
  node convert-images.js --webp ./src/assets ./public/assets
  node convert-images.js --webp --remove-original ./src/assets
  node convert-images.js --favicon ./public/logo.png
    `);
    process.exit(0);
  }

  if (targetPaths.length === 0) {
    console.error('❌ Please provide at least one target path.');
    process.exit(1);
  }

  for (const target of targetPaths) {
    if (!fs.existsSync(target)) {
      console.warn(`⚠️  Target not found: ${target}`);
      continue;
    }

    const stat = fs.statSync(target);

    if (isFavicon && stat.isFile() && target.endsWith('.png')) {
      await generateFavicon(target);
    } else if (isWebp) {
      if (stat.isDirectory()) {
        await processDirectory(target, removeOriginal);
      } else {
        await convertToWebp(target, removeOriginal);
      }
    }
  }
}

run();
