const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC_DIR = path.resolve(__dirname, "..", "public");
const OUT_DIR = path.resolve(SRC_DIR, "og");
const MIN_W = 1200;
const MIN_H = 630;

const images = [
  "re.webp",
  "rem.webp",
  "ovdizzle.jpeg",
  "projects/tricode/home.webp",
];

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function generate(srcRel) {
  const src = path.join(SRC_DIR, srcRel);
  const base = path.basename(srcRel, path.extname(srcRel));
  const out = path.join(OUT_DIR, `${base}-og.webp`);

  if (!fs.existsSync(src)) {
    console.warn(`⚠️ source missing: ${srcRel}`);
    return false;
  }

  try {
    await sharp(src)
      .resize(MIN_W, MIN_H, { fit: "cover", position: "centre" })
      .webp({ quality: 82 })
      .toFile(out);

    console.log(`✅ generated ${path.relative(process.cwd(), out)}`);
    return true;
  } catch (err) {
    console.error(`❌ failed ${srcRel}: ${err.message}`);
    return false;
  }
}

(async () => {
  let any = false;
  for (const img of images) {
    const ok = await generate(img);
    any = any || ok;
  }

  if (!any) {
    console.warn("\nNo images were generated. Check the source paths.");
    process.exit(1);
  }
})();
