const fs = require("fs");
const path = require("path");

const srcRoot = "/tmp/title-vi-2024/content";
const targetRoot1 = path.join(process.cwd(), "public", "title-vi-2024");
const targetRoot2 = path.join(process.cwd(), "public");

const dirSlugMap = {
  "Introduction": "introduction",
  "MPA Demographic Profile": "mpa-demographic-profile",
  "MPA Demographic Profile/Data Sources and Methodology": "mpa-demographic-profile/data-sources-and-methodology",
  "MPA Demographic Profile/MPA Demographic and Transportation Profile": "mpa-demographic-profile/mpa-demographic-and-transportation-profile",
  "MPA Demographic Profile/Title VI Demographics": "mpa-demographic-profile/title-vi-demographics",
  "Public Participation Plan": "public-participation-plan",
  "LEP Assessment": "lep-assessment",
  "Title VI Assurances and Forms": "title-vi-assurances-and-forms",
  "Title VI Assurances and Forms/Forms": "title-vi-assurances-and-forms/forms",
  "Title VI Assurances and Forms/Assurances": "title-vi-assurances-and-forms/assurances",
  "Appendices": "appendices",
  "Appendices/Appendix I": "appendices/appendix-i",
  "Appendices/Appendix II": "appendices/appendix-ii",
  "Appendices/Appendix III": "appendices/appendix-iii",
  "Appendices/Appendix IV": "appendices/appendix-iv",
  "Appendices/Appendix V": "appendices/appendix-v"
};

function mapPath(relPath) {
  const dir = path.dirname(relPath);
  const file = path.basename(relPath);
  
  let targetDir = "";
  if (dir === ".") {
    targetDir = "";
  } else if (dirSlugMap[dir]) {
    targetDir = dirSlugMap[dir];
  } else {
    targetDir = dir.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  let targetFile = file;
  if (file === "_index.md") {
    targetFile = "index.md";
  }

  return path.join(targetDir, targetFile);
}

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = walk(srcRoot);

allFiles.forEach(f => {
  const rel = path.relative(srcRoot, f);
  const destRel = mapPath(rel);
  
  const destPath1 = path.join(targetRoot1, destRel);
  const destPath2 = path.join(targetRoot2, destRel);
  
  fs.mkdirSync(path.dirname(destPath1), { recursive: true });
  fs.mkdirSync(path.dirname(destPath2), { recursive: true });
  
  if (f.endsWith(".md")) {
    let content = fs.readFileSync(f, "utf8");
    let title = "";
    
    // Extract frontmatter title
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (fmMatch) {
      const fm = fmMatch[1];
      const titleMatch = fm.match(/^title:\s*["']?(.*?)["']?$/m);
      if (titleMatch) {
        title = titleMatch[1].trim();
      }
      content = content.slice(fmMatch[0].length).trim();
    }
    
    // If title was found and content does not start with #, prepend heading
    if (title && !content.startsWith("#")) {
      content = `# ${title}\n\n` + content;
    }
    
    fs.writeFileSync(destPath1, content, "utf8");
    fs.writeFileSync(destPath2, content, "utf8");
  } else {
    fs.copyFileSync(f, destPath1);
    fs.copyFileSync(f, destPath2);
  }
});

console.log("Successfully synced", allFiles.length, "files!");
