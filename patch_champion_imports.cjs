const fs = require('fs');
let content = fs.readFileSync('src/components/ChampionModal.tsx', 'utf-8');

content = content.replace(
  "import { Trophy, Award, X, Sparkles, Download, Share2 } from 'lucide-react';",
  "import { Trophy, Award, X, Sparkles, Download, Share2, Square } from 'lucide-react';"
);

fs.writeFileSync('src/components/ChampionModal.tsx', content, 'utf-8');
console.log("Patched ChampionModal imports");
