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
// GET all contact messages (Admin Protected)
router.get("/", auth_1.requireAdminAuth, async (req, res) => {
    try {
        const db = await storage_1.StorageService.getDatabase();
        const { status } = req.query;
        let results = [...db.contacts];
        if (status && typeof status === "string") {
            results = results.filter((msg) => msg.status === status);
        }
        res.json({ success: true, count: results.length, data: results });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to retrieve messages" });
    }
});
// POST new contact message (Public - rate-limited, validated, sanitized)
router.post("/", rateLimiter_1.publicFormLimiter, sanitizer_1.sanitizeRequest, validator_1.validateContact, async (req, res) => {
    try {
        const { name, email, phone, organization, subject, message } = req.body;
        const newContact = {
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
        await storage_1.StorageService.updateDatabase((db) => {
            db.contacts.unshift(newContact);
        });
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, {
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
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to send message" });
    }
});
// PATCH status (read / replied) (Admin Protected)
router.patch("/:id/status", auth_1.requireAdminAuth, sanitizer_1.sanitizeRequest, async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["unread", "read", "replied"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
            });
        }
        let updatedItem = null;
        await storage_1.StorageService.updateDatabase((db) => {
            const idx = db.contacts.findIndex((msg) => msg.id === req.params.id);
            if (idx !== -1) {
                db.contacts[idx].status = status;
                updatedItem = db.contacts[idx];
            }
        });
        if (!updatedItem) {
            return res.status(404).json({ success: false, error: "Message not found" });
        }
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, {
            action: "CONTACT_STATUS_UPDATED",
            msgId: req.params.id,
            newStatus: status,
        });
        res.json({ success: true, data: updatedItem });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to update message" });
    }
});
// DELETE message (Admin Protected)
router.delete("/:id", auth_1.requireAdminAuth, async (req, res) => {
    try {
        let deleted = false;
        await storage_1.StorageService.updateDatabase((db) => {
            const prevLen = db.contacts.length;
            db.contacts = db.contacts.filter((msg) => msg.id !== req.params.id);
            deleted = db.contacts.length < prevLen;
        });
        if (!deleted) {
            return res.status(404).json({ success: false, error: "Message not found" });
        }
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, {
            action: "CONTACT_MESSAGE_DELETED",
            msgId: req.params.id,
        });
        res.json({ success: true, message: "Contact message deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to delete message" });
    }
});
exports.default = router;
