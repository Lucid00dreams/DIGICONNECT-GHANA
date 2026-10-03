import { Router, Request, Response } from "express";
import { StorageService } from "../services/storage";
import { ContactSubmission } from "../types";
import { requireAdminAuth } from "../middleware/auth";
import { publicFormLimiter } from "../middleware/rateLimiter";
import { validateContact } from "../middleware/validator";
import { sanitizeRequest } from "../middleware/sanitizer";
import { auditLogger } from "../services/auditLogger";

const router = Router();

// GET all contact messages (Admin Protected)
router.get("/", requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const db = await StorageService.getDatabase();
    const { status } = req.query;

    let results = [...db.contacts];
    if (status && typeof status === "string") {
      results = results.filter((msg) => msg.status === status);
    }

    res.json({ success: true, count: results.length, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to retrieve messages" });
  }
});

// POST new contact message (Public - rate-limited, validated, sanitized)
router.post(
  "/",
  publicFormLimiter,
  sanitizeRequest,
  validateContact,
  async (req: Request, res: Response) => {
    try {
      const { name, email, phone, organization, subject, message } = req.body;

      const newContact: ContactSubmission = {
        id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name,
        email,
        phone,
        organization,
        subject,
        message,
        status: "unread",
        date: new Date().toISOString().split("T")[0],
      };

      await StorageService.updateDatabase((db) => {
        db.contacts.unshift(newContact);
      });

      auditLogger.log("ADMIN_ACTION", req, {
        action: "NEW_CONTACT_MESSAGE",
        subject,
      });

      res.status(201).json({
        success: true,
        message: "Message sent successfully. Our team will get back to you shortly.",
        data: {
          id: newContact.id,
          subject: newContact.subject,
          status: newContact.status,
          date: newContact.date,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: "Failed to send message" });
    }
  }
);

// PATCH status (read / replied) (Admin Protected)
router.patch("/:id/status", requireAdminAuth, sanitizeRequest, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const validStatuses = ["unread", "read", "replied"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    let updatedItem: ContactSubmission | null = null;

    await StorageService.updateDatabase((db) => {
      const idx = db.contacts.findIndex((msg) => msg.id === req.params.id);
      if (idx !== -1) {
        db.contacts[idx].status = status;
        updatedItem = db.contacts[idx];
      }
    });

    if (!updatedItem) {
      return res.status(404).json({ success: false, error: "Message not found" });
    }

    auditLogger.log("ADMIN_ACTION", req, {
      action: "CONTACT_STATUS_UPDATED",
      msgId: req.params.id,
      newStatus: status,
    });

    res.json({ success: true, data: updatedItem });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to update message" });
  }
});

// DELETE message (Admin Protected)
router.delete("/:id", requireAdminAuth, async (req: Request, res: Response) => {
  try {
    let deleted = false;
    await StorageService.updateDatabase((db) => {
      const prevLen = db.contacts.length;
      db.contacts = db.contacts.filter((msg) => msg.id !== req.params.id);
      deleted = db.contacts.length < prevLen;
    });

    if (!deleted) {
      return res.status(404).json({ success: false, error: "Message not found" });
    }

    auditLogger.log("ADMIN_ACTION", req, {
      action: "CONTACT_MESSAGE_DELETED",
      msgId: req.params.id,
    });

    res.json({ success: true, message: "Contact message deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to delete message" });
  }
});

export default router;
