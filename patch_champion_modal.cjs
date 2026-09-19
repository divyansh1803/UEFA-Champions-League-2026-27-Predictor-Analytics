const fs = require('fs');
let content = fs.readFileSync('src/components/ChampionModal.tsx', 'utf-8');

// Stop the victory song when modal is closed
content = content.replace(
  '  const handleClose = () => {',
  '  const handleClose = () => {\n    sound.stopVictorySong();'
);

// Check if we need to add a manual stop button inside the modal
const buttonCode = `            <button
              onClick={handleClose}
              className="mt-6 w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold transition shadow-lg shadow-blue-600/30 text-lg cursor-pointer flex items-center justify-center space-x-2"
            >
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Conclude Tournament & Stop Audio</span>
            </button>`;

content = content.replace(/            <button\s*onClick=\{handleClose\}[\s\S]*?<\/button>/, buttonCode);

fs.writeFileSync('src/components/ChampionModal.tsx', content, 'utf-8');
console.log("Patched ChampionModal.tsx");
