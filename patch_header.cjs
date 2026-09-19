const fs = require('fs');
let content = fs.readFileSync('src/components/Header.tsx', 'utf-8');

const profileLine = `<span>LVL {userProfile.level} ({userProfile.xp} XP)</span>`;
const newProfileLine = `<span>LVL {userProfile.level} ({userProfile.xp} XP) | Rep: {userProfile.reputation || 0}</span>`;
content = content.replace(profileLine, newProfileLine);

fs.writeFileSync('src/components/Header.tsx', content, 'utf-8');
console.log("Patched Header.tsx");
