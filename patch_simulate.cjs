const fs = require('fs');

let content = fs.readFileSync('src/utils/simulation.ts', 'utf-8');

const simulateFunc = `
export function simulateFixtureScore(home: Club, away: Club): [number, number] {
  const homeAdvantage = 1.1;
  const homePower = ((home.ratings.att * 0.5) + (home.ratings.mid * 0.3) + (home.ratings.def * 0.2)) * homeAdvantage;
  const awayPower = (away.ratings.att * 0.5) + (away.ratings.mid * 0.3) + (away.ratings.def * 0.2);

  const totalPower = homePower + awayPower;
  const homeProb = homePower / totalPower;

  const baseGoals = 2.5 + (Math.random() * 1.5 - 0.75);
  
  let homeGoals = Math.round(baseGoals * homeProb + (Math.random() - 0.5));
  let awayGoals = Math.round(baseGoals * (1 - homeProb) + (Math.random() - 0.5));

  homeGoals = Math.max(0, homeGoals);
  awayGoals = Math.max(0, awayGoals);

  if (Math.random() < 0.1) homeGoals += Math.floor(Math.random() * 2) + 1;
  if (Math.random() < 0.08) awayGoals += Math.floor(Math.random() * 2) + 1;

  return [homeGoals, awayGoals];
}

export function calculateLeagueTable`;

content = content.replace("export function calculateLeagueTable", simulateFunc);

fs.writeFileSync('src/utils/simulation.ts', content, 'utf-8');
console.log("Restored simulateFixtureScore");
