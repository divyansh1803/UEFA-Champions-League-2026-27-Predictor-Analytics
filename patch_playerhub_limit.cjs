const fs = require('fs');

let content = fs.readFileSync('src/components/PlayerHub.tsx', 'utf-8');

// Find where sortedPlayers is defined
content = content.replace(
  /const sortedPlayers = players\s*\.filter/,
  'const filteredPlayers = players.filter'
);

content = content.replace(
  /return bValue - aValue;\n\s*\}/,
  'return bValue - aValue;\n    });\n  const sortedPlayers = filteredPlayers.slice(0, 50); // LIMIT DOM RENDER FOR SPEED'
);

fs.writeFileSync('src/components/PlayerHub.tsx', content, 'utf-8');
console.log("Patched PlayerHub to limit DOM nodes");
