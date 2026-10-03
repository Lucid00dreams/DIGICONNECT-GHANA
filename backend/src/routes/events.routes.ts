import { Router, Request, Response } from "express";
import { StorageService } from "../services/storage";
import { DCGEvent } from "../types";
import { requireAdminAuth } from "../middleware/auth";
import { sanitizeRequest } from "../middleware/sanitizer";
import { auditLogger } from "../services/auditLogger";

const router = Router();

// GET all events (Public)
router.get("/", async (req: Request, res: Response) => {
  try {
    const db = await StorageService.getDatabase();
    const { status, category } = req.query;

    let results = [...db.events];
    if (status && typeof status === "string") {
      results = results.filter((ev) => ev.status === status);
    }
    if (category && typeof category === "string") {
      results = results.filter((ev) => ev.category === category);
    }

    res.json({ success: true, count: results.length, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to retrieve events" });
  }
});

// GET single event by id or slug (Public)
router.get("/:idOrSlug", async (req: Request, res: Response) => {
  try {
    const db = await StorageService.getDatabase();
    const { idOrSlug } = req.params;
    const found = db.events.find((ev) => ev.id === idOrSlug || ev.slug === idOrSlug);

    if (!found) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }

    res.json({ success: true, data: found });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to retrieve event" });
  }
});

// POST new event (Admin Protected)
router.post("/", requireAdminAuth, sanitizeRequest, async (req: Request, res: Response) => {
  try {
    const { title, slug, date, endDate, time, location, description, image, category, status, registrationUrl } = req.body;

    if (!title || !date || !time || !location) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: title, date, time, and location are required.",
      });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const validCategories = ["workshop", "bootcamp", "meetup", "conference", "hackathon"] as const;
    const safeCategory = validCategories.includes(category) ? category : "workshop";

    const newEvent: DCGEvent = {
      id: `event-${Date.now()}`,
      title: String(title).slice(0, 150),
      slug: generatedSlug.slice(0, 150),
      date: String(date).slice(0, 50),
      endDate: endDate ? String(endDate).slice(0, 50) : undefined,
      time: String(time).slice(0, 50),
      location: String(location).slice(0, 150),
      description: description ? String(description).slice(0, 3000) : "",
      image: image ? String(image).slice(0, 255) : "/images/events/workshop.jpg",
      category: safeCategory,
      status: status === "past" ? "past" : "upcoming",
      registrationUrl: registrationUrl ? String(registrationUrl).slice(0, 255) : "/events#register",
    };

    await StorageService.updateDatabase((db) => {
      db.events.push(newEvent);
    });

    auditLogger.log("ADMIN_ACTION", req, {
      action: "EVENT_CREATED",
      eventId: newEvent.id,
      title: newEvent.title,
    });

    res.status(201).json({ success: true, data: newEvent });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to create event" });
  }
});

// DELETE event (Admin Protected)
router.delete("/:id", requireAdminAuth, async (req: Request, res: Response) => {
  try {
    let deleted = false;
    await StorageService.updateDatabase((db) => {
      const prevLen = db.events.length;
      db.events = db.events.filter((ev) => ev.id !== req.params.id);
      deleted = db.events.length < prevLen;
    });

    if (!deleted) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }

    auditLogger.log("ADMIN_ACTION", req, {
      action: "EVENT_DELETED",
      eventId: req.params.id,
    });

    res.json({ success: true, message: "Event deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to delete event" });
  }
});

export default router;
