const fs = require('fs');
let content = fs.readFileSync('src/utils/audio.ts', 'utf-8');

// Replace new Audio instances with cache busting parameters
content = content.replace(/new Audio\('\/audio\/anthem\.mp3'\)/g, "new Audio('/audio/anthem.mp3?v=' + Date.now())");
content = content.replace(/new Audio\('\/audio\/mrmark_goal\.mp3'\)/g, "new Audio('/audio/mrmark_goal.mp3?v=' + Date.now())");
content = content.replace(/new Audio\('\/audio\/crowd_cheering_vishiv\.mp3'\)/g, "new Audio('/audio/crowd_cheering_vishiv.mp3?v=' + Date.now())");
content = content.replace(/new Audio\('\/audio\/don_miguelo_victory\.mp3'\)/g, "new Audio('/audio/don_miguelo_victory.mp3?v=' + Date.now())");

fs.writeFileSync('src/utils/audio.ts', content, 'utf-8');
console.log("Patched audio.ts with cache busting");
