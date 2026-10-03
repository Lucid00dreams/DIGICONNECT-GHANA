import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import { auditLogger } from "../services/auditLogger";

const uploadDir = process.env.UPLOAD_DIR
  ? path.resolve(process.cwd(), process.env.UPLOAD_DIR)
  : path.resolve(process.cwd(), "uploads");

// Ensure upload directory exists synchronously at startup
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Whitelist of strictly safe raster image extensions (NO SVG, NO HTML, NO EXECUTABLES)
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const ALLOWED_MIMES = new Set([
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    // Cryptographically random 32-character hexadecimal filename
    const safeName = crypto.randomBytes(16).toString("hex");
    cb(null, `${safeName}${ext}`);
  },
});

export const multerUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB strict limit
    files: 1,
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    // Check extension
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return cb(
        new Error(
          "Invalid file type. Only standard raster images (.jpg, .jpeg, .png, .webp, .gif) are permitted."
        )
      );
    }

    // Check MIME type reported by browser
    if (!ALLOWED_MIMES.has(file.mimetype.toLowerCase())) {
      return cb(
        new Error("Invalid MIME type. Uploaded file does not appear to be an image.")
      );
    }

    cb(null, true);
  },
});

/**
 * Validates the file magic bytes (file signature) after upload to prevent MIME spoofing
 */
export function validateImageSignature(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;

  try {
    const fd = fs.openSync(filePath, "r");
    const buffer = Buffer.alloc(12);
    fs.readSync(fd, buffer, 0, 12, 0);
    fs.closeSync(fd);

    let isValid = false;

    // JPEG: FF D8 FF
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      isValid = true;
    }
    // PNG: 89 50 4E 47 0D 0A 1A 0A
    else if (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    ) {
      isValid = true;
    }
    // GIF: 47 49 46 38 ("GIF8")
    else if (
      buffer[0] === 0x47 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x38
    ) {
      isValid = true;
    }
    // WebP: RIFF ... WEBP (buffer[0-3] === "RIFF" && buffer[8-11] === "WEBP")
    else if (
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP"
    ) {
      isValid = true;
    }

    if (!isValid) {
      // Signature mismatch - potential polyglot or executable disguise!
      fs.unlinkSync(filePath);
      auditLogger.log("FILE_REJECTED", req, {
        originalName: req.file.originalname,
        reason: "Magic byte signature mismatch",
      });

      return res.status(400).json({
        success: false,
        error:
          "Security rejection: Uploaded file contents do not match genuine image format signatures.",
      });
    }

    auditLogger.log("FILE_UPLOAD", req, {
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });

    next();
  } catch (err: any) {
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch {}
    }
    return res.status(500).json({
      success: false,
      error: "Error validating uploaded file integrity.",
    });
  }
}
