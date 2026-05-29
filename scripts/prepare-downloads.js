import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GAMES_DIR = path.join(__dirname, '../src/games');
const OUTPUT_DIR = path.join(__dirname, '../public/downloads');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function zipGames() {
  const folders = fs.readdirSync(GAMES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  folders.forEach(folder => {
    const folderPath = path.join(GAMES_DIR, folder);
    const xmlPath = path.join(folderPath, 'game.xml');
    let zipName = folder.replace(/\s+/g, '_') + '.zip';

    if (fs.existsSync(xmlPath)) {
      const xmlContent = fs.readFileSync(xmlPath, 'utf-8');
      const match = xmlContent.match(/<downloadUrl>(.*?)<\/downloadUrl>/);
      if (match && match[1]) {
        // Extract filename from path like /downloads/FileName.zip
        const customPath = match[1].trim();
        zipName = path.basename(customPath);
      }
    }
    
    const zip = new AdmZip();
    zip.addLocalFolder(folderPath);
    
    const outputPath = path.join(OUTPUT_DIR, zipName);
    zip.writeZip(outputPath);
    console.log(`Successfully zipped ${folder} to ${outputPath}`);
  });
}

zipGames();
