"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../services/storage");
const auth_1 = require("../middleware/auth");
const sanitizer_1 = require("../middleware/sanitizer");
const auditLogger_1 = require("../services/auditLogger");
const router = (0, express_1.Router)();
// GET all events (Public)
router.get("/", async (req, res) => {
    try {
        const db = await storage_1.StorageService.getDatabase();
        const { status, category } = req.query;
        let results = [...db.events];
        if (status && typeof status === "string") {
            results = results.filter((ev) => ev.status === status);
        }
        if (category && typeof category === "string") {
            results = results.filter((ev) => ev.category === category);
        }
        res.json({ success: true, count: results.length, data: results });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to retrieve events" });
    }
});
// GET single event by id or slug (Public)
router.get("/:idOrSlug", async (req, res) => {
    try {
        const db = await storage_1.StorageService.getDatabase();
        const { idOrSlug } = req.params;
        const found = db.events.find((ev) => ev.id === idOrSlug || ev.slug === idOrSlug);
        if (!found) {
            return res.status(404).json({ success: false, error: "Event not found" });
        }
        res.json({ success: true, data: found });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to retrieve event" });
    }
});
// POST new event (Admin Protected)
router.post("/", auth_1.requireAdminAuth, sanitizer_1.sanitizeRequest, async (req, res) => {
    try {
        const { title, slug, date, endDate, time, location, description, image, category, status, registrationUrl } = req.body;
        if (!title || !date || !time || !location) {
            return res.status(400).json({
                success: false,
                error: "Missing required fields: title, date, time, and location are required.",
            });
        }
        const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const validCategories = ["workshop", "bootcamp", "meetup", "conference", "hackathon"];
        const safeCategory = validCategories.includes(category) ? category : "workshop";
        const newEvent = {
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
        await storage_1.StorageService.updateDatabase((db) => {
            db.events.push(newEvent);
        });
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, {
            action: "EVENT_CREATED",
            eventId: newEvent.id,
            title: newEvent.title,
        });
        res.status(201).json({ success: true, data: newEvent });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to create event" });
    }
});
// DELETE event (Admin Protected)
router.delete("/:id", auth_1.requireAdminAuth, async (req, res) => {
    try {
        let deleted = false;
        await storage_1.StorageService.updateDatabase((db) => {
            const prevLen = db.events.length;
            db.events = db.events.filter((ev) => ev.id !== req.params.id);
            deleted = db.events.length < prevLen;
        });
        if (!deleted) {
            return res.status(404).json({ success: false, error: "Event not found" });
        }
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, {
            action: "EVENT_DELETED",
            eventId: req.params.id,
        });
        res.json({ success: true, message: "Event deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to delete event" });
    }
});
exports.default = router;
