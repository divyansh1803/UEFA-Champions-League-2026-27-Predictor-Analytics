const fs = require('fs');
let content = fs.readFileSync('src/data/teams.ts', 'utf-8');

// The regex will look for `name: "[[Name (disambiguation)"` and replace it with `name: "Name"`
// Also just general cleanup of `[[` anywhere in the name.
// First, replace `[[Name (disambiguation)` with `Name`
content = content.replace(/name: "\[\[([^("|]+)(?:\s*\([^)]+\))?(?:\|[^"]+)?",/g, 'name: "$1",');
content = content.replace(/name: "\[\[([^"]+)",/g, 'name: "$1",');

// Ensure no trailing spaces in the name
content = content.replace(/name: "([^"]+)\s+",/g, 'name: "$1",');

fs.writeFileSync('src/data/teams.ts', content, 'utf-8');
console.log("Cleaned up player names.");
