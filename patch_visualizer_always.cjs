const fs = require('fs');
let content = fs.readFileSync('src/components/Header.tsx', 'utf-8');

const audioSettingsRegex2 = /\{crowdActive \? <SoundVisualizer active=\{true\} \/> : <Sliders className="w-3\.5 h-3\.5" \/>\}/;
const audioSettingsReplacement2 = `<SoundVisualizer active={audioSettings.masterEnabled && (anthemPlaying || crowdActive)} />`;
content = content.replace(audioSettingsRegex2, audioSettingsReplacement2);

fs.writeFileSync('src/components/Header.tsx', content, 'utf-8');
console.log("Patched audio settings to always show visualizer");
