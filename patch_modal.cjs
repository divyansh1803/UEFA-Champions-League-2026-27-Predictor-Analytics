const fs = require('fs');
let content = fs.readFileSync('src/components/ChampionModal.tsx', 'utf-8');

content = content.replace(
    'sound.playGoalCelebration();\n      sound.playAnthemFanfare();',
    'sound.playVictorySong();'
);

fs.writeFileSync('src/components/ChampionModal.tsx', content, 'utf-8');
console.log("Updated ChampionModal.tsx");
