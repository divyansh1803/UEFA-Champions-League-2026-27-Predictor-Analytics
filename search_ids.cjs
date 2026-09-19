const https = require('https');

// Just some fallback known IDs
const known = {
  "William Saliba": "https://cdn.sofifa.net/players/243/715/24_120.png",
  "Bukayo Saka": "https://cdn.sofifa.net/players/246/669/24_120.png",
  "Martin Odegaard": "https://cdn.sofifa.net/players/222/665/24_120.png",
  "David Raya": "https://cdn.sofifa.net/players/221/371/24_120.png", // Raya
  "Kepa Arrizabalaga": "https://cdn.sofifa.net/players/206/585/24_120.png", // Kepa
  "Cristhian Mosquera": "https://cdn.sofifa.net/players/265/589/24_120.png",
  "Gabriel": "https://cdn.sofifa.net/players/234/960/24_120.png", // Gabriel Magalhaes
  "Viktor Gyokeres": "https://cdn.sofifa.net/players/239/301/24_120.png", // Gyokeres
  "Eberechi Eze": "https://cdn.sofifa.net/players/239/081/24_120.png", // Eze
  "Noni Madueke": "https://cdn.sofifa.net/players/253/826/24_120.png" // Madueke
};

console.log(JSON.stringify(known, null, 2));
