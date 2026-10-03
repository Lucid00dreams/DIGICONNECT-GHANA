import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PROGRAMS, TESTIMONIALS } from "@/lib/data";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import {
  Clock,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Share2,
} from "lucide-react";

interface ProgramDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROGRAMS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProgramDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);
  if (!program) return { title: "Program Not Found | DigiConnect Ghana" };

  return {
    title: `${program.title} | DigiConnect Ghana`,
    description: program.description,
  };
}

export default async function ProgramDetailPage({
  params,
}: ProgramDetailPageProps) {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  // Related testimonials
  const relatedTestimonials = TESTIMONIALS.filter(
    (t) => t.program.toLowerCase() === program.title.toLowerCase()
  );

  return (
    <>
      {/* Breadcrumb & Hero */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-neutral-50 border-b border-neutral-200/60">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-medium">
            <Link href="/" className="hover:text-brand-blue">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/programs" className="hover:text-brand-blue">Programs</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-dark font-semibold">{program.title}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-blue/10 text-brand-blue mb-4">
                <span>Program {program.number}</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
                {program.title}
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                {program.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-blue" />
                  <div>
                    <span className="block text-xs uppercase text-neutral-600 font-semibold">Duration</span>
                    <span className="font-bold text-brand-dark">{program.duration}</span>
                  </div>
                </div>
                <div className="h-8 w-px bg-neutral-200 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-blue" />
                  <div>
                    <span className="block text-xs uppercase text-neutral-600 font-semibold">Audience</span>
                    <span className="font-bold text-brand-dark">{program.audience}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/join?program=${program.slug}`}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors shadow-sm"
                >
                  Apply For This Program <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                  Enquire Further
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details Content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-14">
              {/* What You'll Learn */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
                  Curriculum & Modules
                </span>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-brand-dark mb-6">
                  What You Will Learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {program.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50 flex items-start gap-3.5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-brand-dark leading-snug">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Outcomes */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-green mb-2 block">
                  Target Competencies
                </span>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-brand-dark mb-6">
                  Expected Learning Outcomes
                </h2>
                <div className="space-y-3">
                  {program.outcomes.map((outcome, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-neutral-150 bg-white flex items-center gap-3.5 shadow-xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm font-medium text-neutral-700">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="text-2xl font-extrabold text-brand-dark mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="p-5 rounded-xl border border-neutral-200">
                    <h3 className="text-base font-bold text-brand-dark mb-2">
                      Are there any fees or charges to join this program?
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      DigiConnect Ghana programs are free or heavily subsidized through our partners and donors to ensure access is not hindered by financial constraints.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl border border-neutral-200">
                    <h3 className="text-base font-bold text-brand-dark mb-2">
                      Do I need to own a computer or laptop?
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      While having your own device is helpful for practice, our training locations and partner hubs provide access to workstations and computers during classroom sessions.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl border border-neutral-200">
                    <h3 className="text-base font-bold text-brand-dark mb-2">
                      Will I receive a certificate upon completion?
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Yes! All participants who complete the required modules, attend at least 80% of sessions, and finish their capstone project receive a verified DigiConnect Ghana Certificate of Completion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm">
                  <h3 className="text-lg font-bold text-brand-dark mb-4">
                    Cohort Details
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="text-xs text-neutral-500 uppercase font-semibold block">Location</span>
                      <span className="font-semibold text-brand-dark">Accra & Kumasi Innovation Hubs</span>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-500 uppercase font-semibold block">Commitment</span>
                      <span className="font-semibold text-brand-dark">6-8 Hours per week</span>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-500 uppercase font-semibold block">Next Intake</span>
                      <span className="font-semibold text-brand-dark">Rolling Admissions (Spring 2025)</span>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-500 uppercase font-semibold block">Credential</span>
                      <span className="font-semibold text-brand-dark">Certificate of Completion</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <Link
                      href={`/join?program=${program.slug}`}
                      className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl font-bold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors text-center"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200 bg-white shadow-xs">
                  <h4 className="text-sm font-bold text-brand-dark mb-2">
                    Need Guidance?
                  </h4>
                  <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                    Unsure which program fits your background best? Talk to our advisory team for personalized guidance.
                  </p>
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
                  >
                    Speak with an advisor <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
