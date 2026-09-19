const fs = require('fs');
let content = fs.readFileSync('src/utils/audio.ts', 'utf-8');

// Replace playAnthemFanfare
const oldAnthem = `  public playAnthemFanfare() {
    if (!this.enabled || !this.anthemEnabled) return;
    this.initAudioElements();
    this.stopAnthem();
    this.anthemPlaying = true;
    this.audioElements.anthem.currentTime = 0;
    this.audioElements.anthem.play().catch(() => { /* Suppress missing file errors to prevent auto-prompts */ });
  }`;

const newAnthem = `  public playAnthemFanfare() {
    if (!this.enabled || !this.anthemEnabled) return;
    this.initAudioElements();
    this.stopAnthem();
    
    // Add 2-second delay as requested
    setTimeout(() => {
      this.anthemPlaying = true;
      this.audioElements.anthem.currentTime = 0;
      this.audioElements.anthem.play().catch(() => { /* Suppress missing file errors to prevent auto-prompts */ });
    }, 2000);
  }`;

content = content.replace(oldAnthem, newAnthem);

fs.writeFileSync('src/utils/audio.ts', content, 'utf-8');
console.log("Patched audio.ts for 2 second anthem delay");
