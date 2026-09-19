const fs = require('fs');
let content = fs.readFileSync('src/utils/audio.ts', 'utf-8');

// Replace empty catch with console.error to log the error
content = content.replace(/\.catch\(\(\) => \{\}\)/g, '.catch((e) => console.error("Audio playback error:", e))');

fs.writeFileSync('src/utils/audio.ts', content, 'utf-8');
console.log("Patched audio.ts for debugging");
