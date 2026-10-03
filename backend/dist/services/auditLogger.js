"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class SecurityAuditLogger {
    inMemoryLogs = [];
    maxLogs = 500;
    logFilePath;
    constructor() {
        const logsDir = path_1.default.resolve(process.cwd(), "logs");
        if (!fs_1.default.existsSync(logsDir)) {
            try {
                fs_1.default.mkdirSync(logsDir, { recursive: true });
            }
            catch {
                // ignore fallback
            }
        }
        this.logFilePath = path_1.default.join(logsDir, "security-audit.log");
    }
    log(type, req, details = {}) {
        // Sanitize details: strip any password, secret, or token fields
        const sanitizedDetails = { ...details };
        delete sanitizedDetails.password;
        delete sanitizedDetails.token;
        delete sanitizedDetails.cookie;
        delete sanitizedDetails.authorization;
        delete sanitizedDetails.secret;
        const event = {
            id: `sec-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
            timestamp: new Date().toISOString(),
            type,
            ip: req.ip || "unknown",
            userAgent: req.get ? req.get("user-agent") : undefined,
            endpoint: req.originalUrl || "unknown",
            details: sanitizedDetails,
        };
        // Store in ring buffer
        this.inMemoryLogs.unshift(event);
        if (this.inMemoryLogs.length > this.maxLogs) {
            this.inMemoryLogs.pop();
        }
        // Append to file asynchronously
        const line = JSON.stringify(event) + "\n";
        fs_1.default.appendFile(this.logFilePath, line, (err) => {
            if (err) {
                // Ignore file logging errors to prevent breaking request flow
            }
        });
        return event;
    }
    getRecentLogs(limit = 100) {
        return this.inMemoryLogs.slice(0, limit);
    }
}
exports.auditLogger = new SecurityAuditLogger();
