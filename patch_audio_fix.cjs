const fs = require('fs');
let content = fs.readFileSync('src/utils/audio.ts', 'utf-8');

// Remove cache busting query params
content = content.replace(/\?v=' \+ Date\.now\(\)/g, "'");

fs.writeFileSync('src/utils/audio.ts', content, 'utf-8');
console.log("Patched audio.ts: removed cache busting");
