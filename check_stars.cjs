const fs = require('fs');

const data = fs.readFileSync('src/data/teams.ts', 'utf-8');
const names = [...data.matchAll(/name: "([^"]+)"/g)].map(m => m[1]);
const stars = [...data.matchAll(/starPlayers: \[(.*?)\]/g)].map(m => m[1]);

const allStars = [];
for (const s of stars) {
  const parts = s.split(',').map(x => x.trim().replace(/'/g, '').replace(/"/g, ''));
  allStars.push(...parts);
}

for (const star of allStars) {
  if (!names.includes(star) && star !== '') {
    console.log("Missing from INITIAL_PLAYERS: ", star);
  }
}
