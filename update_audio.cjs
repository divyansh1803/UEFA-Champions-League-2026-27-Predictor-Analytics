const fs = require('fs');

let content = fs.readFileSync('src/utils/audio.ts', 'utf-8');

// Replace the SoundEngine methods
const regex = /  private getContext\(\): AudioContext \| null \{[\s\S]*\}\n\}\n\nexport const sound = new SoundEngine\(\);/m;

const replacement = `  private audioElements: Record<string, HTMLAudioElement> = {};

  private initAudioElements() {
    if (typeof window !== 'undefined' && !this.audioElements.anthem) {
      this.audioElements.anthem = new Audio('/audio/anthem.mp3');
      this.audioElements.goal = new Audio('/audio/mrmark_goal.mp3');
      this.audioElements.crowd = new Audio('/audio/crowd_cheering_vishiv.mp3');
      this.audioElements.crowd.loop = true;
      this.audioElements.victory = new Audio('/audio/don_miguelo_victory.mp3');
    }
  }

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Real mp3 Anthem
  public playAnthemFanfare() {
    if (!this.enabled || !this.anthemEnabled) return;
    this.initAudioElements();
    this.stopAnthem();
    this.anthemPlaying = true;
    this.audioElements.anthem.currentTime = 0;
    this.audioElements.anthem.play().catch(() => {});
  }

  public stopAnthem() {
    this.initAudioElements();
    if (this.audioElements.anthem) {
      this.audioElements.anthem.pause();
    }
    this.anthemPlaying = false;
  }

  // Real mp3 Crowd Ambience
  public startCrowdAmbience() {
    if (!this.enabled || !this.crowdAmbienceEnabled) return;
    this.initAudioElements();
    if (this.crowdAmbienceActive) return;
    this.audioElements.crowd.play().catch(() => {});
    this.crowdAmbienceActive = true;
  }

  public stopCrowdAmbience() {
    this.initAudioElements();
    if (this.audioElements.crowd) {
      this.audioElements.crowd.pause();
    }
    this.crowdAmbienceActive = false;
  }

  // Real mp3 Goal Celebration
  public playGoalCelebration() {
    if (!this.enabled || !this.goalCelebrationEnabled) return;
    this.initAudioElements();
    this.audioElements.goal.currentTime = 0;
    this.audioElements.goal.play().catch(() => {});
  }

  // Real mp3 Victory Song
  public playVictorySong() {
    if (!this.enabled) return;
    this.initAudioElements();
    this.audioElements.victory.currentTime = 0;
    this.audioElements.victory.play().catch(() => {});
  }

  public stopVictorySong() {
    this.initAudioElements();
    if (this.audioElements.victory) {
      this.audioElements.victory.pause();
    }
  }

  // Referee whistle sound (fallback to WebAudio API)
  public playWhistle() {
    if (!this.enabled || !this.whistleEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
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
  }

  // Subtle click UI audio
  public playClick() {
    if (!this.enabled || !this.whistleEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }
}

export const sound = new SoundEngine();`;

content = content.replace(regex, replacement);

fs.writeFileSync('src/utils/audio.ts', content, 'utf-8');
console.log("Updated audio.ts");
