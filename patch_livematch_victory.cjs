const fs = require('fs');
let content = fs.readFileSync('src/components/LiveMatchModal.tsx', 'utf-8');

// We can add a useEffect that fires when minute reaches 90.
const useEff = `
  useEffect(() => {
    if (minute === 90) {
      if (homeScore !== awayScore) {
        setTimeout(() => {
          sound.playVictorySong();
        }, 1500); // Play after whistle
      }
    }
  }, [minute, homeScore, awayScore]);

  // Main match simulation tick loop`;

content = content.replace('  // Main match simulation tick loop', useEff);

fs.writeFileSync('src/components/LiveMatchModal.tsx', content, 'utf-8');
console.log("Patched LiveMatchModal.tsx victory song");
