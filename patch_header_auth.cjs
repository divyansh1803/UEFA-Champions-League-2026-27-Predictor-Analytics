const fs = require('fs');

let content = fs.readFileSync('src/components/Header.tsx', 'utf-8');

// Add props
content = content.replace(
  /onOpenComparison: \(\) => void;\n\}/,
  "onOpenComparison: () => void;\n  currentUser?: any;\n  onLogin?: () => void;\n  onLogout?: () => void;\n}"
);

// Destructure
content = content.replace(
  /onOpenComparison\n\}/,
  "onOpenComparison,\n  currentUser,\n  onLogin,\n  onLogout\n}"
);

// Add UI
const authUI = `
          {currentUser ? (
            <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-800 rounded-full pr-4 p-1 border border-slate-200 dark:border-slate-700">
              <img src={currentUser.photoURL || 'https://ui-avatars.com/api/?name=User'} alt="Avatar" className="w-8 h-8 rounded-full" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Cloud Sync Active</span>
                <span className="text-xs font-bold leading-none">{currentUser.displayName?.split(' ')[0]}</span>
              </div>
              <button onClick={onLogout} className="ml-2 p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition" title="Sign Out">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-md shadow-blue-500/20"
            >
              <Cloud className="w-4 h-4" />
              <span>Sign In to Save</span>
            </button>
          )}

          <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
`;

content = content.replace(/<div className="w-px h-8 bg-slate-200 dark:bg-slate-800 hidden md:block"><\/div>/, authUI);

if (!content.includes('Cloud')) {
  content = content.replace(/import \{ ([^}]+) \} from 'lucide-react';/, "import { $1, Cloud } from 'lucide-react';");
}

fs.writeFileSync('src/components/Header.tsx', content, 'utf-8');
console.log("Patched Header.tsx for Auth");
