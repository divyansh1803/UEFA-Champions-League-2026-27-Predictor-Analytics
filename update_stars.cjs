const fs = require('fs');

let content = fs.readFileSync('src/data/teams.ts', 'utf-8');

// The club IDs:
const clubStars = {
  'real_madrid': ['Kylian Mbappé', 'Vinícius Júnior', 'Jude Bellingham', 'Federico Valverde'],
  'manchester_city': ['Erling Haaland', 'Kevin De Bruyne', 'Rodri', 'Phil Foden'],
  'bayern_munich': ['Harry Kane', 'Jamal Musiala', 'Michael Olise', 'Joshua Kimmich'],
  'barcelona': ['Lamine Yamal', 'Robert Lewandowski', 'Raphinha', 'Pedri'],
  'liverpool': ['Mohamed Salah', 'Virgil van Dijk', 'Trent Alexander-Arnold', 'Alexis Mac Allister'],
  'arsenal': ['Bukayo Saka', 'Martin Ødegaard', 'Declan Rice', 'William Saliba'],
  'psg': ['Ousmane Dembélé', 'Bradley Barcola', 'Vitinha', 'Warren Zaïre-Emery'],
  'inter': ['Lautaro Martínez', 'Nicolò Barella', 'Marcus Thuram', 'Hakan Çalhanoğlu'],
  'aek_athens': ['Steven Zuber', 'Levi García', 'Mijat Gaćinović', 'Domagoj Vida'],
  'atletico_madrid': ['Antoine Griezmann', 'Julián Alvarez', 'Rodrigo De Paul', 'Jan Oblak'],
  'borussia_dortmund': ['Serhou Guirassy', 'Julian Brandt', 'Karim Adeyemi', 'Nico Schlotterbeck'],
  'lask': ['Robert Žulj', 'Sascha Horvath', 'Marin Ljubičić', 'Maximilian Entrup'],
  'sporting': ['Viktor Gyökeres', 'Francisco Trincão', 'Morten Hjulmand', 'Gonçalo Inácio'],
  'rc_lens': ['Florian Sotoca', 'Kevin Danso', 'Brice Samba', 'Przemysław Frankowski'],
  'aston_villa': ['Ollie Watkins', 'Emiliano Martínez', 'John McGinn', 'Youri Tielemans'],
  'as_roma': ['Paulo Dybala', 'Lorenzo Pellegrini', 'Artem Dovbyk', 'Gianluca Mancini'],
  'slovan_bratislava': ['Juraj Kucka', 'Tigran Barseghyan', 'Marko Tolić', 'David Strelec'],
  'manchester_united': ['Bruno Fernandes', 'Rasmus Højlund', 'Kobbie Mainoo', 'Alejandro Garnacho'],
  'rb_leipzig': ['Xavi Simons', 'Loïs Openda', 'Benjamin Šeško', 'Willi Orbán'],
  'feyenoord': ['Quinten Timber', 'Santiago Gimenez', 'Igor Paixão', 'David Hancko'],
  'psv': ['Luuk de Jong', 'Johan Bakayoko', 'Joey Veerman', 'Jerdy Schouten'],
  'porto': ['Diogo Costa', 'Galeno', 'Alan Varela', 'Pepê'],
  'sabah': ['Joy-Lance Mickels', 'Anatoliy Nuriyev', 'Ramil Sheydayev', 'Aleksey Isayev'],
  'napoli': ['Khvicha Kvaratskhelia', 'Romelu Lukaku', 'Scott McTominay', 'Alessandro Buongiorno'],
  'galatasaray': ['Mauro Icardi', 'Victor Osimhen', 'Dries Mertens', 'Barış Alper Yılmaz'],
  'fenerbahce': ['Edin Džeko', 'Dušan Tadić', 'Fred', 'Allan Saint-Maximin'],
  'villarreal': ['Gerard Moreno', 'Álex Baena', 'Ayoze Pérez', 'Dani Parejo'],
  'real_betis': ['Giovani Lo Celso', 'Nabil Fekir', 'Vitor Roque', 'Ezri Konsa'],
  'stuttgart': ['Deniz Undav', 'Angelo Stiller', 'Alexander Nübel', 'Enzo Millot'],
  'lille': 'Jonathan David, Edon Zhegrova, Angel Gomes, Lucas Chevalier'.split(', '),
  'viking': ['Zlatko Tripić', 'Sander Svendsen', 'Nicholas D\'Agostino', 'Joe Bell'],
  'club_brugge': ['Hans Vanaken', 'Andreas Skov Olsen', 'Simon Mignolet', 'Maxim De Cuyper'],
  'shakhtar': ['Georgiy Sudakov', 'Danylo Sikan', 'Mykola Matviyenko', 'Marlon Gomes'],
  'slavia_prague': ['Lukáš Provod', 'Tomáš Chorý', 'Oscar Dorley', 'Christos Zafeiris'],
  'bodo_glimt': ['Patrick Berg', 'Kasper Høgh', 'Jens Petter Hauge', 'Albert Grønbæk'],
  'como': ['Patrick Cutrone', 'Gabriel Strefezza', 'Nico Paz', 'Sergi Roberto']
};

let clubsBlock = content.split('export const CLUBS: Club[] = [')[1];
let clubsContent = clubsBlock.split('];')[0];
const prefix = content.split('export const CLUBS: Club[] = [')[0];
const suffix = content.split(clubsContent + '];')[1];

for (const [id, stars] of Object.entries(clubStars)) {
  const regex = new RegExp(`(id:\\s*'${id}',[\\s\\S]{1,600}?starPlayers:\\s*\\[).*?(\\])`);
  clubsContent = clubsContent.replace(regex, `$1'${stars.join("', '")}'$2`);
}

content = prefix + 'export const CLUBS: Club[] = [' + clubsContent + '];' + suffix;

// Now, we must ensure these players exist in INITIAL_PLAYERS and have the correct teamId.
// We will just dynamically inject them at the very end of INITIAL_PLAYERS.
let initialPlayersBlock = content.split('export const INITIAL_PLAYERS: PlayerStats[] = [')[1];
let initialPlayersContent = initialPlayersBlock.split('];')[0];

let pIdCounter = 1000;
for (const [id, stars] of Object.entries(clubStars)) {
  for (const star of stars) {
    // If they exist, maybe their teamId is wrong. Let's fix their teamId, or if missing, add them.
    const starRegex = new RegExp(`name:\\s*"${star}"[\\s\\S]{1,50}teamId:\\s*"([^"]+)"`);
    if (starRegex.test(initialPlayersContent)) {
      initialPlayersContent = initialPlayersContent.replace(starRegex, (match) => {
        return match.replace(/teamId:\s*"[^"]+"/, `teamId: "${id}"`);
      });
    } else {
      // add them
      pIdCounter++;
      let position = 'FWD';
      if (['Virgil van Dijk', 'Trent Alexander-Arnold', 'William Saliba', 'Alessandro Bastoni', 'Nico Schlotterbeck', 'Gonçalo Inácio', 'Kevin Danso', 'Alessandro Buongiorno', 'Mykola Matviyenko'].includes(star)) position = 'DEF';
      if (['Kevin De Bruyne', 'Rodri', 'Pedri', 'Alexis Mac Allister', 'Declan Rice', 'Vitinha', 'Warren Zaïre-Emery', 'Nicolò Barella', 'Hakan Çalhanoğlu', 'Rodrigo De Paul', 'Julian Brandt', 'Bruno Fernandes', 'Kobbie Mainoo'].includes(star)) position = 'MID';
      if (['Jan Oblak', 'Emiliano Martínez', 'Diogo Costa', 'Alexander Nübel', 'Lucas Chevalier', 'Simon Mignolet'].includes(star)) position = 'GK';

      initialPlayersContent += `  {
    id: "p${pIdCounter}",
    name: "${star}",
    teamId: "${id}",
    position: "${position}",
    photo: "",
    nationality: "EUR",
    number: 10,
    goals: 15,
    assists: 10,
    cleanSheets: 0,
    yellowCards: 2,
    redCards: 0,
    rating: 88
  },
`;
    }
  }
}

content = content.split('export const INITIAL_PLAYERS: PlayerStats[] = [')[0] + 'export const INITIAL_PLAYERS: PlayerStats[] = [' + initialPlayersContent + '];';

fs.writeFileSync('src/data/teams.ts', content, 'utf-8');
console.log("Patched star players and INITIAL_PLAYERS");
