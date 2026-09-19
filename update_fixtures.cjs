const fs = require('fs');

const data = `
const officialMatches = [
  { day: 1, home: 'aek_athens', away: 'lask', date: '2026-09-08', time: '21:00', hs: 1, as: 0 },
  { day: 1, home: 'club_brugge', away: 'aston_villa', date: '2026-09-08', time: '21:00', hs: 2, as: 3 },
  { day: 1, home: 'borussia_dortmund', away: 'villarreal', date: '2026-09-08', time: '21:00', hs: 3, as: 2 },
  { day: 1, home: 'porto', away: 'manchester_city', date: '2026-09-08', time: '21:00', hs: 0, as: 2 },
  { day: 1, home: 'lille', away: 'real_betis', date: '2026-09-08', time: '21:00', hs: 2, as: 3 },
  { day: 1, home: 'real_madrid', away: 'inter', date: '2026-09-08', time: '21:00', hs: 2, as: 1 },
  { day: 1, home: 'barcelona', away: 'feyenoord', date: '2026-09-09', time: '21:00', hs: 5, as: 1 },
  { day: 1, home: 'stuttgart', away: 'viking', date: '2026-09-09', time: '21:00', hs: 3, as: 1 },
  { day: 1, home: 'liverpool', away: 'atletico_madrid', date: '2026-09-09', time: '21:00', hs: 2, as: 1 },
  { day: 1, home: 'psg', away: 'slovan_bratislava', date: '2026-09-09', time: '21:00', hs: 6, as: 1 },
  { day: 1, home: 'sporting', away: 'galatasaray', date: '2026-09-09', time: '21:00', hs: 3, as: 1 },
  { day: 1, home: 'napoli', away: 'arsenal', date: '2026-09-09', time: '21:00', hs: 0, as: 1 },
  { day: 1, home: 'fenerbahce', away: 'as_roma', date: '2026-09-10', time: '21:00', hs: 1, as: 1 },
  { day: 1, home: 'psv', away: 'shakhtar', date: '2026-09-10', time: '21:00', hs: 1, as: 1 },
  { day: 1, home: 'como', away: 'rb_leipzig', date: '2026-09-10', time: '21:00', hs: 4, as: 1 },
  { day: 1, home: 'bayern_munich', away: 'bodo_glimt', date: '2026-09-10', time: '21:00', hs: 5, as: 0 },
  { day: 1, home: 'manchester_united', away: 'sabah', date: '2026-09-10', time: '21:00', hs: 4, as: 0 },
  { day: 1, home: 'slavia_prague', away: 'rc_lens', date: '2026-09-10', time: '21:00', hs: 2, as: 3 },

  { day: 2, home: 'rc_lens', away: 'sporting', date: '2026-10-13', time: '18:45' },
  { day: 2, home: 'sabah', away: 'slavia_prague', date: '2026-10-13', time: '18:45' },
  { day: 2, home: 'arsenal', away: 'lille', date: '2026-10-13', time: '21:00' },
  { day: 2, home: 'atletico_madrid', away: 'manchester_united', date: '2026-10-13', time: '21:00' },
  { day: 2, home: 'inter', away: 'club_brugge', date: '2026-10-13', time: '21:00' },
  { day: 2, home: 'galatasaray', away: 'barcelona', date: '2026-10-13', time: '21:00' },
  { day: 2, home: 'rb_leipzig', away: 'psv', date: '2026-10-13', time: '21:00' },
  { day: 2, home: 'viking', away: 'bayern_munich', date: '2026-10-13', time: '21:00' },
  { day: 2, home: 'villarreal', away: 'napoli', date: '2026-10-13', time: '21:00' },
  { day: 2, home: 'feyenoord', away: 'como', date: '2026-10-14', time: '18:45' },
  { day: 2, home: 'lask', away: 'liverpool', date: '2026-10-14', time: '18:45' },
  { day: 2, home: 'as_roma', away: 'real_madrid', date: '2026-10-14', time: '21:00' },
  { day: 2, home: 'aston_villa', away: 'fenerbahce', date: '2026-10-14', time: '21:00' },
  { day: 2, home: 'shakhtar', away: 'aek_athens', date: '2026-10-14', time: '21:00' },
  { day: 2, home: 'bodo_glimt', away: 'borussia_dortmund', date: '2026-10-14', time: '21:00' },
  { day: 2, home: 'manchester_city', away: 'psg', date: '2026-10-14', time: '21:00' },
  { day: 2, home: 'real_betis', away: 'porto', date: '2026-10-14', time: '21:00' },
  { day: 2, home: 'slovan_bratislava', away: 'stuttgart', date: '2026-10-14', time: '21:00' },

  { day: 3, home: 'fenerbahce', away: 'slavia_prague', date: '2026-10-20', time: '18:45' },
  { day: 3, home: 'sabah', away: 'borussia_dortmund', date: '2026-10-20', time: '18:45' },
  { day: 3, home: 'as_roma', away: 'slovan_bratislava', date: '2026-10-20', time: '21:00' },
  { day: 3, home: 'porto', away: 'psv', date: '2026-10-20', time: '21:00' },
  { day: 3, home: 'liverpool', away: 'villarreal', date: '2026-10-20', time: '21:00' },
  { day: 3, home: 'manchester_city', away: 'aek_athens', date: '2026-10-20', time: '21:00' },
  { day: 3, home: 'psg', away: 'barcelona', date: '2026-10-20', time: '21:00' },
  { day: 3, home: 'napoli', away: 'bodo_glimt', date: '2026-10-20', time: '21:00' },
  { day: 3, home: 'stuttgart', away: 'atletico_madrid', date: '2026-10-20', time: '21:00' },
  { day: 3, home: 'como', away: 'manchester_united', date: '2026-10-21', time: '18:45' },
  { day: 3, home: 'lille', away: 'galatasaray', date: '2026-10-21', time: '18:45' },
  { day: 3, home: 'aston_villa', away: 'viking', date: '2026-10-21', time: '21:00' },
  { day: 3, home: 'club_brugge', away: 'rc_lens', date: '2026-10-21', time: '21:00' },
  { day: 3, home: 'bayern_munich', away: 'arsenal', date: '2026-10-21', time: '21:00' },
  { day: 3, home: 'inter', away: 'shakhtar', date: '2026-10-21', time: '21:00' },
  { day: 3, home: 'real_madrid', away: 'rb_leipzig', date: '2026-10-21', time: '21:00' },
  { day: 3, home: 'real_betis', away: 'feyenoord', date: '2026-10-21', time: '21:00' },
  { day: 3, home: 'sporting', away: 'lask', date: '2026-10-21', time: '21:00' },

  { day: 4, home: 'shakhtar', away: 'sporting', date: '2026-11-03', time: '18:45' },
  { day: 4, home: 'galatasaray', away: 'stuttgart', date: '2026-11-03', time: '18:45' },
  { day: 4, home: 'atletico_madrid', away: 'bayern_munich', date: '2026-11-03', time: '21:00' },
  { day: 4, home: 'barcelona', away: 'aston_villa', date: '2026-11-03', time: '21:00' },
  { day: 4, home: 'feyenoord', away: 'inter', date: '2026-11-03', time: '21:00' },
  { day: 4, home: 'bodo_glimt', away: 'lille', date: '2026-11-03', time: '21:00' },
  { day: 4, home: 'lask', away: 'slovan_bratislava', date: '2026-11-03', time: '21:00' },
  { day: 4, home: 'manchester_united', away: 'as_roma', date: '2026-11-03', time: '21:00' },
  { day: 4, home: 'villarreal', away: 'psg', date: '2026-11-03', time: '21:00' },
  { day: 4, home: 'aek_athens', away: 'real_madrid', date: '2026-11-04', time: '18:45' },
  { day: 4, home: 'fenerbahce', away: 'liverpool', date: '2026-11-04', time: '18:45' },
  { day: 4, home: 'borussia_dortmund', away: 'real_betis', date: '2026-11-04', time: '21:00' },
  { day: 4, home: 'porto', away: 'napoli', date: '2026-11-04', time: '21:00' },
  { day: 4, home: 'psv', away: 'club_brugge', date: '2026-11-04', time: '21:00' },
  { day: 4, home: 'rb_leipzig', away: 'manchester_city', date: '2026-11-04', time: '21:00' },
  { day: 4, home: 'rc_lens', away: 'como', date: '2026-11-04', time: '21:00' },
  { day: 4, home: 'slavia_prague', away: 'arsenal', date: '2026-11-04', time: '21:00' },
  { day: 4, home: 'viking', away: 'sabah', date: '2026-11-04', time: '21:00' },

  { day: 5, home: 'bodo_glimt', away: 'lask', date: '2026-11-24', time: '18:45' },
  { day: 5, home: 'galatasaray', away: 'aston_villa', date: '2026-11-24', time: '18:45' },
  { day: 5, home: 'arsenal', away: 'borussia_dortmund', date: '2026-11-24', time: '21:00' },
  { day: 5, home: 'como', away: 'aek_athens', date: '2026-11-24', time: '21:00' },
  { day: 5, home: 'feyenoord', away: 'porto', date: '2026-11-24', time: '21:00' },
  { day: 5, home: 'manchester_city', away: 'napoli', date: '2026-11-24', time: '21:00' },
  { day: 5, home: 'rb_leipzig', away: 'rc_lens', date: '2026-11-24', time: '21:00' },
  { day: 5, home: 'real_madrid', away: 'psv', date: '2026-11-24', time: '21:00' },
  { day: 5, home: 'slovan_bratislava', away: 'real_betis', date: '2026-11-24', time: '21:00' },
  { day: 5, home: 'sabah', away: 'barcelona', date: '2026-11-25', time: '18:45' },
  { day: 5, home: 'slavia_prague', away: 'villarreal', date: '2026-11-25', time: '18:45' },
  { day: 5, home: 'atletico_madrid', away: 'viking', date: '2026-11-25', time: '21:00' },
  { day: 5, home: 'club_brugge', away: 'liverpool', date: '2026-11-25', time: '21:00' },
  { day: 5, home: 'inter', away: 'stuttgart', date: '2026-11-25', time: '21:00' },
  { day: 5, home: 'shakhtar', away: 'fenerbahce', date: '2026-11-25', time: '21:00' },
  { day: 5, home: 'lille', away: 'bayern_munich', date: '2026-11-25', time: '21:00' },
  { day: 5, home: 'psg', away: 'as_roma', date: '2026-11-25', time: '21:00' },
  { day: 5, home: 'sporting', away: 'manchester_united', date: '2026-11-25', time: '21:00' },

  { day: 6, home: 'viking', away: 'feyenoord', date: '2026-12-08', time: '18:45' },
  { day: 6, home: 'villarreal', away: 'sabah', date: '2026-12-08', time: '18:45' },
  { day: 6, home: 'aek_athens', away: 'galatasaray', date: '2026-12-08', time: '21:00' },
  { day: 6, home: 'as_roma', away: 'sporting', date: '2026-12-08', time: '21:00' },
  { day: 6, home: 'aston_villa', away: 'psg', date: '2026-12-08', time: '21:00' },
  { day: 6, home: 'barcelona', away: 'manchester_city', date: '2026-12-08', time: '21:00' },
  { day: 6, home: 'bayern_munich', away: 'slavia_prague', date: '2026-12-08', time: '21:00' },
  { day: 6, home: 'manchester_united', away: 'rb_leipzig', date: '2026-12-08', time: '21:00' },
  { day: 6, home: 'napoli', away: 'club_brugge', date: '2026-12-08', time: '21:00' },
  { day: 6, home: 'real_betis', away: 'como', date: '2026-12-09', time: '18:45' },
  { day: 6, home: 'slovan_bratislava', away: 'shakhtar', date: '2026-12-09', time: '18:45' },
  { day: 6, home: 'arsenal', away: 'real_madrid', date: '2026-12-09', time: '21:00' },
  { day: 6, home: 'borussia_dortmund', away: 'inter', date: '2026-12-09', time: '21:00' },
  { day: 6, home: 'lask', away: 'fenerbahce', date: '2026-12-09', time: '21:00' },
  { day: 6, home: 'liverpool', away: 'porto', date: '2026-12-09', time: '21:00' },
  { day: 6, home: 'psv', away: 'atletico_madrid', date: '2026-12-09', time: '21:00' },
  { day: 6, home: 'rc_lens', away: 'bodo_glimt', date: '2026-12-09', time: '21:00' },
  { day: 6, home: 'stuttgart', away: 'lille', date: '2026-12-09', time: '21:00' },

  { day: 7, home: 'bodo_glimt', away: 'atletico_madrid', date: '2027-01-19', time: '18:45' },
  { day: 7, home: 'galatasaray', away: 'feyenoord', date: '2027-01-19', time: '18:45' },
  { day: 7, home: 'aek_athens', away: 'as_roma', date: '2027-01-19', time: '21:00' },
  { day: 7, home: 'aston_villa', away: 'borussia_dortmund', date: '2027-01-19', time: '21:00' },
  { day: 7, home: 'inter', away: 'liverpool', date: '2027-01-19', time: '21:00' },
  { day: 7, home: 'porto', away: 'slavia_prague', date: '2027-01-19', time: '21:00' },
  { day: 7, home: 'lille', away: 'slovan_bratislava', date: '2027-01-19', time: '21:00' },
  { day: 7, home: 'real_madrid', away: 'lask', date: '2027-01-19', time: '21:00' },
  { day: 7, home: 'stuttgart', away: 'club_brugge', date: '2027-01-19', time: '21:00' },
  { day: 7, home: 'fenerbahce', away: 'villarreal', date: '2027-01-20', time: '18:45' },
  { day: 7, home: 'sabah', away: 'napoli', date: '2027-01-20', time: '18:45' },
  { day: 7, home: 'como', away: 'psg', date: '2027-01-20', time: '21:00' },
  { day: 7, home: 'manchester_united', away: 'bayern_munich', date: '2027-01-20', time: '21:00' },
  { day: 7, home: 'rb_leipzig', away: 'shakhtar', date: '2027-01-20', time: '21:00' },
  { day: 7, home: 'rc_lens', away: 'manchester_city', date: '2027-01-20', time: '21:00' },
  { day: 7, home: 'real_betis', away: 'arsenal', date: '2027-01-20', time: '21:00' },
  { day: 7, home: 'sporting', away: 'barcelona', date: '2027-01-20', time: '21:00' },
  { day: 7, home: 'viking', away: 'psv', date: '2027-01-20', time: '21:00' },

  { day: 8, home: 'arsenal', away: 'sabah', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'as_roma', away: 'lille', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'atletico_madrid', away: 'fenerbahce', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'borussia_dortmund', away: 'aek_athens', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'club_brugge', away: 'bodo_glimt', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'bayern_munich', away: 'real_betis', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'barcelona', away: 'como', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'shakhtar', away: 'real_madrid', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'feyenoord', away: 'rb_leipzig', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'lask', away: 'porto', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'liverpool', away: 'rc_lens', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'manchester_city', away: 'sporting', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'psg', away: 'galatasaray', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'psv', away: 'stuttgart', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'slavia_prague', away: 'aston_villa', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'napoli', away: 'viking', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'villarreal', away: 'manchester_united', date: '2027-01-27', time: '21:00' },
  { day: 8, home: 'slovan_bratislava', away: 'inter', date: '2027-01-27', time: '21:00' },
];

export function generateInitialFixtures(): Fixture[] {
  const fixtures: Fixture[] = [];
  
  officialMatches.forEach((m, idx) => {
    const homeClub = CLUBS.find(c => c.id === m.home);
    const awayClub = CLUBS.find(c => c.id === m.away);
    
    if (!homeClub || !awayClub) {
       console.warn("Could not find clubs for match:", m);
       return;
    }
    
    fixtures.push({
      id: \`f\${idx + 1}\`,
      matchday: m.day,
      homeTeamId: m.home,
      awayTeamId: m.away,
      homeScore: m.hs !== undefined ? m.hs : null,
      awayScore: m.as !== undefined ? m.as : null,
      played: m.hs !== undefined,
      date: m.date,
      time: m.time,
      stadium: homeClub.stadium,
      referee: REFEREES[idx % REFEREES.length],
      attendance: Math.floor(homeClub.capacity * (0.7 + Math.random() * 0.3)),
      weather: WEATHER_CONDITIONS[idx % WEATHER_CONDITIONS.length],
      stats: {
        xG: [0, 0],
        possession: [50, 50],
        shots: [0, 0],
        shotsOnTarget: [0, 0],
        corners: [0, 0],
        fouls: [0, 0],
        yellowCards: [0, 0],
        redCards: [0, 0],
        passAccuracy: [0, 0],
        winProb: [0.33, 0.34, 0.33]
      }
    });
  });
  
  return fixtures;
}
`;

let content = fs.readFileSync('src/utils/simulation.ts', 'utf-8');
const generateRegex = /export function generateInitialFixtures\(\): Fixture\[\] \{[\s\S]*?(?=export function calculateLeagueTable)/;

content = content.replace(generateRegex, data);

fs.writeFileSync('src/utils/simulation.ts', content, 'utf-8');
console.log("Updated generateInitialFixtures with official schedule.");
