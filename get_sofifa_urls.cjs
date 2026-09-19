const https = require('https');

const players = [
  "David Raya",
  "Kepa Arrizabalaga",
  "William Saliba",
  "Cristhian Mosquera",
  "Gabriel Magalhães",
  "Bukayo Saka",
  "Martin Odegaard",
  "Viktor Gyökeres",
  "Eberechi Eze",
  "Noni Madueke"
];

function search(name) {
  return new Promise((resolve) => {
    https.get(`https://sofifa.com/players?keyword=${encodeURIComponent(name)}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/data-src="(https:\/\/cdn\.sofifa\.net\/players\/[^"]+\.png)"/);
        if (match) {
          resolve({name, url: match[1]});
        } else {
          resolve({name, url: "NOT FOUND"});
        }
      });
    }).on('error', () => resolve({name, url: "ERROR"}));
  });
}

async function main() {
  for (const p of players) {
    const res = await search(p);
    console.log(res.name + ": " + res.url);
  }
}

main();
