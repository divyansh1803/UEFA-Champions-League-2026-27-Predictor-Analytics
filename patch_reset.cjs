const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldReset = `  const handleResetTournament = () => {
    if (window.confirm('Reset all match predictions and tournament state back to default?')) {
      localStorage.removeItem('ucl_2026_fixtures');
      localStorage.removeItem('ucl_2026_knockout');
      const freshFixtures = generateInitialFixtures();
      setFixtures(freshFixtures);
      const freshTable = calculateLeagueTable(freshFixtures);
      setKnockoutMatches(initializeKnockoutFromTable(freshTable));
      sound.playWhistle();
    }
  };`;

const newReset = `  const handleResetTournament = () => {
    localStorage.removeItem('ucl_2026_fixtures');
    localStorage.removeItem('ucl_2026_knockout');
    const freshFixtures = generateInitialFixtures();
    setFixtures(freshFixtures);
    const freshTable = calculateLeagueTable(freshFixtures);
    setKnockoutMatches(initializeKnockoutFromTable(freshTable));
    sound.playWhistle();
  };`;

content = content.replace(oldReset, newReset);
fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Patched Reset Button in App.tsx");
