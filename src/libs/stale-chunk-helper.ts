/**
 * Recovery for stale hashed chunks.
 *
 * Every deploy publishes a new set of content-hashed files under /assets and
 * deletes the previous ones. A browser holding an `index.html` (cached for 10
 * minutes by GitHub Pages) or an already-open tab from a prior deploy still
 * points at the old chunk names, so any lazy `import()` 404s for that visitor
 * until they hard-refresh. Reloading the document once pulls the current
 * `index.html` and the chunk names that go with it.
 */

const RELOAD_FLAG = 'portfolio:stale-chunk-reloaded';

/** sessionStorage throws when cookies/storage are blocked, so never let it break a render. */
function readFlag(): boolean {
  try {
    return window.sessionStorage.getItem(RELOAD_FLAG) !== null;
  } catch {
    return false;
  }
}

function writeFlag(value: boolean): void {
  try {
    if (value) {
      window.sessionStorage.setItem(RELOAD_FLAG, '1');
    } else {
      window.sessionStorage.removeItem(RELOAD_FLAG);
    }
  } catch {
    // Storage unavailable: recovery still reloads once, it just can't be
    // remembered, so fall through rather than failing.
  }
}

/** Matches the module-loading failures browsers report for a chunk that is no longer served. */
export function isStaleChunkError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return /failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|failed to load module script|unable to preload/i.test(
    message,
  );
}

/**
 * Reloads the page once when `err` is a missing-chunk error, so the visitor
 * lands on the current build. Returns true when a reload was triggered; false
 * means the caller should surface the error (either it isn't a stale chunk, or
 * a reload was already attempted this session and did not help).
 */
export function recoverFromStaleChunk(err: unknown): boolean {
  if (!isStaleChunkError(err) || readFlag()) return false;

  writeFlag(true);
  window.location.reload();
  return true;
}

/**
 * Clears the once-per-session guard after a lazy chunk loads successfully, so a
 * deploy that happens later in the same session can still be recovered from.
 */
export function markChunkLoadSucceeded(): void {
  if (readFlag()) writeFlag(false);
}
