import fs from "fs";
import path from "path";

export interface SecurityEvent {
  id: string;
  timestamp: string;
  type:
    | "AUTH_SUCCESS"
    | "AUTH_FAILURE"
    | "AUTH_LOCKOUT"
    | "ACCESS_DENIED"
    | "RATE_LIMIT_EXCEEDED"
    | "FILE_UPLOAD"
    | "FILE_REJECTED"
    | "ADMIN_ACTION"
    | "INPUT_VALIDATION_ERROR";
  ip: string;
  userAgent?: string;
  endpoint: string;
  details: Record<string, any>;
}

class SecurityAuditLogger {
  private inMemoryLogs: SecurityEvent[] = [];
  private maxLogs = 500;
  private logFilePath: string;

  constructor() {
    const logsDir = path.resolve(process.cwd(), "logs");
    if (!fs.existsSync(logsDir)) {
      try {
        fs.mkdirSync(logsDir, { recursive: true });
      } catch {
        // ignore fallback
      }
    }
    this.logFilePath = path.join(logsDir, "security-audit.log");
  }

  public log(
    type: SecurityEvent["type"],
    req: { ip?: string; originalUrl?: string; get?: (header: string) => string | undefined },
    details: Record<string, any> = {}
  ): SecurityEvent {
    // Sanitize details: strip any password, secret, or token fields
    const sanitizedDetails = { ...details };
    delete sanitizedDetails.password;
    delete sanitizedDetails.token;
    delete sanitizedDetails.cookie;
    delete sanitizedDetails.authorization;
    delete sanitizedDetails.secret;

    const event: SecurityEvent = {
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
    fs.appendFile(this.logFilePath, line, (err) => {
      if (err) {
        // Ignore file logging errors to prevent breaking request flow
      }
    });

    return event;
  }

  public getRecentLogs(limit: number = 100): SecurityEvent[] {
    return this.inMemoryLogs.slice(0, limit);
  }
}

export const auditLogger = new SecurityAuditLogger();
