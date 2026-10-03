"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeHtml = escapeHtml;
exports.sanitizeValue = sanitizeValue;
exports.sanitizeRequest = sanitizeRequest;
/**
 * Escapes characters that have HTML/scripting significance
 */
function escapeHtml(str) {
    if (typeof str !== "string")
        return str;
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
}
/**
 * Deep sanitization of objects to prevent XSS, prototype pollution, and control characters
 */
function sanitizeValue(value) {
    if (value === null || value === undefined) {
        return value;
    }
    if (typeof value === "string") {
        // 1. Remove ASCII control characters (except newline, carriage return, tab)
        let sanitized = value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
        // 2. Strip dangerous script tags or javascript: pseudo-protocols
        sanitized = sanitized
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
            .replace(/javascript:/gi, "")
            .replace(/vbscript:/gi, "")
            .replace(/on\w+\s*=/gi, ""); // strip event handlers like onerror=, onclick=
        return sanitized.trim();
    }
    if (Array.isArray(value)) {
        return value.map((item) => sanitizeValue(item));
    }
    if (typeof value === "object") {
        const cleanObj = {};
        for (const key of Object.keys(value)) {
            // Prevent prototype pollution
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
                continue;
            }
            cleanObj[key] = sanitizeValue(value[key]);
        }
        return cleanObj;
    }
    return value;
}
/**
 * Express middleware to sanitize body, query, and params
 */
function sanitizeRequest(req, _res, next) {
    if (req.body && typeof req.body === "object") {
        req.body = sanitizeValue(req.body);
    }
    if (req.query && typeof req.query === "object") {
        req.query = sanitizeValue(req.query);
    }
    if (req.params && typeof req.params === "object") {
        req.params = sanitizeValue(req.params);
    }
    next();
}
