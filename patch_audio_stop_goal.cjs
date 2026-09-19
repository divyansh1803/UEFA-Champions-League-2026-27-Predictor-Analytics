const fs = require('fs');
let content = fs.readFileSync('src/utils/audio.ts', 'utf-8');

// Add stopGoalCelebration method
const goalCelebRegex = /(  public playGoalCelebration\(\) \{[\s\S]*?\n  \})/;
const patch = `$1

  public stopGoalCelebration() {
    this.initAudioElements();
    if (this.audioElements.goal) {
      this.audioElements.goal.pause();
      this.audioElements.goal.currentTime = 0;
    }
  }`;

content = content.replace(goalCelebRegex, patch);
fs.writeFileSync('src/utils/audio.ts', content, 'utf-8');
console.log("Patched audio.ts stopGoalCelebration");
