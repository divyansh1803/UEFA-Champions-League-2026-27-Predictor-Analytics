const fs = require('fs');

let content = fs.readFileSync('src/data/teams.ts', 'utf-8');
// Remove all ui-avatars.com links, replace with empty string
content = content.replace(/photo:\s*"https:\/\/ui-avatars\.com[^"]+"/g, 'photo: ""');

fs.writeFileSync('src/data/teams.ts', content, 'utf-8');
console.log("Removed ui-avatars.com to fix network lag");
