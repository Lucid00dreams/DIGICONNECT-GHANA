"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdminAuth = requireAdminAuth;
const auth_service_1 = require("../services/auth.service");
const auditLogger_1 = require("../services/auditLogger");
function requireAdminAuth(req, res, next) {
    // 1. Check HttpOnly cookie
    const cookieToken = req.cookies?.dcg_session;
    // 2. Check Authorization header: Bearer <token>
    let headerToken;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        headerToken = authHeader.substring(7).trim();
    }
    // 3. Check X-Admin-Key header (for automated testing or internal service calls)
    const apiKey = req.headers["x-admin-key"];
    const configuredApiKey = process.env.API_KEY || "dcg_api_key_7f8a9e0b1c2d3e4f5a6b7c8d9e0f";
    if (apiKey && apiKey === configuredApiKey) {
        req.user = {
            userId: "dcg-admin-service",
            email: auth_service_1.AuthService.getAdminEmail(),
            role: "admin",
        };
        return next();
    }
    const token = cookieToken || headerToken;
    if (!token) {
        auditLogger_1.auditLogger.log("ACCESS_DENIED", req, {
            reason: "Missing authentication token or session cookie",
        });
        return res.status(401).json({
            success: false,
            error: "Authentication required. Please log in to access this resource.",
        });
    }
    const session = auth_service_1.AuthService.validateSession(token);
    if (!session) {
        auditLogger_1.auditLogger.log("ACCESS_DENIED", req, {
            reason: "Invalid or expired session token",
        });
        return res.status(401).json({
            success: false,
            error: "Session expired or invalid. Please log in again.",
        });
    }
    req.user = {
        userId: session.userId,
        email: session.email,
        role: session.role,
    };
    next();
}
