const fs = require('fs');
let content = fs.readFileSync('src/data/teams.ts', 'utf-8');

const arsenalTargets = [
  "David Raya",
  "Kepa Arrizabalaga",
  "William Saliba",
  "Cristhian Mosquera",
  "Gabriel",
  "Bukayo Saka",
  "Martin Odegaard",
  "Viktor Gyokeres",
  "Eberechi Eze",
  "Noni Madueke"
];

const known = {
  "William Saliba": "https://cdn.sofifa.net/players/243/715/24_120.png",
  "Bukayo Saka": "https://cdn.sofifa.net/players/246/669/24_120.png",
  "Martin Odegaard": "https://cdn.sofifa.net/players/222/665/24_120.png",
  "David Raya": "https://cdn.sofifa.net/players/221/371/24_120.png",
  "Kepa Arrizabalaga": "https://cdn.sofifa.net/players/206/585/24_120.png",
  "Cristhian Mosquera": "https://cdn.sofifa.net/players/265/589/24_120.png",
  "Gabriel": "https://cdn.sofifa.net/players/234/960/24_120.png",
  "Viktor Gyokeres": "https://cdn.sofifa.net/players/239/301/24_120.png",
  "Eberechi Eze": "https://cdn.sofifa.net/players/239/081/24_120.png",
  "Noni Madueke": "https://cdn.sofifa.net/players/253/826/24_120.png"
};

// Update Arsenal's starPlayers
const regex = new RegExp(`(id:\\s*'arsenal',[\\s\\S]{1,600}?starPlayers:\\s*\\[).*?(\\])`);
content = content.replace(regex, `$1'${arsenalTargets.join("', '")}'$2`);

// Process INITIAL_PLAYERS to ensure they are there with teamId 'arsenal' and photo
let initialPlayersBlock = content.split('export const INITIAL_PLAYERS: PlayerStats[] = [')[1];
let initialPlayersContent = initialPlayersBlock.split('];')[0];
const prefix = content.split('export const INITIAL_PLAYERS: PlayerStats[] = [')[0];

let pIdCounter = 2000;
for (const p of arsenalTargets) {
  // If player exists, we update their team and photo
  // Some players might exist with slightly different names (e.g., "Martin Ødegaard" vs "Martin Odegaard")
  let targetName = p;
  if (p === 'Martin Odegaard') targetName = 'Martin Ødegaard';
  if (p === 'Viktor Gyokeres') targetName = 'Viktor Gyökeres';
  if (p === 'Gabriel') targetName = 'Gabriel Magalhães';

  const starRegex = new RegExp(`name:\\s*"${targetName}"[\\s\\S]{1,50}teamId:\\s*"([^"]+)"`);
  if (starRegex.test(initialPlayersContent)) {
    // Update teamId
    initialPlayersContent = initialPlayersContent.replace(starRegex, (match) => {
      return match.replace(/teamId:\s*"[^"]+"/, `teamId: "arsenal"`);
    });
    // Update photo
    const photoRegex = new RegExp(`name:\\s*"${targetName}"([\\s\\S]{1,100}?)photo:\\s*"[^"]*"`);
    initialPlayersContent = initialPlayersContent.replace(photoRegex, `name: "${targetName}"$1photo: "${known[p]}"`);
    
    // rename them to exactly what's in the arsenalTargets array if we need them to match exactly.
    // The user provided "Martin Odegaard", so if they want EXACT names in starPlayers, the names in INITIAL_PLAYERS must match exactly.
    // Let's just rename them to exactly what the user provided so `INITIAL_PLAYERS.find(pl => pl.name === playerName)` works perfectly.
    const nameRegex = new RegExp(`name:\\s*"${targetName}"`);
    initialPlayersContent = initialPlayersContent.replace(nameRegex, `name: "${p}"`);

  } else {
    // Check if the exact name already exists
    const exactRegex = new RegExp(`name:\\s*"${p}"[\\s\\S]{1,50}teamId:\\s*"([^"]+)"`);
    if (exactRegex.test(initialPlayersContent)) {
      initialPlayersContent = initialPlayersContent.replace(exactRegex, (match) => {
        return match.replace(/teamId:\s*"[^"]+"/, `teamId: "arsenal"`);
      });
      const photoRegex = new RegExp(`name:\\s*"${p}"([\\s\\S]{1,100}?)photo:\\s*"[^"]*"`);
      initialPlayersContent = initialPlayersContent.replace(photoRegex, `name: "${p}"$1photo: "${known[p]}"`);
    } else {
      // Add them
      pIdCounter++;
      let position = 'FWD';
      if (['William Saliba', 'Cristhian Mosquera', 'Gabriel'].includes(p)) position = 'DEF';
      if (['Martin Odegaard', 'Eberechi Eze'].includes(p)) position = 'MID';
      if (['David Raya', 'Kepa Arrizabalaga'].includes(p)) position = 'GK';

      initialPlayersContent += `  {
    id: "p${pIdCounter}",
    name: "${p}",
    teamId: "arsenal",
    position: "${position}",
    photo: "${known[p]}",
    nationality: "EUR",
    number: 10,
    goals: 5,
    assists: 5,
    cleanSheets: 0,
    yellowCards: 0,
    redCards: 0,
    rating: 85
  },
`;
    }
  }
}

content = prefix + 'export const INITIAL_PLAYERS: PlayerStats[] = [' + initialPlayersContent + '];';
fs.writeFileSync('src/data/teams.ts', content, 'utf-8');
console.log("Patched Arsenal players!");
