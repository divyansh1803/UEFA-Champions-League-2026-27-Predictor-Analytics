const fs = require('fs');
let content = fs.readFileSync('src/components/LiveMatchModal.tsx', 'utf-8');

// Also import StopCircle
content = content.replace(
  "import { X, Play, Pause, RotateCcw, FastForward, Volume2, ShieldAlert, Sparkles, Activity } from 'lucide-react';",
  "import { X, Play, Pause, RotateCcw, FastForward, Volume2, ShieldAlert, Sparkles, Activity, Square } from 'lucide-react';"
);

// We should add a small "Stop Audio" button next to play controls or in header
const controlRegex = /(<button\s*onClick=\{onClose\}\s*className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition text-slate-500 cursor-pointer">)/;
const patch = `<button
              onClick={() => {
                sound.stopGoalCelebration();
                sound.stopCrowdAmbience();
                sound.stopWhistle && sound.stopWhistle();
              }}
              title="Stop All Audio"
              className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition text-slate-500 cursor-pointer flex items-center justify-center mr-1"
            >
              <Square className="w-4 h-4 text-red-500" />
            </button>
            $1`;

content = content.replace(controlRegex, patch);

// Make sure to stop everything on close
content = content.replace(
  '  const handleFinishMatch = () => {',
  '  const handleFinishMatch = () => {\n    sound.stopGoalCelebration();'
);

content = content.replace(
  '              onFinishMatch(fixture.id, homeScore, awayScore);',
  '              sound.stopGoalCelebration();\n              onFinishMatch(fixture.id, homeScore, awayScore);'
);

// We need to intercept the main onClose to stop audio too if they close early
const onCloseRegex = /(<button\s*onClick=\{onClose\}\s*className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition text-slate-500 cursor-pointer">)/;
const closePatch = `<button
              onClick={() => {
                sound.stopGoalCelebration();
                onClose();
              }}
              className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition text-slate-500 cursor-pointer"
            >`;
// we already modified this line above, let's just make it simple

fs.writeFileSync('src/components/LiveMatchModal.tsx', content, 'utf-8');
console.log("Patched LiveMatchModal.tsx with stop button");
