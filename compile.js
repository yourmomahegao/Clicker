const fs = require("fs");
const path = require("path");
const axios = require("axios");

const cdnContentMap = {};

function CreateFolders() {
  if (fs.existsSync("public/compiled/")) {
    return false;
  }

  fs.mkdirSync("public/compiled/", {
    recursive: true,
  });

  fs.mkdirSync("public/compiled/dumps/", {
    recursive: true,
  });

  return true;
}

async function ReplaceCdns() {
  // Get all files in the "public/html" directory
  const htmlFiles = fs
    .readdirSync("public/html")
    .filter((file) => file.endsWith(".html"));

  let content;

  for (const file of htmlFiles) {
    const filePath = path.join("public/html", file);
    content = fs.readFileSync(filePath, "utf8");

    // Extract CDN links from <link> and <script> tags
    const linkMatches =
      content.match(/<link\srel="stylesheet"\shref="(http.+?)"\s*\/>/gi) || [];
    const scriptMatches =
      content.match(/<script\ssrc="(http.+?)"\s*><\/script>/gi) || [];

    for (const match of [...linkMatches, ...scriptMatches]) {
      const cdnLinkMatch = match.match(/href="(http.+?)"|src="(http.*?)"/);
      // console.log(cdnLinkMatch);
      let cdnLink = "";

      if (cdnLinkMatch[1]) {
        cdnLink = cdnLinkMatch[1];
      } else if (cdnLinkMatch[2]) {
        cdnLink = cdnLinkMatch[2];
      }

      const localPath = cdnLink.split("/").slice(-1)[0];
      const localFilePath = `public/compiled/${localPath}`;

      // Read CDN content and save to local file
      const response = await axios.get(cdnLink);
      fs.writeFileSync(localFilePath, `${response.data}`, "utf8");

      // Replace CDN link with local file path
      content = content.replaceAll(cdnLink, `./../../${localFilePath}`);
    }

    // Write modified content back to the file
    fs.writeFileSync(filePath, content, "utf8");
  }
}

async function DumpAllFiles() {
  // Get all files in the "public/html" directory
  const htmlFiles = fs
    .readdirSync("public/html")
    .filter((file) => file.endsWith(".html"));

  htmlFiles.forEach(async (file) => {
    const filePath = path.join("public/html", file);
    const filePathDestination = path.join("public/compiled/dumps", file);
    let content = fs.readFileSync(filePath, "utf8");

    // Write modified content back to the file
    fs.writeFileSync(filePathDestination, content, "utf8");
  });
}

async function compileFunction() {
  const canCompile = CreateFolders();

  if (canCompile) {
    await DumpAllFiles();
    await ReplaceCdns();
  } else {
    console.error("Приложение уже подготовлено для компиляции, сначала используйте <npm run decompile>.")
  }
}

compileFunction();
