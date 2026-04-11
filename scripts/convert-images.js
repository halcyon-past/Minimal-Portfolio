import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

/**
 * Standardized utility to process images using sharp.
 */

async function processImage(inputPath, config) {
  try {
    let instance = sharp(inputPath);
    let modified = false;

    // Handle Resizing
    if (config.resize) {
      const parts = config.resize.split('x');
      const width = parseInt(parts[0], 10) || null;
      const height = parts[1] ? parseInt(parts[1], 10) : undefined;

      if (width || height) {
        instance = instance.resize(width, height, { fit: 'inside', withoutEnlargement: true });
        modified = true;
      }
    }

    const ext = path.extname(inputPath).toLowerCase();
    
    // Determine Target Format & Quality
    let targetExt = config.format ? (config.format.startsWith('.') ? config.format : `.${config.format}`) : ext;
    const isFormatChanged = targetExt !== ext;
    const quality = config.quality || 80;
    const shouldCompress = config.quality !== undefined || isFormatChanged;

    let outPath = inputPath;
    
    if (isFormatChanged) {
      outPath = inputPath.replace(new RegExp(ext + '$', 'i'), targetExt);
      if (fs.existsSync(outPath) && outPath !== inputPath) {
        console.log(`\u23ed\ufe0f  Skipping (already exists): ${path.basename(outPath)}`);
        return;
      }
    } else if (modified || shouldCompress) {
      outPath = inputPath.includes('-processed') ? inputPath : inputPath.replace(/(\.[\w\d_-]+)$/i, '-processed$1');
    }

    if (shouldCompress || modified) {
      if (targetExt === '.webp') instance = instance.webp({ quality: quality });
      else if (targetExt === '.jpg' || targetExt === '.jpeg') instance = instance.jpeg({ quality: quality });
      else if (targetExt === '.png') {
        // PNG compression
        instance = instance.png({ quality: quality, compressionLevel: 9 });
      }
      modified = true;
    }

    if (modified) {
      await instance.toFile(outPath);
      let actionStr = isFormatChanged ? 'Converted' : (config.quality ? 'Compressed' : 'Resized');
      console.log(`\u2705 ${actionStr}: ${path.basename(inputPath)} -> ${path.basename(outPath)}`);

      if (config.removeOriginal && outPath !== inputPath) {
        fs.unlinkSync(inputPath);
        if (!isFormatChanged) {
          fs.renameSync(outPath, inputPath);
          console.log(`\ud83d\udd04 Replaced original with processed file: ${path.basename(inputPath)}`);
        } else {
          console.log(`\ud83d\uddd1\ufe0f  Deleted original: ${path.basename(inputPath)}`);
        }
      }
    } else {
      console.log(`\u23ed\ufe0f  No action needed for: ${path.basename(inputPath)}`);
    }

  } catch (err) {
    console.error(`\u274c Error processing ${inputPath}:`, err.message);
  }
}

async function generateFavicon(inputPath) {
  const dir = path.dirname(inputPath);
  const icoPath = path.join(dir, 'favicon.ico');

  try {
    const buf = await pngToIco(inputPath);
    fs.writeFileSync(icoPath, buf);
    console.log(`\u2705 Generated: favicon.ico from ${path.basename(inputPath)}`);

    // Also make a webp version of the logo
    await processImage(inputPath, { format: '.webp', removeOriginal: false });
  } catch (err) {
    console.error(`\u274c Favicon generation failed:`, err.message);
  }
}

async function processDirectory(dirPath, config) {
  if (!fs.existsSync(dirPath)) {
    console.warn(`\u26a0\ufe0f  Directory not found: ${dirPath}`);
    return;
  }

  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);

    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath, config);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (EXTENSIONS.includes(ext) && !fullPath.includes('-processed')) {
        await processImage(fullPath, config);
      }
    }
  }
}

async function run() {
  const args = process.argv.slice(2);
  const config = {
    format: null,
    resize: null,
    quality: undefined,
    removeOriginal: false,
    favicon: false
  };

  const targetPaths = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--webp') config.format = 'webp';
    else if (arg === '--png') config.format = 'png';
    else if (arg === '--jpg' || arg === '--jpeg') config.format = 'jpg';
    else if (arg === '--favicon') config.favicon = true;
    else if (arg === '--remove-original') config.removeOriginal = true;
    else if (arg === '--resize') {
      config.resize = args[++i];
    } else if (arg === '--quality') {
        const parsed = parseInt(args[++i], 10);
        if (!isNaN(parsed)) config.quality = parsed;
    } else if (!arg.startsWith('--')) {
      targetPaths.push(path.resolve(process.cwd(), arg));
    }
  }

  if (!config.format && !config.resize && !config.favicon && config.quality === undefined) {
    console.log(`
Usage:
  node convert-images.js [options] <path1> <path2> ...

Options:
  --webp              Convert to .webp
  --png               Convert to .png
  --jpg               Convert to .jpg
  --resize WxH        Resize to width and height (e.g. 1200x630, or just 1200)
  --quality N         Set compression quality (1-100, default: 80 for converts, preserves format if used alone)
  --favicon           Generate a favicon.ico from a specified .png file
  --remove-original   Delete original files after successful conversion or overwrite with processed version

Examples:
  node convert-images.js --quality 60 --remove-original ./public/banner.jpg
  node convert-images.js --webp --quality 80 ./src/assets
  node convert-images.js --resize 800x600 --jpg --remove-original ./public/banner.png
    `);
    process.exit(0);
  }

  if (targetPaths.length === 0) {
    console.error('\u274c Please provide at least one target path.');
    process.exit(1);
  }

  for (const target of targetPaths) {
    if (!fs.existsSync(target)) {
      console.warn(`\u26a0\ufe0f  Target not found: ${target}`);
      continue;
    }

    const stat = fs.statSync(target);

    if (config.favicon && stat.isFile() && target.endsWith('.png')) {
      await generateFavicon(target);
    } else if (config.format || config.resize || config.quality !== undefined) {
      if (stat.isDirectory()) {
        await processDirectory(target, config);
      } else {
        await processImage(target, config);
      }
    }
  }
}

run();
