const https = require('https');
const validIds = [];
let pending = 0;
let checked = 0;

function checkId(idStr) {
  return new Promise((resolve) => {
    const p1 = idStr.substring(0, 3);
    const p2 = idStr.substring(3);
    const options = {
      hostname: 'cdn.sofifa.net',
      path: `/players/${p1}/${p2}/24_120.png`,
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://sofifa.com/'
      }
    };
    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        validIds.push(idStr);
      }
      resolve();
    });
    req.on('error', () => resolve());
    req.end();
  });
}

async function run() {
  console.log("Starting...");
  const start = 250000;
  const end = 252000;
  
  // run in chunks of 50
  for (let i = start; i < end; i += 50) {
    const promises = [];
    for (let j = 0; j < 50; j++) {
      if (i + j < end) {
        promises.push(checkId((i + j).toString()));
      }
    }
    await Promise.all(promises);
    process.stdout.write(`Checked ${i + 50 - start} / ${end - start}\r`);
  }
  
  console.log(`\nFound ${validIds.length} valid IDs.`);
  const fs = require('fs');
  fs.writeFileSync('valid_ids.json', JSON.stringify(validIds));
}
run();
