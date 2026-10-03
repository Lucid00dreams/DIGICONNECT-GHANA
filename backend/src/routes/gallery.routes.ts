import { Router, Request, Response } from "express";
import { StorageService } from "../services/storage";
import { GalleryItem } from "../types";
import { requireAdminAuth } from "../middleware/auth";
import { sanitizeRequest } from "../middleware/sanitizer";
import { auditLogger } from "../services/auditLogger";

const router = Router();

// GET all gallery items (Public)
router.get("/", async (req: Request, res: Response) => {
  try {
    const db = await StorageService.getDatabase();
    const { category } = req.query;

    let results = [...db.gallery];
    if (category && typeof category === "string") {
      results = results.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }

    res.json({ success: true, count: results.length, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to retrieve gallery items" });
  }
});

// POST new gallery item (Admin Protected)
router.post("/", requireAdminAuth, sanitizeRequest, async (req: Request, res: Response) => {
  try {
    const { src, alt, category, caption } = req.body;

    if (!src || !alt) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: src and alt are required.",
      });
    }

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      src: String(src).slice(0, 500),
      alt: String(alt).slice(0, 200),
      category: category ? String(category).slice(0, 50) : "General",
      caption: caption ? String(caption).slice(0, 300) : String(alt).slice(0, 200),
      dateAdded: new Date().toISOString().split("T")[0],
    };

    await StorageService.updateDatabase((db) => {
      db.gallery.unshift(newItem);
    });

    auditLogger.log("ADMIN_ACTION", req, {
      action: "GALLERY_ITEM_ADDED",
      itemId: newItem.id,
    });

    res.status(201).json({ success: true, data: newItem });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to add gallery item" });
  }
});

// DELETE gallery item (Admin Protected)
router.delete("/:id", requireAdminAuth, async (req: Request, res: Response) => {
  try {
    let deleted = false;
    await StorageService.updateDatabase((db) => {
      const prevLen = db.gallery.length;
      db.gallery = db.gallery.filter((item) => item.id !== req.params.id);
      deleted = db.gallery.length < prevLen;
    });

    if (!deleted) {
      return res.status(404).json({ success: false, error: "Gallery item not found" });
    }

    auditLogger.log("ADMIN_ACTION", req, {
      action: "GALLERY_ITEM_DELETED",
      itemId: req.params.id,
    });

    res.json({ success: true, message: "Gallery item deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to delete gallery item" });
  }
});

export default router;
