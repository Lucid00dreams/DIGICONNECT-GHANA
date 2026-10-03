"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const auditLogger_1 = require("../services/auditLogger");
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = (0, express_1.Router)();
// POST /api/auth/login - Admin authentication
router.post("/login", rateLimiter_1.authLimiter, (req, res) => {
    try {
        const clientIp = req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
            req.ip ||
            "127.0.0.1";
        // 1. Check lockout status
        const lockout = auth_service_1.AuthService.isLockedOut(clientIp);
        if (lockout.locked) {
            auditLogger_1.auditLogger.log("AUTH_LOCKOUT", req, {
                ip: clientIp,
                remainingSeconds: lockout.remainingSeconds,
            });
            return res.status(429).json({
                success: false,
                error: `Too many failed login attempts. Account temporarily locked for security. Please try again in ${lockout.remainingSeconds} seconds.`,
                retryAfter: lockout.remainingSeconds,
            });
        }
        const { email, password } = req.body;
        if (!email || !password || typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({
                success: false,
                error: "Email and password are required.",
            });
        }
        const adminEmail = auth_service_1.AuthService.getAdminEmail();
        const isEmailMatch = email.trim().toLowerCase() === adminEmail;
        const isPasswordMatch = isEmailMatch && auth_service_1.AuthService.verifyPassword(password);
        if (!isEmailMatch || !isPasswordMatch) {
            const attempt = auth_service_1.AuthService.recordFailedAttempt(clientIp);
            auditLogger_1.auditLogger.log("AUTH_FAILURE", req, {
                attemptedEmail: email.trim().toLowerCase(),
                attemptsLeft: attempt.attemptsLeft,
            });
            return res.status(401).json({
                success: false,
                error: "Invalid email or password.",
                attemptsLeft: attempt.attemptsLeft,
            });
        }
        // Success - clear failed attempts and issue cryptographic session
        auth_service_1.AuthService.recordSuccessfulLogin(clientIp);
        const token = auth_service_1.AuthService.createSession(adminEmail);
        const isProduction = process.env.NODE_ENV === "production";
        // Set HttpOnly, SameSite, Secure cookie (supports cross-origin Vercel -> Render)
        res.cookie("dcg_session", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 2 * 60 * 60 * 1000, // 2 hours
            path: "/",
        });
        auditLogger_1.auditLogger.log("AUTH_SUCCESS", req, { email: adminEmail });
        res.json({
            success: true,
            message: "Authentication successful",
            user: {
                email: adminEmail,
                role: "admin",
            },
            token,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Authentication service error" });
    }
});
// GET /api/auth/verify - Verify session status
router.get("/verify", (req, res) => {
    try {
        const token = req.cookies?.dcg_session ||
            (req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.substring(7).trim()
                : undefined);
        if (!token) {
            return res.status(401).json({ success: false, authenticated: false });
        }
        const session = auth_service_1.AuthService.validateSession(token);
        if (!session) {
            return res.status(401).json({ success: false, authenticated: false });
        }
        res.json({
            success: true,
            authenticated: true,
            user: {
                email: session.email,
                role: session.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Session verification error" });
    }
});
// POST /api/auth/logout - Invalidate session
router.post("/logout", (req, res) => {
    try {
        const token = req.cookies?.dcg_session ||
            (req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.substring(7).trim()
                : undefined);
        if (token) {
            auth_service_1.AuthService.destroySession(token);
        }
        const isProduction = process.env.NODE_ENV === "production";
        res.clearCookie("dcg_session", {
            path: "/",
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        });
        res.json({
            success: true,
            message: "Logged out successfully",
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Logout error" });
    }
});
exports.default = router;
