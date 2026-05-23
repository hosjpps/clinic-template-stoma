import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const INPUT_DIR = path.join(ROOT, "public/images/raw");
const OUTPUT_DIR = path.join(ROOT, "public/images");
const WIDTHS = [640, 1280, 1920];

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (e) => {
      const p = path.join(dir, e.name);
      return e.isDirectory() ? walk(p) : [p];
    })
  );
  return files.flat();
}

async function processImage(inputPath: string) {
  const rel = path.relative(INPUT_DIR, inputPath);
  const dir = path.dirname(rel);
  const base = path.basename(rel, path.extname(rel));
  const outDir = path.join(OUTPUT_DIR, dir);
  await fs.mkdir(outDir, { recursive: true });

  for (const w of WIDTHS) {
    const resized = sharp(inputPath).resize(w, undefined, {
      withoutEnlargement: true,
    });
    await resized
      .clone()
      .avif({ quality: 65 })
      .toFile(path.join(outDir, `${base}-${w}w.avif`));
    await resized
      .clone()
      .webp({ quality: 80 })
      .toFile(path.join(outDir, `${base}-${w}w.webp`));
  }

  await sharp(inputPath)
    .jpeg({ quality: 85 })
    .toFile(path.join(outDir, `${base}.jpg`));
}

async function main() {
  const files = (await walk(INPUT_DIR)).filter((f) =>
    /\.(jpe?g|png)$/i.test(f)
  );
  console.log(`Found ${files.length} images.`);
  for (const f of files) {
    const rel = path.relative(INPUT_DIR, f);
    console.log("processing", rel);
    await processImage(f);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
