"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../services/storage");
const auth_1 = require("../middleware/auth");
const rateLimiter_1 = require("../middleware/rateLimiter");
const validator_1 = require("../middleware/validator");
const sanitizer_1 = require("../middleware/sanitizer");
const auditLogger_1 = require("../services/auditLogger");
const router = (0, express_1.Router)();
// GET all involvement inquiries (Admin Protected)
router.get("/", auth_1.requireAdminAuth, async (req, res) => {
    try {
        const db = await storage_1.StorageService.getDatabase();
        const { type, status } = req.query;
        let results = [...db.involvements];
        if (type && typeof type === "string") {
            results = results.filter((inv) => inv.type === type);
        }
        if (status && typeof status === "string") {
            results = results.filter((inv) => inv.status === status);
        }
        res.json({ success: true, count: results.length, data: results });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to retrieve involvement inquiries" });
    }
});
// POST new involvement submission (Public - rate-limited, validated, sanitized)
router.post("/", rateLimiter_1.publicFormLimiter, sanitizer_1.sanitizeRequest, validator_1.validateInvolvement, async (req, res) => {
    try {
        const { type, fullName, email, phone, organization, category, message } = req.body;
        const newInvolvement = {
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
        await storage_1.StorageService.updateDatabase((db) => {
            db.involvements.unshift(newInvolvement);
        });
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, {
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
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to submit inquiry" });
    }
});
// PATCH status (Admin Protected)
router.patch("/:id/status", auth_1.requireAdminAuth, sanitizer_1.sanitizeRequest, async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["new", "reviewed", "contacted", "archived"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
            });
        }
        let updatedItem = null;
        await storage_1.StorageService.updateDatabase((db) => {
            const idx = db.involvements.findIndex((inv) => inv.id === req.params.id);
            if (idx !== -1) {
                db.involvements[idx].status = status;
                updatedItem = db.involvements[idx];
            }
        });
        if (!updatedItem) {
            return res.status(404).json({ success: false, error: "Record not found" });
        }
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, {
            action: "INVOLVEMENT_STATUS_UPDATED",
            id: req.params.id,
            newStatus: status,
        });
        res.json({ success: true, data: updatedItem });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to update record" });
    }
});
// DELETE inquiry (Admin Protected)
router.delete("/:id", auth_1.requireAdminAuth, async (req, res) => {
    try {
        let deleted = false;
        await storage_1.StorageService.updateDatabase((db) => {
            const prevLen = db.involvements.length;
            db.involvements = db.involvements.filter((inv) => inv.id !== req.params.id);
            deleted = db.involvements.length < prevLen;
        });
        if (!deleted) {
            return res.status(404).json({ success: false, error: "Record not found" });
        }
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, {
            action: "INVOLVEMENT_RECORD_DELETED",
            id: req.params.id,
        });
        res.json({ success: true, message: "Record deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to delete record" });
    }
});
exports.default = router;
