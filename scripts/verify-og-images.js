const fs = require("fs");
const path = require("path");
const sizeOf = require("image-size");

const MIN_W = 1200;
const MIN_H = 630;

const candidates = ["re", "rem", "ovdizzle", "projects/tricode/home"];

const images = candidates.map((name) => {
  const og = `public/og/${name}-og.webp`;
  const webp = `public/${name}.webp`;
  const jpg = `public/${name}.jpeg`;
  const png = `public/${name}.png`;
  const paths = [og, webp, jpg, png];

  const found = paths.find((p) =>
    fs.existsSync(path.resolve(__dirname, "..", p)),
  );

  if (!found) {
    console.warn(
      `⚠️ Missing image for candidate: ${name} (checked: ${paths.join(", ")})`,
    );
    // return OG path so the existing logic will warn about missing file
    return og;
  }

  return found;
});

let allGood = true;

images.forEach((rel) => {
  const p = path.resolve(__dirname, "..", rel);
  if (!fs.existsSync(p)) {
    console.warn(`⚠️ Missing image: ${rel}`);
    allGood = false;
    return;
  }
  try {
    const { width, height } = sizeOf(p);
    if (width < MIN_W || height < MIN_H) {
      console.warn(
        `⚠️ Image ${rel} is ${width}x${height} — should be at least ${MIN_W}x${MIN_H}`,
      );
      allGood = false;
    } else {
      console.log(`✅ ${rel}: ${width}x${height}`);
    }
  } catch (err) {
    console.warn(`⚠️ Could not read ${rel}: ${err.message}`);
    allGood = false;
  }
});

if (!allGood) {
  console.warn(
    "\nSome OpenGraph image checks failed. Consider replacing or resizing images to ~1200x630.",
  );
  process.exit(1);
} else {
  console.log("\nAll checked images meet the recommended dimensions.");
}
