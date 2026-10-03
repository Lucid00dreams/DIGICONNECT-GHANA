import { Router, Request, Response } from "express";
import { StorageService } from "../services/storage";

const router = Router();

// GET impact stats & dashboard summary
router.get("/", async (_req: Request, res: Response) => {
  try {
    const db = await StorageService.getDatabase();
    
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
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
