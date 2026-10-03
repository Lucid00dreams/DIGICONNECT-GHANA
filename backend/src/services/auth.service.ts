import crypto from "crypto";

interface SessionData {
  userId: string;
  email: string;
  role: "admin";
  createdAt: number;
  expiresAt: number;
}

interface LoginAttempt {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

const SESSION_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

class AuthServiceClass {
  private sessions = new Map<string, SessionData>();
  private loginAttempts = new Map<string, LoginAttempt>();
  private sessionSecret: string;
  private adminEmail: string;
  private adminPasswordHash: string;
  private adminSalt: string;

  constructor() {
    this.sessionSecret =
      process.env.SESSION_SECRET ||
      crypto.randomBytes(32).toString("hex");

    this.adminEmail = (
      process.env.ADMIN_EMAIL || "admin@digiconnectghana.org"
    ).toLowerCase();

    // Default admin password from environment or fallback secure default
    const adminPassword =
      process.env.ADMIN_PASSWORD || "DigiConnect@2026!Secure";

    this.adminSalt = crypto.randomBytes(16).toString("hex");
    this.adminPasswordHash = this.hashPassword(adminPassword, this.adminSalt);

    // Periodically clean up expired sessions
    setInterval(() => this.cleanupExpiredSessions(), 5 * 60 * 1000).unref();
  }

  /**
   * Hashes a password using crypto.scryptSync with high work factor
   */
  public hashPassword(password: string, salt: string): string {
    return crypto.scryptSync(password, salt, 64).toString("hex");
  }

  /**
   * Constant-time comparison to prevent timing side-channel attacks
   */
  public verifyPassword(providedPassword: string): boolean {
    const computedHash = this.hashPassword(providedPassword, this.adminSalt);
    const a = Buffer.from(computedHash, "hex");
    const b = Buffer.from(this.adminPasswordHash, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  }

  /**
   * Check if an IP address is currently locked out from login
   */
  public isLockedOut(ip: string): { locked: boolean; remainingSeconds?: number } {
    const record = this.loginAttempts.get(ip);
    if (!record || !record.lockedUntil) return { locked: false };

    const now = Date.now();
    if (now < record.lockedUntil) {
      const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
      return { locked: true, remainingSeconds };
    }

    // Lockout expired, reset attempt
    this.loginAttempts.delete(ip);
    return { locked: false };
  }

  /**
   * Record a failed login attempt
   */
  public recordFailedAttempt(ip: string): { locked: boolean; attemptsLeft: number } {
    const now = Date.now();
    let record = this.loginAttempts.get(ip);

    if (!record || now - record.firstAttempt > LOCKOUT_DURATION_MS) {
      record = { count: 1, firstAttempt: now };
    } else {
      record.count += 1;
    }

    if (record.count >= MAX_LOGIN_ATTEMPTS) {
      record.lockedUntil = now + LOCKOUT_DURATION_MS;
      this.loginAttempts.set(ip, record);
      return { locked: true, attemptsLeft: 0 };
    }

    this.loginAttempts.set(ip, record);
    return { locked: false, attemptsLeft: MAX_LOGIN_ATTEMPTS - record.count };
  }

  /**
   * Clear failed attempts on successful login
   */
  public recordSuccessfulLogin(ip: string) {
    this.loginAttempts.delete(ip);
  }

  /**
   * Signs and creates a new cryptographic session token
   */
  public createSession(email: string): string {
    const randomPart = crypto.randomBytes(32).toString("hex");
    const now = Date.now();
    const expiresAt = now + SESSION_DURATION_MS;

    const signature = crypto
      .createHmac("sha256", this.sessionSecret)
      .update(`${randomPart}:${expiresAt}`)
      .digest("hex");

    const token = `${randomPart}.${expiresAt}.${signature}`;

    this.sessions.set(token, {
      userId: "dcg-admin-01",
      email,
      role: "admin",
      createdAt: now,
      expiresAt,
    });

    return token;
  }

  /**
   * Validates a session token with signature verification and expiry check
   */
  public validateSession(token: string): SessionData | null {
    if (!token || typeof token !== "string") return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [randomPart, expiresAtStr, signature] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);

    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      this.sessions.delete(token);
      return null;
    }

    // Verify cryptographic signature
    const expectedSignature = crypto
      .createHmac("sha256", this.sessionSecret)
      .update(`${randomPart}:${expiresAtStr}`)
      .digest("hex");

    const a = Buffer.from(signature, "hex");
    const b = Buffer.from(expectedSignature, "hex");
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return null;
    }

    const session = this.sessions.get(token);
    if (!session) return null;

    return session;
  }

  /**
   * Invalidate a session (logout)
   */
  public destroySession(token: string): boolean {
    return this.sessions.delete(token);
  }

  /**
   * Clean up expired sessions from memory
   */
  private cleanupExpiredSessions() {
    const now = Date.now();
    for (const [token, session] of this.sessions.entries()) {
      if (now > session.expiresAt) {
        this.sessions.delete(token);
      }
    }
  }

  public getAdminEmail(): string {
    return this.adminEmail;
  }
}

export const AuthService = new AuthServiceClass();
