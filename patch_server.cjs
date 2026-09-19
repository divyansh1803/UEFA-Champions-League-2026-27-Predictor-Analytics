const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

// Remove import { fileURLToPath } from "url";
content = content.replace(/import \{ fileURLToPath \} from "url";\n/, "");

// Remove __filename and __dirname
content = content.replace(/const __filename = fileURLToPath\(import\.meta\.url\);\nconst __dirname = path\.dirname\(__filename\);\n/, "");

fs.writeFileSync('server.ts', content, 'utf-8');
console.log("Patched server.ts to remove import.meta.url");
