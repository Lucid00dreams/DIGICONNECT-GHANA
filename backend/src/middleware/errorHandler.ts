import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // Log diagnostic error on server side only
  console.error(`[Security Safe Error Logger] [${new Date().toISOString()}] ${req.method} ${req.originalUrl}:`, err.message || err);

  const status = typeof err.status === "number" ? err.status : typeof err.statusCode === "number" ? err.statusCode : 500;
  
  // Safe generic message in production to prevent information disclosure
  const isProduction = process.env.NODE_ENV === "production";
  let message = err.message || "An unexpected error occurred.";

  if (isProduction && status === 500) {
    message = "An internal server error occurred. Please contact the administrator.";
  }

  res.status(status).json({
    success: false,
    error: message,
  });
}
