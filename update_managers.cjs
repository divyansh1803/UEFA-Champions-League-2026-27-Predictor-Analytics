const fs = require('fs');
let content = fs.readFileSync('src/data/teams.ts', 'utf-8');

const managers = {
  'aek_athens': 'Marko Nikolić',
  'arsenal': 'Mikel Arteta',
  'aston_villa': 'Unai Emery',
  'atletico_madrid': 'Diego Simeone',
  'barcelona': 'Hansi Flick',
  'bayern_munich': 'Vincent Kompany',
  'bodo_glimt': 'Kjetil Knutsen',
  'borussia_dortmund': 'Niko Kovač',
  'club_brugge': 'Ivan Leko',
  'como': 'Cesc Fàbregas',
  'fenerbahce': 'İsmail Kartal',
  'feyenoord': 'Giovanni van Bronckhorst',
  'galatasaray': 'Okan Buruk',
  'inter': 'Cristian Chivu',
  'lask': 'Dietmar Kühbauer',
  'rb_leipzig': 'Martín Demichelis',
  'rc_lens': 'Dino Toppmöller',
  'lille': 'Davide Ancelotti',
  'liverpool': 'Andoni Iraola',
  'manchester_city': 'Enzo Maresca',
  'manchester_united': 'Michael Carrick',
  'napoli': 'Massimiliano Allegri',
  'psg': 'Luis Enrique',
  'porto': 'Francesco Farioli',
  'psv': 'Peter Bosz',
  'real_betis': 'Manuel Pellegrini',
  'real_madrid': 'José Mourinho',
  'as_roma': 'Gian Piero Gasperini',
  'sabah': 'Valdas Dambrauskas',
  'shakhtar': 'Arda Turan',
  'slavia_prague': 'Jindřich Trpišovský',
  'slovan_bratislava': 'Yaya Touré',
  'sporting': 'Rui Borges',
  'stuttgart': 'Sebastian Hoeneß',
  'viking': 'Bjarte Lunde Aarsheim & Morten Jensen',
  'villarreal': 'Iñigo Pérez'
};

for (const [id, manager] of Object.entries(managers)) {
  const regex = new RegExp(`(id:\\s*'${id}',[\\s\\S]{1,600}?manager:\\s*')[^']*(')`);
  content = content.replace(regex, `$1${manager}$2`);
}

fs.writeFileSync('src/data/teams.ts', content, 'utf-8');
console.log("Patched manager names accurately");
