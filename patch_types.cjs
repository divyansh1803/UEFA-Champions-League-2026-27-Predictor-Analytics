const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf-8');

if (!content.includes('reputation?: number;')) {
  content = content.replace(
    'level: number;',
    'level: number;\n  reputation?: number;'
  );
  fs.writeFileSync('src/types.ts', content, 'utf-8');
  console.log("Updated types.ts");
} else {
  console.log("Already updated types.ts");
}
