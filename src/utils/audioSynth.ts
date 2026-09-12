// Web Audio API ambient relaxation sound synthesizer
let audioCtx: AudioContext | null = null;
let isPlayingAmbient = false;
let ambientGainNode: GainNode | null = null;
let intervalId: number | null = null;

const PENTATONIC_NOTES = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33]; // C4, D4, E4, G4, A4, C5, D5

export function playPageFlipSound() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // Ignore audio context autoplay restrictions
  }
}

export function playChimeSound() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 2.5);
  } catch {
    // Audio Context fallback
  }
}

export function toggleAmbientSound(onStateChange?: (playing: boolean) => void): boolean {
  if (isPlayingAmbient) {
    stopAmbientSound();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    startAmbientSound();
    if (onStateChange) onStateChange(true);
    return true;
  }
}

function startAmbientSound() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    ambientGainNode = audioCtx.createGain();
    ambientGainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    ambientGainNode.connect(audioCtx.destination);

    isPlayingAmbient = true;

    // Play gentle random guqin-style pentatonic chime notes every few seconds
    const playRandomNote = () => {
      if (!isPlayingAmbient || !audioCtx || !ambientGainNode) return;
      const noteFreq = PENTATONIC_NOTES[Math.floor(Math.random() * PENTATONIC_NOTES.length)];

      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, audioCtx.currentTime);

      noteGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.5);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 4.0);

      osc.connect(noteGain);
      noteGain.connect(ambientGainNode);

      osc.start();
      osc.stop(audioCtx.currentTime + 4.0);
    };

    playRandomNote();
    intervalId = window.setInterval(playRandomNote, 3500);
  } catch {
    isPlayingAmbient = false;
  }
}

function stopAmbientSound() {
  isPlayingAmbient = false;
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (ambientGainNode && audioCtx) {
    ambientGainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
  }
}
