import { Request, Response, NextFunction } from "express";
import { auditLogger } from "../services/auditLogger";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[0-9+\s()\-]{6,25}$/;

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  return email.length <= 120 && EMAIL_REGEX.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") return true; // optional in some forms
  return PHONE_REGEX.test(phone.trim());
}

/**
 * Validates application submission payload
 */
export function validateApplication(req: Request, res: Response, next: NextFunction) {
  const { fullName, email, phone, age, location, programOfInterest, educationLevel, digitalExperience, motivation } = req.body;

  if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2 || fullName.length > 100) {
    auditLogger.log("INPUT_VALIDATION_ERROR", req, { field: "fullName", reason: "Invalid length" });
    return res.status(400).json({
      success: false,
      error: "Full name is required and must be between 2 and 100 characters.",
    });
  }

  if (!isValidEmail(email)) {
    auditLogger.log("INPUT_VALIDATION_ERROR", req, { field: "email", reason: "Invalid format" });
    return res.status(400).json({
      success: false,
      error: "A valid email address is required (max 120 characters).",
    });
  }

  if (phone && !isValidPhone(phone)) {
    return res.status(400).json({
      success: false,
      error: "Phone number format is invalid. Please use standard phone format.",
    });
  }

  if (!programOfInterest || typeof programOfInterest !== "string" || programOfInterest.length > 100) {
    return res.status(400).json({
      success: false,
      error: "Program of interest is required.",
    });
  }

  if (motivation && typeof motivation === "string" && motivation.length > 3000) {
    return res.status(400).json({
      success: false,
      error: "Motivation statement must not exceed 3000 characters.",
    });
  }

  // Whitelist fields to prevent mass assignment
  req.body = {
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? String(phone).trim() : "",
    age: age ? String(age).slice(0, 10) : "",
    location: location ? String(location).slice(0, 100).trim() : "",
    programOfInterest: programOfInterest.trim(),
    educationLevel: educationLevel ? String(educationLevel).slice(0, 100).trim() : "",
    digitalExperience: digitalExperience ? String(digitalExperience).slice(0, 50).trim() : "beginner",
    motivation: motivation ? String(motivation).slice(0, 3000).trim() : "",
  };

  next();
}

/**
 * Validates contact form submission payload
 */
export function validateContact(req: Request, res: Response, next: NextFunction) {
  const { name, email, phone, organization, subject, message } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
    return res.status(400).json({
      success: false,
      error: "Name is required and must be between 2 and 100 characters.",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "A valid email address is required.",
    });
  }

  if (phone && !isValidPhone(phone)) {
    return res.status(400).json({
      success: false,
      error: "Phone number format is invalid.",
    });
  }

  if (!subject || typeof subject !== "string" || subject.trim().length < 2 || subject.length > 150) {
    return res.status(400).json({
      success: false,
      error: "Subject is required (max 150 characters).",
    });
  }

  if (!message || typeof message !== "string" || message.trim().length < 5 || message.length > 3000) {
    return res.status(400).json({
      success: false,
      error: "Message is required and must be between 5 and 3000 characters.",
    });
  }

  // Whitelist fields
  req.body = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? String(phone).trim() : "",
    organization: organization ? String(organization).slice(0, 100).trim() : "",
    subject: subject.trim(),
    message: message.trim(),
  };

  next();
}

/**
 * Validates involvement inquiry (volunteer/partner/donate)
 */
export function validateInvolvement(req: Request, res: Response, next: NextFunction) {
  const { type, fullName, email, phone, organization, category, message } = req.body;

  const validTypes = ["volunteer", "partner", "donate", "general"];
  if (!type || !validTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      error: `Invalid involvement type. Must be one of: ${validTypes.join(", ")}`,
    });
  }

  if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2 || fullName.length > 100) {
    return res.status(400).json({
      success: false,
      error: "Full name is required (between 2 and 100 characters).",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "A valid email address is required.",
    });
  }

  if (phone && !isValidPhone(phone)) {
    return res.status(400).json({
      success: false,
      error: "Phone number format is invalid.",
    });
  }

  if (message && typeof message === "string" && message.length > 3000) {
    return res.status(400).json({
      success: false,
      error: "Message must not exceed 3000 characters.",
    });
  }

  req.body = {
    type,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? String(phone).trim() : "",
    organization: organization ? String(organization).slice(0, 100).trim() : "",
    category: category ? String(category).slice(0, 50).trim() : "",
    message: message ? String(message).slice(0, 3000).trim() : "",
  };

  next();
}
