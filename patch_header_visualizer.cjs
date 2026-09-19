const fs = require('fs');
let content = fs.readFileSync('src/components/Header.tsx', 'utf-8');

// 1. Add SoundVisualizer component
const visualizerCode = `
const SoundVisualizer = ({ active }: { active: boolean }) => (
  <>
    <style>{\`
      @keyframes sound-wave {
        0%, 100% { transform: scaleY(0.3); }
        50% { transform: scaleY(1.0); }
      }
      .wave-1 { animation: sound-wave 0.8s ease-in-out infinite; }
      .wave-2 { animation: sound-wave 1.1s ease-in-out infinite -0.3s; }
      .wave-3 { animation: sound-wave 0.9s ease-in-out infinite -0.5s; }
    \`}</style>
    <div className="flex items-center justify-center space-x-[2px] h-3.5 w-3.5">
      <div className={\`w-[2.5px] bg-current rounded-full transition-all duration-300 origin-center \${active ? 'wave-1 h-[90%]' : 'h-[3px]'}\`} />
      <div className={\`w-[2.5px] bg-current rounded-full transition-all duration-300 origin-center \${active ? 'wave-2 h-full' : 'h-[3px]'}\`} />
      <div className={\`w-[2.5px] bg-current rounded-full transition-all duration-300 origin-center \${active ? 'wave-3 h-[70%]' : 'h-[3px]'}\`} />
    </div>
  </>
);

export const Header: React.FC<HeaderProps> = ({
`;

content = content.replace('export const Header: React.FC<HeaderProps> = ({', visualizerCode);

// 2. Replace Anthem button icon
const anthemRegex = /<Music className="w-3\.5 h-3\.5" \/>\s*<span>\{anthemPlaying \? 'Anthem Playing\.\.\.' : 'Anthem'\}<\/span>/;
const anthemReplacement = `{anthemPlaying ? <SoundVisualizer active={true} /> : <Music className="w-3.5 h-3.5" />}\n            <span>{anthemPlaying ? 'Anthem Playing...' : 'Anthem'}</span>`;
content = content.replace(anthemRegex, anthemReplacement);
// Remove animate-pulse from Anthem active class so the wave stands out
content = content.replace('bg-amber-500 text-slate-950 border-amber-400 animate-pulse shadow-md font-black', 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black');


// 3. Replace Audio Settings button icon and remove the pinging dot
const audioSettingsRegex = /<Sliders className="w-3\.5 h-3\.5" \/>\s*<span>Audio Settings<\/span>\s*\{crowdActive && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"><\/span>\}/;
const audioSettingsReplacement = `{crowdActive ? <SoundVisualizer active={true} /> : <Sliders className="w-3.5 h-3.5" />}\n            <span>Audio Settings</span>`;
content = content.replace(audioSettingsRegex, audioSettingsReplacement);

// 4. Update the Stop Audio button to be the visualizer in "paused" mode if it wasn't there, but actually "Stop Audio" has a Square. We can leave Stop Audio as Square.

fs.writeFileSync('src/components/Header.tsx', content, 'utf-8');
console.log("Patched Header with visualizer");
