const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Update activeTab definition
content = content.replace(
  /const \[activeTab, setActiveTab\] = useState<'table' \| 'fixtures' \| 'knockout' \| 'teams' \| 'players' \| 'special'>\('table'\);/,
  "const [activeTab, setActiveTab] = useState<'table' | 'fixtures' | 'knockout' | 'teams' | 'players' | 'analytics' | 'fantasy' | 'special'>('table');"
);

// Add imports
const imports = `
import { AnalyticsHub } from './components/AnalyticsHub';
import { FantasyDraft } from './components/FantasyDraft';
`;
content = content.replace(/import { SpecialModesModal } from '\.\/components\/SpecialModesModal';/, "import { SpecialModesModal } from './components/SpecialModesModal';\n" + imports);

// Add components rendering
const newComponents = `
        {activeTab === 'analytics' && (
          <AnalyticsHub clubs={CLUBS} darkMode={darkMode} />
        )}

        {activeTab === 'fantasy' && (
          <FantasyDraft players={INITIAL_PLAYERS} clubs={CLUBS} darkMode={darkMode} />
        )}

        {activeTab === 'special' && (
`;
content = content.replace(/\{\s*activeTab === 'special' && \(/, newComponents);

fs.writeFileSync('src/App.tsx', content, 'utf-8');

// Also update Header.tsx
let header = fs.readFileSync('src/components/Header.tsx', 'utf-8');
header = header.replace(
  /activeTab: 'table' \| 'fixtures' \| 'knockout' \| 'teams' \| 'players' \| 'special';\n\s*setActiveTab: \(tab: 'table' \| 'fixtures' \| 'knockout' \| 'teams' \| 'players' \| 'special'\) => void;/,
  "activeTab: 'table' | 'fixtures' | 'knockout' | 'teams' | 'players' | 'analytics' | 'fantasy' | 'special';\n  setActiveTab: (tab: 'table' | 'fixtures' | 'knockout' | 'teams' | 'players' | 'analytics' | 'fantasy' | 'special') => void;"
);

// Add the buttons to the nav
const newButtons = `
          <button
            onClick={() => { sound.playClick(); setActiveTab('analytics'); }}
            className={\`px-3.5 py-1.5 rounded-xl transition flex items-center space-x-1.5 whitespace-nowrap cursor-pointer \${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
            }\`}
          >
            <span>Analytics</span>
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('fantasy'); }}
            className={\`px-3.5 py-1.5 rounded-xl transition flex items-center space-x-1.5 whitespace-nowrap cursor-pointer \${
              activeTab === 'fantasy'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
            }\`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fantasy</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('special'); }}
`;
header = header.replace(/<button\n\s*onClick=\{\(\) => \{ sound.playClick\(\); setActiveTab\('special'\); \}\}/, newButtons);

fs.writeFileSync('src/components/Header.tsx', header, 'utf-8');

console.log("Patched App.tsx and Header.tsx for new tabs");
