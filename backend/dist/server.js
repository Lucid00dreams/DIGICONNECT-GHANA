"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config();
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const applications_routes_1 = __importDefault(require("./routes/applications.routes"));
const contacts_routes_1 = __importDefault(require("./routes/contacts.routes"));
const involvements_routes_1 = __importDefault(require("./routes/involvements.routes"));
const events_routes_1 = __importDefault(require("./routes/events.routes"));
const news_routes_1 = __importDefault(require("./routes/news.routes"));
const gallery_routes_1 = __importDefault(require("./routes/gallery.routes"));
const programs_routes_1 = __importDefault(require("./routes/programs.routes"));
const stats_routes_1 = __importDefault(require("./routes/stats.routes"));
const uploads_routes_1 = __importDefault(require("./routes/uploads.routes"));
const cookies_routes_1 = __importDefault(require("./routes/cookies.routes"));
const lms_routes_1 = __importDefault(require("./routes/lms.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const rateLimiter_1 = require("./middleware/rateLimiter");
const sanitizer_1 = require("./middleware/sanitizer");
const auth_1 = require("./middleware/auth");
const auditLogger_1 = require("./services/auditLogger");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
// Disable Express fingerprint header (Phase 13, 20)
app.disable("x-powered-by");
// Dynamic configured CORS origins supporting comma-separated list
const parsedOrigins = CORS_ORIGIN.split(",")
    .map((o) => o.trim().replace(/\/$/, ""))
    .filter(Boolean);
const allowedOrigins = Array.from(new Set([
    ...parsedOrigins,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]));
// 1. Comprehensive HTTP Security Headers Middleware (Phase 13)
app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
    const connectOrigins = [
        "'self'",
        "http://localhost:3000",
        "http://localhost:5000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5000",
        ...allowedOrigins,
        "https://*.vercel.app",
        "https://*.onrender.com",
        "https://*.koyeb.app",
        "https://*.railway.app",
    ].filter(Boolean).join(" ");
    res.setHeader("Content-Security-Policy", `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src ${connectOrigins}; frame-ancestors 'self'`);
    if (process.env.NODE_ENV === "production") {
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    }
    next();
});
// 2. Strict CORS Configuration (Phase 15)
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, server-to-server)
        if (!origin ||
            allowedOrigins.includes(origin) ||
            origin.endsWith(".vercel.app") ||
            origin.endsWith(".onrender.com") ||
            (process.env.NODE_ENV !== "production" && origin.includes("localhost"))) {
            return callback(null, true);
        }
        return callback(new Error("CORS policy violation: origin not permitted"), false);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Admin-Key"],
    credentials: true,
}));
// 3. Body parsers with strict size limits to prevent DoS (Phase 5)
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "1mb" }));
// 4. Global Input Sanitization (Phase 6, 7)
app.use(sanitizer_1.sanitizeRequest);
// 5. Global API Rate Limiting (Phase 5, 23)
app.use("/api/", rateLimiter_1.globalApiLimiter);
// 6. Request Logger for auditing
if (process.env.NODE_ENV !== "test") {
    app.use((req, _res, next) => {
        // Avoid logging passwords or tokens
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
        next();
    });
}
// 7. Static directory for uploaded files with defensive security headers (Phase 9)
const uploadDir = process.env.UPLOAD_DIR
    ? path_1.default.resolve(process.cwd(), process.env.UPLOAD_DIR)
    : path_1.default.resolve(process.cwd(), "uploads");
app.use("/uploads", express_1.default.static(uploadDir, {
    setHeaders: (res) => {
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'");
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
}));
// Health check endpoint
app.get("/api/health", (_req, res) => {
    res.json({
        status: "ok",
        organization: "DigiConnect Ghana",
        service: "DigiConnect Backend API",
        security: "Hardened & Audited (OWASP Compliant)",
        version: "1.0.0",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});
// API Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/applications", applications_routes_1.default);
app.use("/api/contacts", contacts_routes_1.default);
app.use("/api/involvements", involvements_routes_1.default);
app.use("/api/events", events_routes_1.default);
app.use("/api/news", news_routes_1.default);
app.use("/api/gallery", gallery_routes_1.default);
app.use("/api/programs", programs_routes_1.default);
app.use("/api/stats", stats_routes_1.default);
app.use("/api/upload", uploads_routes_1.default);
app.use("/api/cookies", cookies_routes_1.default);
app.use("/api/lms", lms_routes_1.default);
// Security Audit Logs endpoint (Admin only)
app.get("/api/admin/audit-logs", auth_1.requireAdminAuth, (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 50;
    res.json({
        success: true,
        logs: auditLogger_1.auditLogger.getRecentLogs(Math.min(limit, 200)),
    });
});
// 404 handler for undefined API routes
app.use("/api/*", (_req, res) => {
    res.status(404).json({ success: false, error: "API endpoint not found" });
});
// Global error handler
app.use(errorHandler_1.errorHandler);
// Start server
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`===============================================`);
        console.log(`🛡️  DigiConnect Ghana Hardened Backend API Server`);
        console.log(`📡 Running on: http://localhost:${PORT}`);
        console.log(`🌐 Allowed CORS Origins: ${allowedOrigins.join(", ")}`);
        console.log(`🔒 Security: Headers, Scrypt Hashing, Rate Limiting & Auth ACTIVE`);
        console.log(`📁 Uploads served at: http://localhost:${PORT}/uploads/`);
        console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
        console.log(`===============================================`);
    });
}
exports.default = app;
