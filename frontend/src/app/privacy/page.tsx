import Link from "next/link";
import { Metadata } from "next";
import { CookieSettingsTrigger } from "@/components/ui/CookieSettingsTrigger";

export const metadata: Metadata = {
  title: "Privacy Policy | DigiConnect Ghana",
  description: "Learn how DigiConnect Ghana protects and handles your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-neutral-50 border-b border-neutral-200/60">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
            Legal & Trust
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-brand-dark mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-neutral-500">
            Last updated: March 2025
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 prose prose-neutral text-neutral-700 space-y-6 text-sm lg:text-base leading-relaxed">
          <p>
            DigiConnect Ghana (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy and personal information of our participants, volunteers, website visitors, and partners. This Privacy Policy explains our data collection, processing, and protection practices.
          </p>

          <h2 className="text-xl font-bold text-brand-dark pt-4">1. Information We Collect</h2>
          <p>
            We collect personal information that you provide directly to us when registering for training programs, applying to join cohorts, submitting inquiries, or subscribing to our updates. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact details (Full name, email address, phone number, location)</li>
            <li>Demographic data (Age, educational background, previous digital experience)</li>
            <li>Program feedback, survey responses, and capstone project submissions</li>
            <li>Inquiry details submitted through our contact and volunteer forms</li>
          </ul>

          <h2 className="text-xl font-bold text-brand-dark pt-4">2. How We Use Your Information</h2>
          <p>
            Your information is used strictly to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Administer training cohorts, attendance, and issuing certificates</li>
            <li>Communicate logistical updates, class schedules, and mentorship opportunities</li>
            <li>Measure and report anonymized impact statistics to donors and educational partners</li>
            <li>Improve our learning curriculum and workshop offerings</li>
          </ul>

          <h2 className="text-xl font-bold text-brand-dark pt-4">3. Cookies & Tracking Technologies</h2>
          <p>
            DigiConnect Ghana uses first-party and third-party cookies, local storage, and similar technologies to ensure platform security, maintain your user preferences, measure website traffic across Ghana, and deliver optimized multimedia learning content.
          </p>
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 my-4 space-y-3 not-prose">
            <h3 className="font-bold text-brand-dark text-sm">Cookie Categories Used</h3>
            <ul className="text-xs text-neutral-600 space-y-2">
              <li>
                <strong className="text-neutral-900">Strictly Necessary Cookies:</strong> Essential for account logins, application security, and storing your consent preferences.
              </li>
              <li>
                <strong className="text-neutral-900">Analytics & Performance:</strong> Aggregated, anonymous metrics (page views, popular toolkits, load speeds) to help us improve our programs.
              </li>
              <li>
                <strong className="text-neutral-900">Functional Preferences:</strong> Saves user display settings, language options, and draft application inputs.
              </li>
              <li>
                <strong className="text-neutral-900">Community & Social Media:</strong> Enables embedded tutorial videos and social sharing tools.
              </li>
            </ul>
            <div className="pt-2">
              <CookieSettingsTrigger />
            </div>
          </div>

          <h2 className="text-xl font-bold text-brand-dark pt-4">4. Data Sharing and Protection</h2>
          <p>
            We do not sell, rent, or trade your personal data. We implement reasonable administrative and technical security measures to safeguard against unauthorized access or disclosure. Anonymized cohort metrics may be shared with impact grantors and educational partners.
          </p>

          <h2 className="text-xl font-bold text-brand-dark pt-4">5. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy, our cookie practices, or wish to update your records, please contact us at{" "}
            <a href="mailto:privacy@digiconnectghana.org" className="text-brand-blue font-semibold underline">
              privacy@digiconnectghana.org
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}
