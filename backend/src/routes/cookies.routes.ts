import { Router, Request, Response } from "express";

const router = Router();

// GET current cookie consent status from request cookies
router.get("/consent", (req: Request, res: Response) => {
  try {
    const rawConsent = req.cookies?.dcg_cookie_consent;
    let consent = null;

    if (rawConsent) {
      try {
        consent = JSON.parse(rawConsent);
      } catch {
        consent = rawConsent;
      }
    }

    res.json({
      success: true,
      hasConsent: !!consent,
      consent,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST update cookie consent
router.post("/consent", (req: Request, res: Response) => {
  try {
    const { necessary = true, analytics = false, functional = false, marketing = false } = req.body;

    const consentData = {
      necessary: true,
      analytics: Boolean(analytics),
      functional: Boolean(functional),
      marketing: Boolean(marketing),
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    };

    const isProduction = process.env.NODE_ENV === "production";

    // Set cookie
    res.cookie("dcg_cookie_consent", JSON.stringify(consentData), {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      httpOnly: false, // Accessible to client JavaScript for UI
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      path: "/",
    });

    res.json({
      success: true,
      message: "Cookie consent preferences saved successfully",
      consent: consentData,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST clear all cookies
router.post("/clear", (_req: Request, res: Response) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
      path: "/",
      secure: isProduction,
      sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
    };
    res.clearCookie("dcg_cookie_consent", cookieOptions);
    res.clearCookie("dcg_session", cookieOptions);

    res.json({
      success: true,
      message: "Cookies cleared successfully",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
