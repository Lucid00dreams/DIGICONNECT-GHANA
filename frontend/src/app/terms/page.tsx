import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | DigiConnect Ghana",
  description: "Terms and conditions for utilizing the DigiConnect Ghana website and digital services.",
};

export default function TermsPage() {
  return (
    <>
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-neutral-50 border-b border-neutral-200/60">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
            Legal & Trust
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-brand-dark mb-4">
            Terms of Website Use
          </h1>
          <p className="text-sm text-neutral-500">
            Last updated: March 2025
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 prose prose-neutral text-neutral-700 space-y-6 text-sm lg:text-base leading-relaxed">
          <p>
            Welcome to the DigiConnect Ghana website. By accessing or using our platform, learning materials, and event registrations, you agree to comply with and be bound by these Terms of Use.
          </p>

          <h2 className="text-xl font-bold text-brand-dark pt-4">1. Use of Educational Resources</h2>
          <p>
            All educational resources, curriculum summaries, guides, and articles provided on this platform are for personal, non-commercial educational use. DigiConnect Ghana retains ownership of proprietary training materials unless explicitly released under open licenses.
          </p>

          <h2 className="text-xl font-bold text-brand-dark pt-4">2. Program Applications and Conduct</h2>
          <p>
            Applicants must provide accurate and truthful background information in cohort application forms. Participants accepted into training programs are expected to adhere to our community code of conduct, respecting peers, mentors, and hub equipment.
          </p>

          <h2 className="text-xl font-bold text-brand-dark pt-4">3. Intellectual Property</h2>
          <p>
            The DigiConnect Ghana name, official logo, brand identity, and website layout are protected. Unauthorized reproduction, modification, or brand misrepresentation is prohibited.
          </p>

          <h2 className="text-xl font-bold text-brand-dark pt-4">4. Disclaimers and Limitations</h2>
          <p>
            Our website and content are provided on an &quot;as is&quot; basis. DigiConnect Ghana strives for accuracy and uninterrupted service, but does not warrant that materials will always be error-free.
          </p>

          <h2 className="text-xl font-bold text-brand-dark pt-4">5. Inquiries</h2>
          <p>
            For questions concerning these terms, please contact us at{" "}
            <a href="mailto:info@digiconnectghana.org" className="text-brand-blue font-semibold underline">
              info@digiconnectghana.org
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}
