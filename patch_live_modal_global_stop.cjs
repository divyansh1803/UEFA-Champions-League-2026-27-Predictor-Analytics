const fs = require('fs');
let content = fs.readFileSync('src/components/LiveMatchModal.tsx', 'utf-8');

const closeButtonRegex = /(<button onClick=\{\(\) => \{ sound\.stopGoalCelebration\(\); sound\.stopCrowdAmbience\(\); onClose\(\); \}\}[\s\S]*?<\/button>)/;

const stopAudioOnlyButton = `
            <button
              onClick={() => {
                sound.stopGoalCelebration();
                sound.stopCrowdAmbience();
              }}
              title="Stop All Match Audio"
              className="p-1.5 rounded-xl border border-red-500/50 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white transition flex items-center justify-center mr-1"
            >
              <Square className="w-4 h-4" />
            </button>
`;

content = content.replace(closeButtonRegex, stopAudioOnlyButton + '$1');

fs.writeFileSync('src/components/LiveMatchModal.tsx', content, 'utf-8');
console.log("Patched LiveMatchModal.tsx global stop");
