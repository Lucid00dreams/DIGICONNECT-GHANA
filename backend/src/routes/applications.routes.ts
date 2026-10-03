import { Router, Request, Response } from "express";
import { StorageService } from "../services/storage";
import { ApplicationSubmission } from "../types";
import { requireAdminAuth } from "../middleware/auth";
import { publicFormLimiter } from "../middleware/rateLimiter";
import { validateApplication } from "../middleware/validator";
import { sanitizeRequest } from "../middleware/sanitizer";
import { auditLogger } from "../services/auditLogger";

const router = Router();

// GET all applications (Admin Protected - prevents unauthorized PII leakage)
router.get("/", requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const db = await StorageService.getDatabase();
    const { status, program } = req.query;

    let results = [...db.applications];
    if (status && typeof status === "string") {
      results = results.filter((app) => app.status === status);
    }
    if (program && typeof program === "string") {
      results = results.filter((app) => app.programOfInterest === program);
    }

    res.json({ success: true, count: results.length, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to retrieve applications" });
  }
});

// GET single application (Admin Protected)
router.get("/:id", requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const db = await StorageService.getDatabase();
    const found = db.applications.find((app) => app.id === req.params.id);
    if (!found) {
      return res.status(404).json({ success: false, error: "Application not found" });
    }
    res.json({ success: true, data: found });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to retrieve application" });
  }
});

// POST new application (Public - rate-limited, validated, sanitized)
router.post(
  "/",
  publicFormLimiter,
  sanitizeRequest,
  validateApplication,
  async (req: Request, res: Response) => {
    try {
      const {
        fullName,
        email,
        phone,
        age,
        location,
        programOfInterest,
        educationLevel,
        digitalExperience,
        motivation,
      } = req.body;

      const newApp: ApplicationSubmission = {
        id: `app-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        fullName,
        email,
        phone,
        age,
        location,
        programOfInterest,
        educationLevel,
        digitalExperience,
        motivation,
        status: "pending",
        date: new Date().toISOString().split("T")[0],
      };

      await StorageService.updateDatabase((db) => {
        db.applications.unshift(newApp);
      });

      auditLogger.log("ADMIN_ACTION", req, {
        action: "NEW_APPLICATION_SUBMITTED",
        program: programOfInterest,
      });

      res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        data: {
          id: newApp.id,
          fullName: newApp.fullName,
          programOfInterest: newApp.programOfInterest,
          status: newApp.status,
          date: newApp.date,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: "Failed to submit application" });
    }
  }
);

// PATCH status (Admin Protected)
router.patch("/:id/status", requireAdminAuth, sanitizeRequest, async (req: Request, res: Response) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ["pending", "under_review", "accepted", "rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    let updatedItem: ApplicationSubmission | null = null;

    await StorageService.updateDatabase((db) => {
      const idx = db.applications.findIndex((app) => app.id === req.params.id);
      if (idx !== -1) {
        db.applications[idx].status = status;
        if (notes !== undefined) {
          db.applications[idx].notes = String(notes).slice(0, 2000);
        }
        updatedItem = db.applications[idx];
      }
    });

    if (!updatedItem) {
      return res.status(404).json({ success: false, error: "Application not found" });
    }

    auditLogger.log("ADMIN_ACTION", req, {
      action: "APPLICATION_STATUS_UPDATED",
      appId: req.params.id,
      newStatus: status,
    });

    res.json({ success: true, data: updatedItem });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to update application" });
  }
});

// DELETE application (Admin Protected)
router.delete("/:id", requireAdminAuth, async (req: Request, res: Response) => {
  try {
    let deleted = false;
    await StorageService.updateDatabase((db) => {
      const prevLen = db.applications.length;
      db.applications = db.applications.filter((app) => app.id !== req.params.id);
      deleted = db.applications.length < prevLen;
    });

    if (!deleted) {
      return res.status(404).json({ success: false, error: "Application not found" });
    }

    auditLogger.log("ADMIN_ACTION", req, {
      action: "APPLICATION_DELETED",
      appId: req.params.id,
    });

    res.json({ success: true, message: "Application deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to delete application" });
  }
});

export default router;
