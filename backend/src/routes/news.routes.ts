import { Router, Request, Response } from "express";
import { StorageService } from "../services/storage";
import { NewsPost } from "../types";
import { requireAdminAuth } from "../middleware/auth";
import { sanitizeRequest } from "../middleware/sanitizer";
import { auditLogger } from "../services/auditLogger";

const router = Router();

// GET all news (Public)
router.get("/", async (req: Request, res: Response) => {
  try {
    const db = await StorageService.getDatabase();
    const { category } = req.query;

    let results = [...db.news];
    if (category && typeof category === "string") {
      results = results.filter((post) => post.category.toLowerCase() === category.toLowerCase());
    }

    res.json({ success: true, count: results.length, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to retrieve news" });
  }
});

// GET single news post by slug or id (Public)
router.get("/:idOrSlug", async (req: Request, res: Response) => {
  try {
    const db = await StorageService.getDatabase();
    const { idOrSlug } = req.params;
    const found = db.news.find((post) => post.id === idOrSlug || post.slug === idOrSlug);

    if (!found) {
      return res.status(404).json({ success: false, error: "News article not found" });
    }

    res.json({ success: true, data: found });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to retrieve news article" });
  }
});

// POST new post (Admin Protected)
router.post("/", requireAdminAuth, sanitizeRequest, async (req: Request, res: Response) => {
  try {
    const { title, slug, excerpt, content, category, author, image, readTime } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: title, excerpt, and content are required.",
      });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newPost: NewsPost = {
      id: `news-${Date.now()}`,
      title: String(title).slice(0, 150),
      slug: generatedSlug.slice(0, 150),
      excerpt: String(excerpt).slice(0, 500),
      content: String(content).slice(0, 20000),
      date: new Date().toISOString().split("T")[0],
      category: category ? String(category).slice(0, 50) : "General",
      author: author ? String(author).slice(0, 100) : "DigiConnect Team",
      image: image ? String(image).slice(0, 255) : "/images/news/bootcamp.jpg",
      readTime: readTime ? String(readTime).slice(0, 30) : "3 min read",
    };

    await StorageService.updateDatabase((db) => {
      db.news.unshift(newPost);
    });

    auditLogger.log("ADMIN_ACTION", req, {
      action: "NEWS_POST_CREATED",
      postId: newPost.id,
      title: newPost.title,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to create article" });
  }
});

// DELETE news post (Admin Protected)
router.delete("/:id", requireAdminAuth, async (req: Request, res: Response) => {
  try {
    let deleted = false;
    await StorageService.updateDatabase((db) => {
      const prevLen = db.news.length;
      db.news = db.news.filter((post) => post.id !== req.params.id);
      deleted = db.news.length < prevLen;
    });

    if (!deleted) {
      return res.status(404).json({ success: false, error: "News article not found" });
    }

    auditLogger.log("ADMIN_ACTION", req, {
      action: "NEWS_POST_DELETED",
      postId: req.params.id,
    });

    res.json({ success: true, message: "News article deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Failed to delete article" });
  }
});

export default router;
