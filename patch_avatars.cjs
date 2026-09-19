const fs = require('fs');

let content = fs.readFileSync('src/data/teams.ts', 'utf-8');
let lines = content.split('\n');
let currentName = '';

for (let i = 0; i < lines.length; i++) {
  let nameMatch = lines[i].match(/name:\s*"([^"]+)"/);
  if (nameMatch) {
    currentName = nameMatch[1];
  }
  
  if (lines[i].includes('photo: ""') && currentName) {
    const encoded = encodeURIComponent(currentName);
    lines[i] = lines[i].replace('photo: ""', 'photo: "https://ui-avatars.com/api/?name=' + encoded + '&background=random&color=fff&size=150"');
  }
}

fs.writeFileSync('src/data/teams.ts', lines.join('\n'), 'utf-8');
console.log("Restored ui-avatars.com in teams.ts");
