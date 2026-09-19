const fs = require('fs');
let content = fs.readFileSync('src/components/TeamHub.tsx', 'utf-8');

// Add import
content = content.replace(
  "import { Search, Trophy, MapPin, Users, User, Shield, Star, Award, Compass, X } from 'lucide-react';",
  "import { Search, Trophy, MapPin, Users, User, Shield, Star, Award, Compass, X } from 'lucide-react';\nimport { INITIAL_PLAYERS } from '../data/teams';"
);

// Add grouped players logic
const getPlayersLogic = `
  const teamPlayers = selectedClubModal ? INITIAL_PLAYERS.filter(p => p.teamId === selectedClubModal.id) : [];
  const gks = teamPlayers.filter(p => p.position === 'GK').sort((a, b) => (a.number || 99) - (b.number || 99));
  const defs = teamPlayers.filter(p => p.position === 'DEF').sort((a, b) => (a.number || 99) - (b.number || 99));
  const mids = teamPlayers.filter(p => p.position === 'MID').sort((a, b) => (a.number || 99) - (b.number || 99));
  const fwds = teamPlayers.filter(p => p.position === 'FWD').sort((a, b) => (a.number || 99) - (b.number || 99));

  const renderPlayerRow = (p: any) => (
    <div key={p.id} className="flex items-center justify-between p-2 rounded-xl border border-slate-200 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition">
      <div className="flex items-center space-x-3">
        <span className="text-slate-400 font-mono font-bold text-[10px] w-4 text-center">{p.number || '-'}</span>
        <PlayerPhoto name={p.name} photo={p.photo} size="sm" position={p.position} />
        <div>
          <span className="font-bold text-xs text-slate-900 dark:text-white block">{p.name}</span>
          <span className="text-[10px] text-slate-500">{p.nationality || 'EUR'}</span>
        </div>
      </div>
      <div className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 border border-blue-100 dark:border-slate-700">
        {p.rating} OVR
      </div>
    </div>
  );
`;

content = content.replace(
  "export const TeamHub: React.FC<TeamHubProps> = ({",
  "export const TeamHub: React.FC<TeamHubProps> = ({\n"
);
content = content.replace(
  "  const [searchQuery, setSearchQuery] = useState('');",
  "  const [searchQuery, setSearchQuery] = useState('');\n" + getPlayersLogic
);

// Replace Featured Star Players with Full Squad
const starPlayersRegex = /\{\/\* Star Players \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const fullSquadSection = `{/* Official 2026-27 UEFA Champions League Squad */}
              <div>
                <h4 className="text-xs font-black text-blue-600 dark:text-cyan-400 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <Users className="w-4 h-4" />
                  <span>Official 2026/27 Squad</span>
                </h4>
                
                <div className="space-y-4">
                  {/* Coach */}
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 border-b border-slate-100 dark:border-slate-800 pb-1">Coach</h5>
                    <div className="flex items-center justify-between p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-blue-50/50 dark:bg-slate-900/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                          <User className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white">{selectedClubModal.manager}</span>
                      </div>
                    </div>
                  </div>

                  {/* Goalkeepers */}
                  {gks.length > 0 && (
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 border-b border-slate-100 dark:border-slate-800 pb-1">Goalkeepers</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {gks.map(renderPlayerRow)}
                      </div>
                    </div>
                  )}

                  {/* Defenders */}
                  {defs.length > 0 && (
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 border-b border-slate-100 dark:border-slate-800 pb-1">Defenders</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {defs.map(renderPlayerRow)}
                      </div>
                    </div>
                  )}

                  {/* Midfielders */}
                  {mids.length > 0 && (
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 border-b border-slate-100 dark:border-slate-800 pb-1">Midfielders</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {mids.map(renderPlayerRow)}
                      </div>
                    </div>
                  )}

                  {/* Forwards */}
                  {fwds.length > 0 && (
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 border-b border-slate-100 dark:border-slate-800 pb-1">Forwards</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {fwds.map(renderPlayerRow)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>`;

content = content.replace(starPlayersRegex, fullSquadSection);

fs.writeFileSync('src/components/TeamHub.tsx', content, 'utf-8');
console.log("Patched TeamHub squads");
