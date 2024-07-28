const fs = require("fs");
const path = require("path");

// Get all files in the "public/html" directory
const htmlDumpFiles = fs
  .readdirSync("public/compiled/dumps")
  .filter((file) => file.endsWith(".html"));

for (const htmlDumpFile of htmlDumpFiles) {
  const dumpFilePath = path.join("public/compiled/dumps", htmlDumpFile);
  const filePath = path.join("public/html", htmlDumpFile);
  content = fs.readFileSync(dumpFilePath, "utf8");
  fs.writeFileSync(filePath, content);
}

fs.rmSync("public/compiled", { recursive: true, force: true })

