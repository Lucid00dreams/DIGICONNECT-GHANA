import { Router, Request, Response } from "express";
import { multerUpload, validateImageSignature } from "../middleware/upload";
import { requireAdminAuth } from "../middleware/auth";

const router = Router();

// POST upload image (Protected: requires admin authentication)
router.post(
  "/",
  requireAdminAuth,
  multerUpload.single("file"),
  validateImageSignature,
  (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: "No image file provided" });
      }

      const port = process.env.PORT || 5000;
      const protocol = req.protocol;
      const host = req.get("host") || `localhost:${port}`;
      const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

      res.status(201).json({
        success: true,
        message: "File uploaded successfully and verified",
        url: fileUrl,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: "Failed to process upload" });
    }
  }
);

export default router;
