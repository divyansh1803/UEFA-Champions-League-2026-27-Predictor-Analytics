const fs = require('fs');
let content = fs.readFileSync('src/data/teams.ts', 'utf-8');

// The missing comma is before '{ id: "p1001"'
content = content.replace("}\n  {\n    id: \"p1001\",", "},\n  {\n    id: \"p1001\",");

fs.writeFileSync('src/data/teams.ts', content, 'utf-8');
console.log("Fixed missing comma");
