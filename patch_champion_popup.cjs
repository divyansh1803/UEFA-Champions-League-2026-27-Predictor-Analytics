const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldEffect = `  // Trigger Champion Modal automatically when final is first won
  useEffect(() => {
    if (champion) {
      setIsChampionModalOpen(true);
    }
  }, [champion?.id]);`;

const newEffect = `  // Trigger Champion Modal only when newly won during the session (not on reload)
  const initialChampionId = useRef(champion?.id || null);
  useEffect(() => {
    if (champion && champion.id !== initialChampionId.current) {
      setIsChampionModalOpen(true);
      initialChampionId.current = champion.id;
    }
  }, [champion]);`;

content = content.replace(oldEffect, newEffect);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Patched Champion Modal popup");
