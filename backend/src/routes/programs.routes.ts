import { Router, Request, Response } from "express";
import { StorageService } from "../services/storage";

const router = Router();

// GET all programs
router.get("/", async (_req: Request, res: Response) => {
  try {
    const db = await StorageService.getDatabase();
    res.json({ success: true, count: db.programs.length, data: db.programs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single program by slug
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const db = await StorageService.getDatabase();
    const program = db.programs.find((p) => p.slug === req.params.slug);

    if (!program) {
      return res.status(404).json({ success: false, error: "Program not found" });
    }

    res.json({ success: true, data: program });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
