const fs = require('fs');
const data = fs.readFileSync('src/data/teams.ts', 'utf-8');
const regex = /id:\s*'liverpool',[\s\S]{1,600}?starPlayers:\s*\[(.*?)\]/g;
const match = regex.exec(data);
console.log(match ? match[1] : 'not found');
