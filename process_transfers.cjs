const fs = require('fs');

const transfers = [
  // Arsenal
  { player: "Bruno Guimarães", to: "arsenal" },
  { player: "Ezri Konsa", to: "arsenal" },
  { player: "Piero Hincapié", to: "arsenal" },
  { player: "Christos Tzolis", to: "arsenal" },
  { player: "Illan Meslier", to: "arsenal" },
  { player: "Gabriel Martinelli", to: "al_hilal" }, // out of UCL basically, we can assign to 'free' or leave
  { player: "Gabriel Jesus", to: "barcelona" },
  
  // Aston Villa
  { player: "Ibrahim Mbaye", to: "aston_villa" },
  { player: "Taylor Harwood-Bellis", to: "aston_villa" },
  { player: "Nicolas Jackson", to: "aston_villa" },
  { player: "Johan Manzambi", to: "aston_villa" },
  { player: "Leon Goretzka", to: "aston_villa" },
  { player: "Donyell Malen", to: "as_roma" },
  
  // Liverpool
  { player: "Bradley Barcola", to: "liverpool" },
  { player: "Jérémy Jacquet", to: "liverpool" },
  { player: "Víctor Muñoz", to: "liverpool" },
  { player: "Lucca Brughmans", to: "liverpool" },
  { player: "Ronald Araújo", to: "liverpool" },
  { player: "Ibrahima Konaté", to: "real_madrid" },
  { player: "Mohamed Salah", to: "trabzonspor" }, // Out
  { player: "Curtis Jones", to: "inter" },
  
  // Manchester City
  { player: "Enzo Fernández", to: "manchester_city" },
  { player: "Elliot Anderson", to: "manchester_city" },
  { player: "Ayyoub Bouaddi", to: "manchester_city" },
  { player: "Iliman Ndiaye", to: "manchester_city" },
  { player: "Allan", to: "manchester_city" },
  { player: "Rodri", to: "barcelona" },
  { player: "Bernardo Silva", to: "real_madrid" },
  { player: "John Stones", to: "inter" },
  
  // Real Madrid
  { player: "Yan Diomande", to: "real_madrid" },
  { player: "Marc Cucurella", to: "real_madrid" },
  { player: "Denzel Dumfries", to: "real_madrid" },
  { player: "Carlos Espí", to: "real_madrid" },
  
  // Barcelona
  { player: "Anthony Gordon", to: "barcelona" },
  
  // Atlético Madrid
  { player: "Cristian Romero", to: "atletico_madrid" },
  { player: "Alejandro Grimaldo", to: "atletico_madrid" },
  { player: "Morten Hjulmand", to: "atletico_madrid" },
  { player: "Lee Kang-in", to: "atletico_madrid" },
  { player: "Jonathan David", to: "atletico_madrid" },
  
  // Inter
  { player: "Djed Spence", to: "inter" },
  { player: "Aleksandar Stanković", to: "inter" },
  { player: "Manuel Akanji", to: "inter" },
  { player: "Ivan Provedel", to: "inter" },
  
  // Napoli
  { player: "Rasmus Højlund", to: "napoli" },
  { player: "Alisson Santos", to: "napoli" },
  { player: "Vanja Milinković-Savić", to: "napoli" },
  { player: "Benoît Badiashile", to: "napoli" },
  
  // Roma
  { player: "Santiago Castro", to: "as_roma" },
  { player: "Rodrigo Mora", to: "as_roma" },
  { player: "Leonardo Balerdi", to: "as_roma" },
  { player: "Konstantinos Koulierakis", to: "as_roma" },
  { player: "Nahuel Molina", to: "as_roma" },
  { player: "Marten de Roon", to: "as_roma" },
  
  // Como
  { player: "Moise Kean", to: "como" },
  { player: "Trevoh Chalobah", to: "como" },
  { player: "Yan Couto", to: "como" },
  { player: "Luis Milla", to: "como" },
  { player: "Samuele Ricci", to: "como" },
  { player: "Robert Sánchez", to: "como" },
  { player: "Álvaro Morata", to: "como" },
  
  // Bayern Munich
  { player: "Ismael Saibari", to: "bayern_munich" },
  { player: "Nathaniel Brown", to: "bayern_munich" },
  
  // Borussia Dortmund
  { player: "Joey Veerman", to: "borussia_dortmund" },
  { player: "Konstantinos Karetsas", to: "borussia_dortmund" },
  { player: "Giannis Konstantelias", to: "borussia_dortmund" },
  { player: "Ethan Nwaneri", to: "borussia_dortmund" },
  { player: "Joane Gadou", to: "borussia_dortmund" },
  { player: "Kauã Prates", to: "borussia_dortmund" },
  { player: "Justin Lerma", to: "borussia_dortmund" },
  
  // RB Leipzig
  { player: "Maxime Estève", to: "rb_leipzig" },
  { player: "Rocco Reitz", to: "rb_leipzig" },
  { player: "Marc Guiu", to: "rb_leipzig" },
  { player: "Christopher Nkunku", to: "rb_leipzig" },
  { player: "Neil El Aynaoui", to: "rb_leipzig" },
  { player: "Ørjan Nyland", to: "rb_leipzig" },
  
  // VfB Stuttgart
  { player: "Dženan Pejčinović", to: "stuttgart" },
  { player: "Leo Sauer", to: "stuttgart" },
  { player: "Grischa Prömel", to: "stuttgart" },
  { player: "Bilal El Khannouss", to: "stuttgart" },
  
  // Paris Saint-Germain
  { player: "Ferran Torres", to: "psg" },
  { player: "Maghnes Akliouche", to: "psg" },
  { player: "Lucas Digne", to: "psg" },
  { player: "Mika Godts", to: "psg" },
  { player: "Gonçalo Ramos", to: "ac_milan" }, // Out
  { player: "Randal Kolo Muani", to: "juventus" }, // Out
  
  // Lens
  { player: "Saud Abdulhamid", to: "rc_lens" },
  { player: "Yacine Titraoui", to: "rc_lens" },
  { player: "Michał Skóraś", to: "rc_lens" },
  { player: "Jean-Clair Todibo", to: "rc_lens" },
  
  // Lille
  { player: "Ayase Ueda", to: "lille" },
  { player: "Başar Önal", to: "lille" },
  
  // Galatasaray
  { player: "Rafael Leão", to: "galatasaray" }
];

let content = fs.readFileSync('src/data/teams.ts', 'utf-8');

let initialPlayersBlock = content.split('export const INITIAL_PLAYERS: PlayerStats[] = [')[1];
let initialPlayersContent = initialPlayersBlock.split('];')[0];
const prefix = content.split('export const INITIAL_PLAYERS: PlayerStats[] = [')[0];

let pIdCounter = 3000;
for (const t of transfers) {
  let player = t.player;
  const targetRegex = new RegExp(`name:\\s*"${player}"[\\s\\S]{1,50}teamId:\\s*"([^"]+)"`);
  
  if (targetRegex.test(initialPlayersContent)) {
    // Update teamId
    initialPlayersContent = initialPlayersContent.replace(targetRegex, (match) => {
      return match.replace(/teamId:\s*"[^"]+"/, `teamId: "${t.to}"`);
    });
  } else {
    // Add them if they don't exist
    pIdCounter++;
    initialPlayersContent += `  {
    id: "p${pIdCounter}",
    name: "${player}",
    teamId: "${t.to}",
    position: "FWD",
    photo: "",
    nationality: "EUR",
    number: 10,
    goals: 5,
    assists: 5,
    cleanSheets: 0,
    yellowCards: 0,
    redCards: 0,
    rating: 83
  },
`;
  }
}

// Update starPlayers for relevant clubs based on new rosters
const clubStars = {
  'arsenal': ['David Raya', 'Bruno Guimarães', 'Bukayo Saka', 'Martin Ødegaard'],
  'liverpool': ['Bradley Barcola', 'Virgil van Dijk', 'Trent Alexander-Arnold', 'Ronald Araújo'],
  'manchester_city': ['Erling Haaland', 'Enzo Fernández', 'Kevin De Bruyne', 'Phil Foden'],
  'real_madrid': ['Kylian Mbappé', 'Vinícius Júnior', 'Jude Bellingham', 'Bernardo Silva'],
  'barcelona': ['Lamine Yamal', 'Robert Lewandowski', 'Rodri', 'Gabriel Jesus'],
  'atletico_madrid': ['Antoine Griezmann', 'Julián Alvarez', 'Cristian Romero', 'Jonathan David'],
  'inter': ['Lautaro Martínez', 'John Stones', 'Manuel Akanji', 'Nicolò Barella'],
  'napoli': ['Khvicha Kvaratskhelia', 'Rasmus Højlund', 'Scott McTominay', 'Alessandro Buongiorno'],
  'as_roma': ['Paulo Dybala', 'Lorenzo Pellegrini', 'Donyell Malen', 'Álvaro Morata'],
  'como': ['Moise Kean', 'Nico Paz', 'Trevoh Chalobah', 'Robert Sánchez'],
  'bayern_munich': ['Harry Kane', 'Jamal Musiala', 'Michael Olise', 'Joshua Kimmich'],
  'borussia_dortmund': ['Serhou Guirassy', 'Joey Veerman', 'Karim Adeyemi', 'Nico Schlotterbeck'],
  'rb_leipzig': ['Xavi Simons', 'Loïs Openda', 'Christopher Nkunku', 'Benjamin Šeško'],
  'stuttgart': ['Deniz Undav', 'Angelo Stiller', 'Alexander Nübel', 'Bilal El Khannouss'],
  'psg': ['Ousmane Dembélé', 'Ferran Torres', 'Vitinha', 'Warren Zaïre-Emery'],
  'rc_lens': ['Florian Sotoca', 'Kevin Danso', 'Brice Samba', 'Jean-Clair Todibo'],
  'lille': ['Jonathan David', 'Edon Zhegrova', 'Angel Gomes', 'Ayase Ueda'],
  'galatasaray': ['Rafael Leão', 'Mauro Icardi', 'Victor Osimhen', 'Dries Mertens']
};

let clubsBlock = prefix.split('export const CLUBS: Club[] = [')[1];
let clubsContent = clubsBlock;
const startPrefix = prefix.split('export const CLUBS: Club[] = [')[0];

for (const [id, stars] of Object.entries(clubStars)) {
  const regex = new RegExp(`(id:\\s*'${id}',[\\s\\S]{1,600}?starPlayers:\\s*\\[).*?(\\])`);
  clubsContent = clubsContent.replace(regex, `$1'${stars.join("', '")}'$2`);
}

content = startPrefix + 'export const CLUBS: Club[] = [' + clubsContent + 'export const INITIAL_PLAYERS: PlayerStats[] = [' + initialPlayersContent + '];';

fs.writeFileSync('src/data/teams.ts', content, 'utf-8');
console.log("Patched transfers and starPlayers");
