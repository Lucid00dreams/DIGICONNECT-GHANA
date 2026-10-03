"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../services/storage");
const router = (0, express_1.Router)();
// GET impact stats & dashboard summary
router.get("/", async (_req, res) => {
    try {
        const db = await storage_1.StorageService.getDatabase();
        const summary = {
            totalApplications: db.applications.length,
            pendingApplications: db.applications.filter((a) => a.status === "pending").length,
            acceptedApplications: db.applications.filter((a) => a.status === "accepted").length,
            unreadMessages: db.contacts.filter((c) => c.status === "unread").length,
            totalInvolvements: db.involvements.length,
            totalEvents: db.events.length,
            totalGallery: db.gallery.length,
            totalNews: db.news.length,
        };
        res.json({
            success: true,
            impactStats: db.impactStats,
            summary,
            contactInfo: db.contactInfo,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.default = router;
