import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirsToScan = [
  path.join(__dirname, 'src/assets'),
  path.join(__dirname, 'public/assets')
];

const extensions = ['.png', '.jpg', '.jpeg'];

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (extensions.includes(ext) && file !== 'logo.png') {
        const webpPath = fullPath.replace(new RegExp(ext + '$', 'i'), '.webp');
        try {
          await sharp(fullPath).webp({ quality: 80 }).toFile(webpPath);
          console.log(`Converted ${fullPath} to ${webpPath}`);
          fs.unlinkSync(fullPath);
        } catch (err) {
          console.error(`Error converting ${fullPath}:`, err);
        }
      }
    }
  }
}

async function generateFavicon() {
  const logoPath = path.join(__dirname, 'public', 'logo.png');
  const icoPath = path.join(__dirname, 'public', 'favicon.ico');
  const webpLogoPath = path.join(__dirname, 'public', 'logo.webp');
  
  const bannerPath = path.join(__dirname, 'public', 'banner.png');
  const webpBannerPath = path.join(__dirname, 'public', 'banner.webp');

  if (fs.existsSync(logoPath)) {
    try {
      const buf = await pngToIco(logoPath);
      fs.writeFileSync(icoPath, buf);
      console.log(`Generated favicon.ico from logo.png`);

      await sharp(logoPath).webp({ quality: 80 }).toFile(webpLogoPath);
      fs.unlinkSync(logoPath);
      console.log(`Converted logo.png to logo.webp`);
    } catch (err) {
      console.error(`Favicon generation failed:`, err);
    }
  }

  if (fs.existsSync(bannerPath)) {
    try {
      await sharp(bannerPath).webp({ quality: 80 }).toFile(webpBannerPath);
      fs.unlinkSync(bannerPath);
      console.log(`Converted banner.png to banner.webp`);
    } catch (err) {
      console.error(`Banner conversion failed:`, err);
    }
  }
}

async function run() {
  for (const dir of dirsToScan) {
    if (fs.existsSync(dir)) {
      await processDirectory(dir);
    }
  }
  await generateFavicon();
}

run();
