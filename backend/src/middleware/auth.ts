import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { auditLogger } from "../services/auditLogger";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: "admin";
  };
}

export function requireAdminAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  // 1. Check HttpOnly cookie
  const cookieToken = req.cookies?.dcg_session;

  // 2. Check Authorization header: Bearer <token>
  let headerToken: string | undefined;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    headerToken = authHeader.substring(7).trim();
  }

  // 3. Check X-Admin-Key header (for automated testing or internal service calls)
  const apiKey = req.headers["x-admin-key"] as string | undefined;
  const configuredApiKey = process.env.API_KEY || "dcg_api_key_7f8a9e0b1c2d3e4f5a6b7c8d9e0f";

  if (apiKey && apiKey === configuredApiKey) {
    req.user = {
      userId: "dcg-admin-service",
      email: AuthService.getAdminEmail(),
      role: "admin",
    };
    return next();
  }

  const token = cookieToken || headerToken;

  if (!token) {
    auditLogger.log("ACCESS_DENIED", req, {
      reason: "Missing authentication token or session cookie",
    });
    return res.status(401).json({
      success: false,
      error: "Authentication required. Please log in to access this resource.",
    });
  }

  const session = AuthService.validateSession(token);

  if (!session) {
    auditLogger.log("ACCESS_DENIED", req, {
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
