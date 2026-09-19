const fs = require('fs');
let content = fs.readFileSync('src/utils/audio.ts', 'utf-8');

const classDefRegex = /class SoundEngine \{/;
const queueVars = `class SoundEngine {
  private sfxQueue: Array<() => Promise<void>> = [];
  private isProcessingQueue = false;

  private async processSfxQueue() {
    if (this.isProcessingQueue) return;
    this.isProcessingQueue = true;
    while (this.sfxQueue.length > 0) {
      const playNext = this.sfxQueue.shift();
      if (playNext) {
        await playNext();
      }
    }
    this.isProcessingQueue = false;
  }

  public clearQueue() {
    this.sfxQueue = [];
  }
`;

content = content.replace(classDefRegex, queueVars);

const goalRegex = /  public playGoalCelebration\(\) \{[\s\S]*?\n  \}/;
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
        
        // Safety timeout in case ended doesn't fire
        setTimeout(() => {
          audio.removeEventListener('ended', onEnded);
          resolve();
        }, 15000); 
      });
    });
    
    this.processSfxQueue();
  }`;
content = content.replace(goalRegex, goalReplacement);

const whistleRegex = /  public playWhistle\(\) \{[\s\S]*?osc2\.stop\(ctx\.currentTime \+ 0\.45\);\n  \}/;
const whistleReplacement = `  public playWhistle() {
    if (!this.enabled || !this.whistleEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    
    this.sfxQueue.push(() => {
      return new Promise((resolve) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(2800, ctx.currentTime);
        osc2.frequency.setValueAtTime(2950, ctx.currentTime);

        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        osc1.stop(ctx.currentTime + 0.45);
        osc2.stop(ctx.currentTime + 0.45);
        
        setTimeout(resolve, 500);
      });
    });
    
    this.processSfxQueue();
  }`;
content = content.replace(whistleRegex, whistleReplacement);

fs.writeFileSync('src/utils/audio.ts', content, 'utf-8');
console.log("Patched audio.ts queue");
