"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalApiLimiter = exports.publicFormLimiter = exports.authLimiter = void 0;
const auditLogger_1 = require("../services/auditLogger");
class SlidingWindowRateLimiter {
    hits = new Map();
    windowMs;
    maxHits;
    limiterName;
    constructor(limiterName, windowMs, maxHits) {
        this.limiterName = limiterName;
        this.windowMs = windowMs;
        this.maxHits = maxHits;
        // Prune stale records every 5 minutes
        setInterval(() => this.pruneStale(), 5 * 60 * 1000).unref();
    }
    middleware() {
        return (req, res, next) => {
            // Identify client by IP (or forward header if trusted reverse proxy configured)
            const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
                req.ip ||
                req.socket.remoteAddress ||
                "127.0.0.1";
            const key = `${this.limiterName}:${ip}`;
            const now = Date.now();
            let record = this.hits.get(key);
            if (!record || now > record.resetTime) {
                record = { count: 1, resetTime: now + this.windowMs };
                this.hits.set(key, record);
            }
            else {
                record.count += 1;
            }
            const remaining = Math.max(0, this.maxHits - record.count);
            const resetSeconds = Math.ceil((record.resetTime - now) / 1000);
            res.setHeader("X-RateLimit-Limit", this.maxHits);
            res.setHeader("X-RateLimit-Remaining", remaining);
            res.setHeader("X-RateLimit-Reset", resetSeconds);
            if (record.count > this.maxHits) {
                res.setHeader("Retry-After", resetSeconds);
                auditLogger_1.auditLogger.log("RATE_LIMIT_EXCEEDED", req, {
                    limiter: this.limiterName,
                    ip,
                    hits: record.count,
                    max: this.maxHits,
                });
                return res.status(429).json({
                    success: false,
                    error: "Too many requests. Please slow down and try again later.",
                    retryAfter: resetSeconds,
                });
            }
            next();
        };
    }
    pruneStale() {
        const now = Date.now();
        for (const [key, record] of this.hits.entries()) {
            if (now > record.resetTime) {
                this.hits.delete(key);
            }
        }
    }
}
// 5 attempts per 15 minutes for authentication
exports.authLimiter = new SlidingWindowRateLimiter("auth", 15 * 60 * 1000, 5).middleware();
// 15 submissions per 15 minutes for public forms (applications, contacts, volunteer)
exports.publicFormLimiter = new SlidingWindowRateLimiter("public_form", 15 * 60 * 1000, 15).middleware();
// 300 requests per 15 minutes globally per IP
exports.globalApiLimiter = new SlidingWindowRateLimiter("global_api", 15 * 60 * 1000, 300).middleware();
