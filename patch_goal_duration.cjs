const fs = require('fs');
let content = fs.readFileSync('src/utils/audio.ts', 'utf-8');

const goalRegex = /  public playGoalCelebration\(\) \{[\s\S]*?this\.processSfxQueue\(\);\n  \}/;
const goalReplacement = `  public playGoalCelebration() {
    if (!this.enabled || !this.goalCelebrationEnabled) return;
    this.initAudioElements();
    
    this.sfxQueue.push(() => {
      return new Promise((resolve) => {
        const audio = this.audioElements.goal;
        const onEnded = () => {
          audio.removeEventListener('ended', onEnded);
          resolve();
        };
        audio.addEventListener('ended', onEnded);
        audio.currentTime = 0;
        audio.play().catch(() => {
          audio.removeEventListener('ended', onEnded);
          resolve(); // Resolve on error so queue doesn't stall
        });
        
        // Stop the goal sound after 3 seconds
        setTimeout(() => {
          audio.pause();
          audio.removeEventListener('ended', onEnded);
          resolve();
        }, 3000); 
      });
    });
    
    this.processSfxQueue();
  }`;

content = content.replace(goalRegex, goalReplacement);

fs.writeFileSync('src/utils/audio.ts', content, 'utf-8');
console.log("Patched playGoalCelebration duration to 3s");
