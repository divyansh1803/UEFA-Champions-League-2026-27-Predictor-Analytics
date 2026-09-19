const fs = require('fs');
let content = fs.readFileSync('src/data/teams.ts', 'utf-8');

const starPhotos = {
  'Mohamed Salah': 'https://cdn.sofifa.net/players/209/331/24_120.png',
  'Virgil van Dijk': 'https://cdn.sofifa.net/players/203/376/24_120.png',
  'Kevin De Bruyne': 'https://cdn.sofifa.net/players/192/985/24_120.png',
  'Robert Lewandowski': 'https://cdn.sofifa.net/players/188/545/24_120.png'
};

for (const [name, url] of Object.entries(starPhotos)) {
  const searchStr = `name: "${name}"`;
  const idx = content.indexOf(searchStr);
  if (idx !== -1) {
    const nextPhotoIdx = content.indexOf('photo: ""', idx);
    if (nextPhotoIdx !== -1 && nextPhotoIdx - idx < 200) {
      content = content.substring(0, nextPhotoIdx) + `photo: "${url}"` + content.substring(nextPhotoIdx + 9);
    }
  }
}

fs.writeFileSync('src/data/teams.ts', content, 'utf-8');
console.log("Patched photos for added star players");
