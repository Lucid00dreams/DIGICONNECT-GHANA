import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StoreProvider } from "@/context/StoreContext";
import { ToastProvider } from "@/context/ToastContext";
import { CookieProvider } from "@/context/CookieContext";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { BackToTop } from "@/components/ui/BackToTop";
import { CookieConsentBanner } from "@/components/ui/CookieConsentBanner";
import { CookiePreferencesModal } from "@/components/ui/CookiePreferencesModal";
import { CookieTriggerButton } from "@/components/ui/CookieTriggerButton";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#2196D3",
};

export const metadata: Metadata = {
  manifest: "/manifest.json",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://digiconnectghana.org"
  ),
  title: "DigiConnect Ghana | Tech for Youth. Tech for Good.",
  description:
    "DigiConnect Ghana empowers young people through digital skills, technology education, mentorship and opportunities for a better digital future.",
  keywords: [
    "DigiConnect Ghana",
    "digital literacy",
    "youth empowerment",
    "technology education",
    "Ghana",
    "coding",
    "digital skills",
  ],
  openGraph: {
    title: "DigiConnect Ghana | Tech for Youth. Tech for Good.",
    description:
      "Empowering Ghana's youth through certified digital skills, hands-on coding, cybersecurity labs, and free tech education.",
    url: "https://digiconnectghana.org",
    siteName: "DigiConnect Ghana",
    locale: "en_GH",
    type: "website",
    images: [
      {
        url: "/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "DigiConnect Ghana - Official Learning Hub & Digital Skills Platform Sneak Peek",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiConnect Ghana | Tech for Youth. Tech for Good.",
    description:
      "Empowering young people through digital skills, technology education, mentorship and opportunities.",
    images: ["/og-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2196D3" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased text-brand-dark bg-white" suppressHydrationWarning>
        <StoreProvider>
          <ToastProvider>
            <CookieProvider>
              {/* Accessible Skip Link */}
              <a href="#main-content" className="sr-only skip-to-content">
                Skip to main content
              </a>

              <Navbar />
              <main id="main-content" tabIndex={-1} className="focus:outline-none">
                {children}
              </main>
              <Footer />

              {/* Global UX & Navigation Enhancements */}
              <CommandPalette />
              <BackToTop />

              {/* Cookie Consent & Preferences Management */}
              <CookieConsentBanner />
              <CookiePreferencesModal />
              <CookieTriggerButton />
            </CookieProvider>
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
