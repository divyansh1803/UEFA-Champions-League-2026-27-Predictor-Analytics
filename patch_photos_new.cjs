const fs = require('fs');
let content = fs.readFileSync('src/data/teams.ts', 'utf-8');

const newPhotos = {
  'Bradley Barcola': 'https://cdn.sofifa.net/players/264/240/24_120.png',
  'Ronald Araújo': 'https://cdn.sofifa.net/players/253/149/24_120.png',
  'Enzo Fernández': 'https://cdn.sofifa.net/players/255/475/24_120.png',
  'Marc Cucurella': 'https://cdn.sofifa.net/players/232/656/24_120.png',
  'Denzel Dumfries': 'https://cdn.sofifa.net/players/228/366/24_120.png',
  'Cristian Romero': 'https://cdn.sofifa.net/players/232/488/24_120.png',
  'Alejandro Grimaldo': 'https://cdn.sofifa.net/players/211/176/24_120.png',
  'John Stones': 'https://cdn.sofifa.net/players/203/574/24_120.png',
  'Rasmus Højlund': 'https://cdn.sofifa.net/players/265/291/24_120.png',
  'Moise Kean': 'https://cdn.sofifa.net/players/236/610/24_120.png',
  'Ferran Torres': 'https://cdn.sofifa.net/players/241/461/24_120.png'
};

for (const [name, url] of Object.entries(newPhotos)) {
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
console.log("Patched photos for new marquee transfers");
