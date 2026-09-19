const fs = require('fs');
let content = fs.readFileSync('src/data/teams.ts', 'utf-8');

const arsenalTargets = [
  "David Raya",
  "Kepa Arrizabalaga",
  "William Saliba",
  "Cristhian Mosquera",
  "Gabriel",
  "Bukayo Saka",
  "Martin Ødegaard", // Correct spelling might be used
  "Martin Odegaard", 
  "Viktor Gyökeres",
  "Viktor Gyokeres",
  "Eberechi Eze",
  "Noni Madueke"
];

// Let's print out what teams they are currently on
const lines = content.split('\n');
for (const target of arsenalTargets) {
  let found = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`name: "${target}"`)) {
      found = true;
      console.log(target, 'found at line', i, lines[i+1]);
    }
  }
  if (!found) {
    console.log(target, 'NOT FOUND');
  }
}
