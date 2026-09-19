const fs = require('fs');
let content = fs.readFileSync('src/components/LiveMatchModal.tsx', 'utf-8');

content = content.replace(/sound\.stopCrowdAmbience\(\);/g, 'sound.stopCrowdAmbience(); sound.stopVictorySong();');

fs.writeFileSync('src/components/LiveMatchModal.tsx', content, 'utf-8');
console.log("Patched LiveMatchModal.tsx stop triggers to include victory song");
