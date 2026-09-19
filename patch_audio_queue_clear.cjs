const fs = require('fs');
let content = fs.readFileSync('src/utils/audio.ts', 'utf-8');

// Stop Goal Celebration should clear queue
content = content.replace(
  '  public stopGoalCelebration() {',
  '  public stopGoalCelebration() {\n    this.clearQueue();'
);

// Master disable should clear queue
content = content.replace(
  '  public setMasterEnabled(val: boolean) {\n    this.enabled = val;\n    if (!val) {',
  '  public setMasterEnabled(val: boolean) {\n    this.enabled = val;\n    if (!val) {\n      this.clearQueue();'
);

fs.writeFileSync('src/utils/audio.ts', content, 'utf-8');
console.log("Patched audio queue clears");
