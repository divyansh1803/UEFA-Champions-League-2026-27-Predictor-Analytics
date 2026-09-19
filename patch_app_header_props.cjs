const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  /onOpenComparison=\{\(\) => setShowComparison\(true\)\}/,
  "onOpenComparison={() => setShowComparison(true)}\n          currentUser={currentUser}\n          onLogin={login}\n          onLogout={logout}"
);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Patched App.tsx Header props");
