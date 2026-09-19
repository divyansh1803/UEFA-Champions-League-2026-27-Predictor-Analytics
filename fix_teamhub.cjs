const fs = require('fs');
let content = fs.readFileSync('src/components/TeamHub.tsx', 'utf-8');

// The section added earlier by the bad patch was:
// {/* Official 2026-27 UEFA Champions League Squad */} ... up to </div>              </div>            </div>

const fullSquadSectionRegex = /\{\/\* Official 2026-27 UEFA Champions League Squad \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*\{\/\* Actions \*\/\}/;

const correctStarPlayersSection = `
              {/* Star Players */}
              <div>
                <h4 className="text-xs font-black text-blue-600 dark:text-cyan-400 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <Star className="w-4 h-4" />
                  <span>Featured Players</span>
                </h4>
                <div className="space-y-2">
                  {selectedClubModal.starPlayers.map((playerName: string) => {
                    const p = INITIAL_PLAYERS.find(pl => pl.name === playerName && pl.teamId === selectedClubModal.id) || { name: playerName, position: 'FWD', rating: 85, number: 10 };
                    return (
                      <div key={playerName} className="flex items-center justify-between p-2 rounded-xl border border-slate-200 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition">
                        <div className="flex items-center space-x-3">
                          <ImageProvider name={p.name} photo={(p as any).photo} teamId={selectedClubModal.id} size="sm" position={p.position} />
                          <div>
                            <span className="font-bold text-xs text-slate-900 dark:text-white block">{p.name}</span>
                            <span className="text-[10px] text-slate-500 font-medium">{(p as any).nationality || 'EUR'} • {p.position}</span>
                          </div>
                        </div>
                        <div className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 border border-blue-100 dark:border-slate-700">
                          {(p as any).rating || 85} OVR
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Actions */}`;

content = content.replace(fullSquadSectionRegex, correctStarPlayersSection);

fs.writeFileSync('src/components/TeamHub.tsx', content, 'utf-8');
console.log("Fixed TeamHub.tsx");
