/**
 * Sliding-window rate limiter (in-memory).
 *
 * For multi-instance deployments, swap the Map for a Redis-backed store.
 */

interface RateLimitEntry {
    tokens: number;
    lastRefill: number;
}

interface RateLimiterConfig {
    /** Max requests allowed in the window */
    maxRequests: number;
    /** Window duration in seconds */
    windowSeconds: number;
}

const store = new Map<string, RateLimitEntry>();

// Periodically purge stale entries to prevent unbounded memory growth
const CLEANUP_INTERVAL_MS = 60_000;
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
        if (now - entry.lastRefill > 300_000) {
            store.delete(key);
        }
    }
}, CLEANUP_INTERVAL_MS);

export function createRateLimiter(config: RateLimiterConfig) {
    const { maxRequests, windowSeconds } = config;
    const windowMs = windowSeconds * 1000;

    return {
        /**
         * Check if the request is allowed. Returns an object with:
         * - `allowed`: whether the request should proceed
         * - `remaining`: how many requests are left in the window
         * - `retryAfterSeconds`: seconds until the bucket fully refills (only meaningful when blocked)
         */
        check(identifier: string): {
            allowed: boolean;
            remaining: number;
            retryAfterSeconds: number;
        } {
            const now = Date.now();
            const entry = store.get(identifier);

            if (!entry) {
                store.set(identifier, { tokens: maxRequests - 1, lastRefill: now });
                return { allowed: true, remaining: maxRequests - 1, retryAfterSeconds: 0 };
            }

            const elapsed = now - entry.lastRefill;
            const refillRate = maxRequests / windowMs;
            const tokensToAdd = elapsed * refillRate;
            entry.tokens = Math.min(maxRequests, entry.tokens + tokensToAdd);
            entry.lastRefill = now;

            if (entry.tokens < 1) {
                const retryAfterSeconds = Math.ceil((1 - entry.tokens) / refillRate / 1000);
                return { allowed: false, remaining: 0, retryAfterSeconds };
            }

            entry.tokens -= 1;
            return {
                allowed: true,
                remaining: Math.floor(entry.tokens),
                retryAfterSeconds: 0,
            };
        },
    };
}

/**
 * Pre-configured limiter for auth endpoints.
 *
 * 10 requests per 60 seconds per IP — generous enough for normal use,
 * tight enough to block brute-force attempts.
 */
export const authRateLimiter = createRateLimiter({
    maxRequests: 10,
    windowSeconds: 60,
});
