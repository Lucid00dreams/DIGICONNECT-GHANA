"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../services/storage");
const auth_1 = require("../middleware/auth");
const sanitizer_1 = require("../middleware/sanitizer");
const auditLogger_1 = require("../services/auditLogger");
const router = (0, express_1.Router)();
// GET all gallery items (Public)
router.get("/", async (req, res) => {
    try {
        const db = await storage_1.StorageService.getDatabase();
        const { category } = req.query;
        let results = [...db.gallery];
        if (category && typeof category === "string") {
            results = results.filter((item) => item.category.toLowerCase() === category.toLowerCase());
        }
        res.json({ success: true, count: results.length, data: results });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to retrieve gallery items" });
    }
});
// POST new gallery item (Admin Protected)
router.post("/", auth_1.requireAdminAuth, sanitizer_1.sanitizeRequest, async (req, res) => {
    try {
        const { src, alt, category, caption } = req.body;
        if (!src || !alt) {
            return res.status(400).json({
                success: false,
                error: "Missing required fields: src and alt are required.",
            });
        }
        const newItem = {
            id: `gal-${Date.now()}`,
            src: String(src).slice(0, 500),
            alt: String(alt).slice(0, 200),
            category: category ? String(category).slice(0, 50) : "General",
            caption: caption ? String(caption).slice(0, 300) : String(alt).slice(0, 200),
            dateAdded: new Date().toISOString().split("T")[0],
        };
        await storage_1.StorageService.updateDatabase((db) => {
            db.gallery.unshift(newItem);
        });
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, {
            action: "GALLERY_ITEM_ADDED",
            itemId: newItem.id,
        });
        res.status(201).json({ success: true, data: newItem });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to add gallery item" });
    }
});
// DELETE gallery item (Admin Protected)
router.delete("/:id", auth_1.requireAdminAuth, async (req, res) => {
    try {
        let deleted = false;
        await storage_1.StorageService.updateDatabase((db) => {
            const prevLen = db.gallery.length;
            db.gallery = db.gallery.filter((item) => item.id !== req.params.id);
            deleted = db.gallery.length < prevLen;
        });
        if (!deleted) {
            return res.status(404).json({ success: false, error: "Gallery item not found" });
        }
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, {
            action: "GALLERY_ITEM_DELETED",
            itemId: req.params.id,
        });
        res.json({ success: true, message: "Gallery item deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to delete gallery item" });
    }
});
exports.default = router;
