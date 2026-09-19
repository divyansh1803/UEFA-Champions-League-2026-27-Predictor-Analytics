const fs = require('fs');

let content = fs.readFileSync('src/components/LiveMatchModal.tsx', 'utf-8');

// Add states for commentary
content = content.replace(
  /const \[isPlaying, setIsPlaying\] = useState\(false\);/,
  "const [isPlaying, setIsPlaying] = useState(false);\n  const [commentary, setCommentary] = useState<string | null>(null);\n  const [isGeneratingCommentary, setIsGeneratingCommentary] = useState(false);"
);

// Function to fetch commentary
const fetchCommentary = `
  const fetchCommentary = async (ev: MatchEvent) => {
    setIsGeneratingCommentary(true);
    try {
      const res = await fetch('/api/commentary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          homeTeam: home.name,
          awayTeam: away.name,
          minute: ev.minute,
          event: ev.type,
          player: ev.player
        })
      });
      const data = await res.json();
      if (data.commentary) {
        setCommentary(data.commentary);
      }
    } catch (e) {
      console.error(e);
    }
    setIsGeneratingCommentary(false);
  };
`;
content = content.replace(/useEffect\(\(\) => \{/, fetchCommentary + "\n  useEffect(() => {");

// Trigger commentary on new event
const eventTrigger = `
        setEvents(prev => [newEvent, ...prev]);
        if (newEvent.type === 'GOAL') {
          sound.playGoalCelebration();
          setGoalCelebration({ teamId: scoringTeam.id, scorer: newEvent.player });
          setTimeout(() => setGoalCelebration(null), 3000);
        }
        fetchCommentary(newEvent);
`;
content = content.replace(
  /setEvents\(prev => \[newEvent, \.\.\.prev\]\);\n\s*if \(newEvent\.type === 'GOAL'\) \{\n\s*sound\.playGoalCelebration\(\);\n\s*setGoalCelebration\(\{ teamId: scoringTeam\.id, scorer: newEvent\.player \}\);\n\s*setTimeout\(\(\) => setGoalCelebration\(null\), 3000\);\n\s*\}/,
  eventTrigger
);

// Display commentary
const commentaryUI = `
            {/* Live AI Commentary */}
            {(commentary || isGeneratingCommentary) && (
              <div className="mt-4 p-4 rounded-xl border bg-blue-500/10 border-blue-500/30 flex items-start space-x-3">
                <div className="mt-1">
                  {isGeneratingCommentary ? (
                    <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Volume2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-1">Live AI Commentary</div>
                  <div className="text-sm italic font-medium">{isGeneratingCommentary ? 'Listening to the booth...' : \`"\${commentary}"\`}</div>
                </div>
              </div>
            )}
            
            {/* Event Log */}
`;
content = content.replace(/\{\/\* Event Log \*\/\}/, commentaryUI);

// Import Volume2 if not imported
if (!content.includes('Volume2')) {
  content = content.replace(/import \{ ([^}]+) \} from 'lucide-react';/, "import { $1, Volume2 } from 'lucide-react';");
}

fs.writeFileSync('src/components/LiveMatchModal.tsx', content, 'utf-8');
console.log("Patched LiveMatchModal.tsx for Gemini AI Commentary");
