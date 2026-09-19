const fs = require('fs');
let content = fs.readFileSync('src/data/teams.ts', 'utf-8');

const ardaPhoto = "https://cdn.sofifa.net/players/265/589/24_120.png";

let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('name: "Arda Güler"')) {
    for (let j = i; j < i + 6; j++) {
      if (lines[j] && lines[j].includes('photo: ""')) {
        lines[j] = lines[j].replace('photo: ""', 'photo: "' + ardaPhoto + '"');
        break;
      }
    }
  }
}

fs.writeFileSync('src/data/teams.ts', lines.join('\n'), 'utf-8');
console.log("Patched Arda Güler photo");
