import { Router, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { auditLogger } from "../services/auditLogger";
import { authLimiter } from "../middleware/rateLimiter";

const router = Router();

// POST /api/auth/login - Admin authentication
router.post("/login", authLimiter, (req: Request, res: Response) => {
  try {
    const clientIp =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
      req.ip ||
      "127.0.0.1";

    // 1. Check lockout status
    const lockout = AuthService.isLockedOut(clientIp);
    if (lockout.locked) {
      auditLogger.log("AUTH_LOCKOUT", req, {
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

    const adminEmail = AuthService.getAdminEmail();
    const isEmailMatch = email.trim().toLowerCase() === adminEmail;
    const isPasswordMatch = isEmailMatch && AuthService.verifyPassword(password);

    if (!isEmailMatch || !isPasswordMatch) {
      const attempt = AuthService.recordFailedAttempt(clientIp);
      auditLogger.log("AUTH_FAILURE", req, {
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
    AuthService.recordSuccessfulLogin(clientIp);
    const token = AuthService.createSession(adminEmail);

    const isProduction = process.env.NODE_ENV === "production";

    // Set HttpOnly, SameSite, Secure cookie (supports cross-origin Vercel -> Render)
    res.cookie("dcg_session", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
      path: "/",
    });

    auditLogger.log("AUTH_SUCCESS", req, { email: adminEmail });

    res.json({
      success: true,
      message: "Authentication successful",
      user: {
        email: adminEmail,
        role: "admin",
      },
      token,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Authentication service error" });
  }
});

// GET /api/auth/verify - Verify session status
router.get("/verify", (req: Request, res: Response) => {
  try {
    const token =
      req.cookies?.dcg_session ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.substring(7).trim()
        : undefined);

    if (!token) {
      return res.status(401).json({ success: false, authenticated: false });
    }

    const session = AuthService.validateSession(token);
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
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Session verification error" });
  }
});

// POST /api/auth/logout - Invalidate session
router.post("/logout", (req: Request, res: Response) => {
  try {
    const token =
      req.cookies?.dcg_session ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.substring(7).trim()
        : undefined);

    if (token) {
      AuthService.destroySession(token);
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
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Logout error" });
  }
});

export default router;
