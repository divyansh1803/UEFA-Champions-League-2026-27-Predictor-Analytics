const fs = require('fs');
let content = fs.readFileSync('src/components/LiveMatchModal.tsx', 'utf-8');

// The control header has an onClose button, let's inject stop audio in the original button call
content = content.replace(/<button\s*onClick=\{onClose\}\s*/g, '<button onClick={() => { sound.stopGoalCelebration(); sound.stopCrowdAmbience(); onClose(); }} ');

fs.writeFileSync('src/components/LiveMatchModal.tsx', content, 'utf-8');
console.log("Patched LiveMatchModal.tsx with stop on close");
