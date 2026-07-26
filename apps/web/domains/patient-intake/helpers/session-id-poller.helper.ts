const DEFAULT_INTERVAL_MS = 250;

export function startSessionIdPoller(options: {
  readId: () => string | null;
  onChange: (id: string | null) => void;
  intervalMs?: number;
  setIntervalFn?: typeof setInterval;
  clearIntervalFn?: typeof clearInterval;
}): () => void {
  const {
    readId,
    onChange,
    intervalMs = DEFAULT_INTERVAL_MS,
    setIntervalFn = setInterval,
    clearIntervalFn = clearInterval,
  } = options;

  let currentId = readId();
  onChange(currentId);

  const intervalId = setIntervalFn(() => {
    const nextId = readId();
    if (nextId === currentId) return;

    currentId = nextId;
    onChange(nextId);
  }, intervalMs);

  return () => clearIntervalFn(intervalId);
}
