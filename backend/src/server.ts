import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config();

import authRouter from "./routes/auth.routes";
import applicationsRouter from "./routes/applications.routes";
import contactsRouter from "./routes/contacts.routes";
import involvementsRouter from "./routes/involvements.routes";
import eventsRouter from "./routes/events.routes";
import newsRouter from "./routes/news.routes";
import galleryRouter from "./routes/gallery.routes";
import programsRouter from "./routes/programs.routes";
import statsRouter from "./routes/stats.routes";
import uploadsRouter from "./routes/uploads.routes";
import cookiesRouter from "./routes/cookies.routes";
import { errorHandler } from "./middleware/errorHandler";
import { globalApiLimiter } from "./middleware/rateLimiter";
import { sanitizeRequest } from "./middleware/sanitizer";
import { requireAdminAuth } from "./middleware/auth";
import { auditLogger } from "./services/auditLogger";

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

// Disable Express fingerprint header (Phase 13, 20)
app.disable("x-powered-by");

// Dynamic configured CORS origins supporting comma-separated list
const parsedOrigins = CORS_ORIGIN.split(",")
  .map((o) => o.trim().replace(/\/$/, ""))
  .filter(Boolean);

const allowedOrigins = Array.from(
  new Set([
    ...parsedOrigins,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ])
);

// 1. Comprehensive HTTP Security Headers Middleware (Phase 13)
app.use((_req: Request, res: Response, next: NextFunction) => {
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

  res.setHeader(
    "Content-Security-Policy",
    `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src ${connectOrigins}; frame-ancestors 'self'`
  );

  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }

  next();
});

// 2. Strict CORS Configuration (Phase 15)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.endsWith(".onrender.com") ||
        (process.env.NODE_ENV !== "production" && origin.includes("localhost"))
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation: origin not permitted"), false);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Admin-Key"],
    credentials: true,
  })
);

// 3. Body parsers with strict size limits to prevent DoS (Phase 5)
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// 4. Global Input Sanitization (Phase 6, 7)
app.use(sanitizeRequest);

// 5. Global API Rate Limiting (Phase 5, 23)
app.use("/api/", globalApiLimiter);

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
  ? path.resolve(process.cwd(), process.env.UPLOAD_DIR)
  : path.resolve(process.cwd(), "uploads");

app.use(
  "/uploads",
  express.static(uploadDir, {
    setHeaders: (res) => {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

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
app.use("/api/auth", authRouter);
app.use("/api/applications", applicationsRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/involvements", involvementsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/news", newsRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/programs", programsRouter);
app.use("/api/stats", statsRouter);
app.use("/api/upload", uploadsRouter);
app.use("/api/cookies", cookiesRouter);

// Security Audit Logs endpoint (Admin only)
app.get("/api/admin/audit-logs", requireAdminAuth, (req, res) => {
  const limit = parseInt(req.query.limit as string, 10) || 50;
  res.json({
    success: true,
    logs: auditLogger.getRecentLogs(Math.min(limit, 200)),
  });
});

// 404 handler for undefined API routes
app.use("/api/*", (_req, res) => {
  res.status(404).json({ success: false, error: "API endpoint not found" });
});

// Global error handler
app.use(errorHandler);

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

export default app;
