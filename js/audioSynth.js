/**
 * Smriti-Setu NER (স্মৃতি সেতু) Audio Synthesizer Engine
 * Pure Web Audio API Synthesizer for Authentic Northeast Instruments & Calming Acoustic Therapy
 * Zero external audio file dependency ensures 100% offline & low-bandwidth performance in hilly terrain.
 */

class RegionalAudioSynth {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = false;
    this.currentLoopSource = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Web Audio API not supported on this browser:", e);
    }
  }

  resumeContext() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Positive Acoustic Reinforcement Chime (Soothing Pentatonic Harmony)
   */
  playSuccessChime() {
    this.resumeContext();
    if (!this.ctx || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Soothes cognitive agitation)
    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.08);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.25, this.ctx.currentTime + index * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + index * 0.08 + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(this.ctx.currentTime + index * 0.08);
      osc.stop(this.ctx.currentTime + index * 0.08 + 0.85);
    });
  }

  /**
   * Gentle Click Feedback for Accessible Senior Touch Targets
   */
  playTapFeedback() {
    this.resumeContext();
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  /**
   * Synthesize Authentic Regional Northeast Instrument Tones
   * 1. Bamboo / Bihu Flute (বাঁহী / পেঁপা)
   * 2. Traditional Folk Dhol Tap (ঢোল)
   * 3. Manipuri Pena (Bowed string with resonance)
   * 4. Cherrapunji Soothing Rain Soundscape
   * 5. Hill Bird Call
   */
  playRegionalSound(soundType, duration = 3.0) {
    this.resumeContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;

    switch (soundType) {
      case 'flute': // Assamese Bihu Bamboo Flute / Pepa harmonic
        this.synthesizeFluteMelody(now, duration);
        break;

      case 'dhol': // Traditional Dhol rhythmic beat
        this.synthesizeDholRhythm(now);
        break;

      case 'pena': // Manipuri Pena bowed string timbre
        this.synthesizePenaTone(now, duration);
        break;

      case 'rain': // Cherrapunji / Mawsynram gentle rainfall
        this.synthesizeRainSoundscape(now, duration);
        break;

      case 'birds': // North Eastern Forest Hill Birds
        this.synthesizeBirdWarble(now, duration);
        break;

      default:
        this.playSuccessChime();
    }
  }

  synthesizeFluteMelody(now, duration) {
    const melody = [587.33, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33]; // Raga Bhupali / Folk scale
    const noteDuration = duration / melody.length;

    melody.forEach((freq, idx) => {
      const startTime = now + idx * noteDuration;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator(); // Breath/air harmonic
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, startTime);
      
      // Vibrato
      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      vibrato.frequency.value = 5.5; // 5.5 Hz vibrato
      vibratoGain.gain.value = 4.0;
      vibrato.connect(osc1.frequency);
      vibrato.start(startTime);
      vibrato.stop(startTime + noteDuration);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, startTime); // 1st overtone

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + noteDuration * 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + noteDuration);
      osc2.stop(startTime + noteDuration);
    });
  }

  synthesizeDholRhythm(now) {
    const hits = [0, 0.22, 0.45, 0.68, 0.90, 1.15];
    hits.forEach((timeOffset, idx) => {
      const hitTime = now + timeOffset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Low fundamental drum membrane resonance
      const isDag = idx % 2 === 0;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isDag ? 110 : 210, hitTime);
      osc.frequency.exponentialRampToValueAtTime(isDag ? 45 : 85, hitTime + 0.18);

      gain.gain.setValueAtTime(0.4, hitTime);
      gain.gain.exponentialRampToValueAtTime(0.001, hitTime + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(hitTime);
      osc.stop(hitTime + 0.26);
    });
  }

  synthesizePenaTone(now, duration) {
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(293.66, now); // D4 string
    
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(146.83, now); // Drone string (Maru)

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(880, now);
    filter.Q.setValueAtTime(3.0, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.4);
    gain.gain.setValueAtTime(0.28, now + duration - 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    subOsc.connect(gain);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + duration);
    subOsc.stop(now + duration);
  }

  synthesizeRainSoundscape(now, duration) {
    // Generate pink/white noise buffer for rainfall on tin roof/bamboo leaves
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.3);
    gain.gain.linearRampToValueAtTime(0.22, now + duration - 0.4);
    gain.gain.linearRampToValueAtTime(0.001, now + duration);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseSource.start(now);
    noiseSource.stop(now + duration);
  }

  synthesizeBirdWarble(now, duration) {
    const tweets = [0, 0.4, 0.9, 1.4, 1.8];
    tweets.forEach((offset) => {
      const t = now + offset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400, t);
      osc.frequency.linearRampToValueAtTime(3200, t + 0.08);
      osc.frequency.linearRampToValueAtTime(2100, t + 0.18);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.23);
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

// Global singleton instance
window.audioSynth = new RegionalAudioSynth();
