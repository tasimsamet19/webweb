interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 10 minutes to prevent memory growth
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (entry.resetAt < now) store.delete(key);
    }
  }, 10 * 60 * 1000);
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Returns true if the IP has exceeded the limit.
 * @param ip       Client IP address
 * @param key      Unique key for this route (e.g. "contact", "quote")
 * @param limit    Max requests allowed within the window
 * @param windowMs Time window in milliseconds (default: 15 minutes)
 */
export function isRateLimited(
  ip: string,
  key: string,
  limit: number,
  windowMs = 15 * 60 * 1000
): boolean {
  const storeKey = `${key}:${ip}`;
  const now = Date.now();
  const entry = store.get(storeKey);

  if (!entry || entry.resetAt < now) {
    store.set(storeKey, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count += 1;
  if (entry.count > limit) return true;

  return false;
}
