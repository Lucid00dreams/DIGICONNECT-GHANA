"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../middleware/upload");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// POST upload image (Protected: requires admin authentication)
router.post("/", auth_1.requireAdminAuth, upload_1.multerUpload.single("file"), upload_1.validateImageSignature, (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "No image file provided" });
        }
        const port = process.env.PORT || 5000;
        const protocol = req.protocol;
        const host = req.get("host") || `localhost:${port}`;
        const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
        res.status(201).json({
            success: true,
            message: "File uploaded successfully and verified",
            url: fileUrl,
            filename: req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to process upload" });
    }
});
exports.default = router;
