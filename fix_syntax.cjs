const fs = require('fs');
let content = fs.readFileSync('src/data/teams.ts', 'utf-8');
content = content.replace("'Nicholas D'Agostino'", '"Nicholas D\'Agostino"');
fs.writeFileSync('src/data/teams.ts', content, 'utf-8');
console.log("Fixed syntax error");
