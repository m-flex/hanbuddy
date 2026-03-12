/**
 * Audio utilities for Hanbuddy.
 *
 * Korean TTS via Cloudflare Worker proxy → Naver Dictionary TTS.
 * Voice: kyuri (female).
 */

const TTS_WORKER_URL = import.meta.env.VITE_TTS_WORKER_URL as string;

let currentAudio: HTMLAudioElement | null = null;

// Cache: "text|naverSpeed" → blob URL
const audioCache = new Map<string, string>();

/**
 * Maps the app's speed values to Naver TTS speed parameter.
 * speed 0.75 → -2 (slightly slow, good for learners)
 * speed 1.0  →  0 (normal)
 */
export function naverSpeed(speed: 0.75 | 1): number {
  if (speed === 0.75) return -2;
  return 0;
}

/**
 * Speaks Korean text using Naver TTS via the worker proxy.
 * Cancels any currently playing audio before starting new playback.
 * Caches blob URLs by text+speed key to avoid redundant fetches.
 */
export async function speak(text: string, speed: 0.75 | 1 = 1): Promise<void> {
  // Stop anything currently playing
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  const ns = naverSpeed(speed);
  const cacheKey = `${text}|${ns}`;
  let blobUrl = audioCache.get(cacheKey);

  if (!blobUrl) {
    const encoded = encodeURIComponent(text);
    const res = await fetch(`${TTS_WORKER_URL}/?text=${encoded}&speed=${ns}&speaker=kyuri`);
    if (!res.ok) throw new Error(`TTS returned ${res.status}`);
    const blob = await res.blob();
    blobUrl = URL.createObjectURL(blob);
    audioCache.set(cacheKey, blobUrl);
  }

  const audio = new Audio(blobUrl);
  currentAudio = audio;
  await audio.play();
}

/**
 * Stops currently playing audio.
 */
export function stopAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}
