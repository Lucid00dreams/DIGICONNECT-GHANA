"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../services/storage");
const router = (0, express_1.Router)();
// GET all programs
router.get("/", async (_req, res) => {
    try {
        const db = await storage_1.StorageService.getDatabase();
        res.json({ success: true, count: db.programs.length, data: db.programs });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
// GET single program by slug
router.get("/:slug", async (req, res) => {
    try {
        const db = await storage_1.StorageService.getDatabase();
        const program = db.programs.find((p) => p.slug === req.params.slug);
        if (!program) {
            return res.status(404).json({ success: false, error: "Program not found" });
        }
        res.json({ success: true, data: program });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.default = router;
