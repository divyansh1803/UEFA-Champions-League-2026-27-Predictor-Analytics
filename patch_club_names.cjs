const fs = require('fs');
let content = fs.readFileSync('src/data/teams.ts', 'utf-8');

const nameMap = {
  "'Real Madrid'": "'Real Madrid C.F.'",
  "'Bayern Munich'": "'FC Bayern München'",
  "'Barcelona'": "'FC Barcelona'",
  "'Liverpool'": "'Liverpool FC'",
  "'Arsenal'": "'Arsenal FC'",
  "'Inter Milan'": "'FC Internazionale Milano'",
  "'Atlético Madrid'": "'Atlético de Madrid'",
  "'Sporting CP'": "'Sporting Clube de Portugal'",
  "'Napoli'": "'SSC Napoli'",
  "'Galatasaray'": "'Galatasaray A.Ş.'",
  "'Fenerbahçe'": "'Fenerbahçe SK'",
  "'Villarreal'": "'Villarreal CF'",
  "'Real Betis'": "'Real Betis Balompié'",
  "'Lille OSC'": "'LOSC Lille'",
  "'Club Brugge'": "'Club Brugge KV'",
  "'Shakhtar Donetsk'": "'FC Shakhtar Donetsk'"
};

for (const oldName in nameMap) {
  const newName = nameMap[oldName];
  // Replace only the club definitions, not player names just in case
  content = content.replace("name: " + oldName + ",", "name: " + newName + ",");
}

fs.writeFileSync('src/data/teams.ts', content, 'utf-8');
console.log("Patched club names in teams.ts");
