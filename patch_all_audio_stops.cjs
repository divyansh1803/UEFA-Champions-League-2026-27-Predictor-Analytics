const fs = require('fs');

// 1. Fix Header.tsx (Remove setTimeout and add Stop All Audio button)
let headerContent = fs.readFileSync('src/components/Header.tsx', 'utf-8');
headerContent = headerContent.replace(
  'setTimeout(() => setAnthemPlaying(false), 6200);',
  '// No automatic reset for Anthem'
);

// We should also add a global stop all sounds button
headerContent = headerContent.replace(
  "import { Trophy, Shield, Settings, RotateCcw, Download, Upload, Info, HelpCircle, Compass, Award, Music } from 'lucide-react';",
  "import { Trophy, Shield, Settings, RotateCcw, Download, Upload, Info, HelpCircle, Compass, Award, Music, Square } from 'lucide-react';"
);

// Add the global Stop All button next to the Anthem button
const anthemButtonRegex = /(<button\s*onClick=\{handlePlayAnthemTest\}[\s\S]*?<\/button>)/;
const globalStopButton = `
          {/* Global Mute / Stop All Audio */}
          <button
            onClick={() => {
              sound.stopAnthem();
              sound.stopCrowdAmbience();
              sound.stopGoalCelebration();
              sound.stopVictorySong();
              setAnthemPlaying(false);
              setCrowdActive(false);
            }}
            title="Stop All Audio Immediately"
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center space-x-1.5 cursor-pointer bg-red-500 hover:bg-red-600 border-red-600 text-white shadow-md"
          >
            <Square className="w-3.5 h-3.5 fill-white" />
            <span>Stop Audio</span>
          </button>
`;
headerContent = headerContent.replace(anthemButtonRegex, '$1' + globalStopButton);
fs.writeFileSync('src/components/Header.tsx', headerContent, 'utf-8');


// 2. Fix ChampionModal.tsx (Actually wrap onClose)
let champContent = fs.readFileSync('src/components/ChampionModal.tsx', 'utf-8');
champContent = champContent.replace(/onClick=\{onClose\}/g, "onClick={() => { sound.stopVictorySong(); onClose(); }}");
// Also add the clear Stop Audio button to the footer
const closeButtonRegex = /(<button\s*onClick=\{\(\) => \{ sound\.stopVictorySong\(\); onClose\(\); \}\}\s*className="px-5 py-2\.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition cursor-pointer"\s*>[\s\S]*?<\/button>)/;
const stopAudioButtonForChamp = `<button
            onClick={() => { sound.stopVictorySong(); onClose(); }}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-md transition cursor-pointer flex items-center space-x-1"
          >
            <Square className="w-4 h-4 fill-white" />
            <span>Stop Audio & Close</span>
          </button>`;
champContent = champContent.replace(closeButtonRegex, stopAudioButtonForChamp);
fs.writeFileSync('src/components/ChampionModal.tsx', champContent, 'utf-8');

console.log("Patched all audio stops!");
