import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Test the pure speed mapping logic
describe('naverSpeed() mapping', () => {
  it('maps speed 0.75 to Naver speed -2', async () => {
    const { naverSpeed } = await import('./audio');
    expect(naverSpeed(0.75)).toBe(-2);
  });

  it('maps speed 1.0 to Naver speed 0', async () => {
    const { naverSpeed } = await import('./audio');
    expect(naverSpeed(1)).toBe(0);
  });
});

// Helper: create a fake Audio instance
function makeMockAudio() {
  return { play: vi.fn().mockResolvedValue(undefined), pause: vi.fn(), currentTime: 0 };
}

describe('speak()', () => {
  let fetchSpy: ReturnType<typeof vi.fn>;
  let mockAudio: ReturnType<typeof makeMockAudio>;

  beforeEach(() => {
    vi.resetModules();

    // Mock fetch
    fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      blob: vi.fn().mockResolvedValue(new Blob(['audio'], { type: 'audio/mpeg' })),
    });
    vi.stubGlobal('fetch', fetchSpy);

    // Mock URL.createObjectURL
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');

    // Mock Audio constructor — must use a real function (not arrow) for `new`
    mockAudio = makeMockAudio();
    const MockAudio = function (this: object) {
      Object.assign(this, mockAudio);
    };
    vi.stubGlobal('Audio', MockAudio);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('calls fetch with correct speed param for 0.75', async () => {
    const { speak } = await import('./audio');
    await speak('안녕', 0.75);
    expect(fetchSpy).toHaveBeenCalledOnce();
    const url = fetchSpy.mock.calls[0][0] as string;
    expect(url).toContain('speed=-2');
  });

  it('calls fetch with correct speed param for 1.0', async () => {
    const { speak } = await import('./audio');
    await speak('안녕', 1);
    expect(fetchSpy).toHaveBeenCalledOnce();
    const url = fetchSpy.mock.calls[0][0] as string;
    expect(url).toContain('speed=0');
  });

  it('caches blob URL — second call with same args does not fetch again', async () => {
    const { speak } = await import('./audio');
    await speak('안녕', 1);
    await speak('안녕', 1);
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it('does NOT reuse cache for different speed', async () => {
    const { speak } = await import('./audio');
    await speak('안녕', 1);
    await speak('안녕', 0.75);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('stops current audio before starting new playback', async () => {
    // Track multiple Audio instances
    const instances: ReturnType<typeof makeMockAudio>[] = [];
    const MockAudio2 = function (this: ReturnType<typeof makeMockAudio>) {
      const inst = makeMockAudio();
      instances.push(inst);
      Object.assign(this, inst);
    };
    vi.stubGlobal('Audio', MockAudio2);

    const { speak } = await import('./audio');
    await speak('안녕', 1);
    await speak('다시', 1);

    // First instance should have been paused when second speak was called
    expect(instances[0].pause).toHaveBeenCalled();
  });
});

describe('stopAudio()', () => {
  let mockAudio: ReturnType<typeof makeMockAudio>;

  beforeEach(() => {
    vi.resetModules();

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      blob: vi.fn().mockResolvedValue(new Blob(['audio'], { type: 'audio/mpeg' })),
    }));
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');

    mockAudio = makeMockAudio();
    const MockAudio = function (this: object) {
      Object.assign(this, mockAudio);
    };
    vi.stubGlobal('Audio', MockAudio);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('pauses and resets current audio', async () => {
    const { speak, stopAudio } = await import('./audio');
    await speak('안녕', 1);
    stopAudio();
    expect(mockAudio.pause).toHaveBeenCalled();
    expect(mockAudio.currentTime).toBe(0);
  });

  it('does not throw when no audio is playing', async () => {
    const { stopAudio } = await import('./audio');
    expect(() => stopAudio()).not.toThrow();
  });
});
