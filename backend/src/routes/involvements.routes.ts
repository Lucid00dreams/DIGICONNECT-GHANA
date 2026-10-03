import { Router, Request, Response } from "express";
import { StorageService } from "../services/storage";
import { InvolvementSubmission } from "../types";
import { requireAdminAuth } from "../middleware/auth";
import { publicFormLimiter } from "../middleware/rateLimiter";
import { validateInvolvement } from "../middleware/validator";
import { sanitizeRequest } from "../middleware/sanitizer";
import { auditLogger } from "../services/auditLogger";

const router = Router();

// GET all involvement inquiries (Admin Protected)
router.get("/", requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const db = await StorageService.getDatabase();
    const { type, status } = req.query;

    let results = [...db.involvements];
    if (type && typeof type === "string") {
      results = results.filter((inv) => inv.type === type);
    }
    if (status && typeof status === "string") {
      results = results.filter((inv) => inv.status === status);
    }

    res.json({ success: true, count: results.length, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to retrieve involvement inquiries" });
  }
});

// POST new involvement submission (Public - rate-limited, validated, sanitized)
router.post(
  "/",
  publicFormLimiter,
  sanitizeRequest,
  validateInvolvement,
  async (req: Request, res: Response) => {
    try {
      const { type, fullName, email, phone, organization, category, message } = req.body;

      const newInvolvement: InvolvementSubmission = {
        id: `inv-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        type,
        fullName,
        email,
        phone,
        organization,
        category,
        message,
        status: "new",
        date: new Date().toISOString().split("T")[0],
      };

      await StorageService.updateDatabase((db) => {
        db.involvements.unshift(newInvolvement);
      });

      auditLogger.log("ADMIN_ACTION", req, {
        action: "NEW_INVOLVEMENT_SUBMISSION",
        type,
      });

      res.status(201).json({
        success: true,
        message: "Thank you for getting involved! Our team will contact you shortly.",
        data: {
          id: newInvolvement.id,
          type: newInvolvement.type,
          status: newInvolvement.status,
          date: newInvolvement.date,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: "Failed to submit inquiry" });
    }
  }
);

// PATCH status (Admin Protected)
router.patch("/:id/status", requireAdminAuth, sanitizeRequest, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const validStatuses = ["new", "reviewed", "contacted", "archived"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    let updatedItem: InvolvementSubmission | null = null;

    await StorageService.updateDatabase((db) => {
      const idx = db.involvements.findIndex((inv) => inv.id === req.params.id);
      if (idx !== -1) {
        db.involvements[idx].status = status;
        updatedItem = db.involvements[idx];
      }
    });

    if (!updatedItem) {
      return res.status(404).json({ success: false, error: "Record not found" });
    }

    auditLogger.log("ADMIN_ACTION", req, {
      action: "INVOLVEMENT_STATUS_UPDATED",
      id: req.params.id,
      newStatus: status,
    });

    res.json({ success: true, data: updatedItem });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to update record" });
  }
});

// DELETE inquiry (Admin Protected)
router.delete("/:id", requireAdminAuth, async (req: Request, res: Response) => {
  try {
    let deleted = false;
    await StorageService.updateDatabase((db) => {
      const prevLen = db.involvements.length;
      db.involvements = db.involvements.filter((inv) => inv.id !== req.params.id);
      deleted = db.involvements.length < prevLen;
    });

    if (!deleted) {
      return res.status(404).json({ success: false, error: "Record not found" });
    }

    auditLogger.log("ADMIN_ACTION", req, {
      action: "INVOLVEMENT_RECORD_DELETED",
      id: req.params.id,
    });

    res.json({ success: true, message: "Record deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to delete record" });
  }
});

export default router;
