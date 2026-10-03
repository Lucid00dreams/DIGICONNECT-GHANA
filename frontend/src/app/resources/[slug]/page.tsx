import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { RESOURCES } from "@/lib/data";
import { ResourceCard } from "@/components/ui/ResourceCard";
import {
  Calendar,
  Clock,
  ChevronRight,
  Share2,
  Bookmark,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface ResourceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RESOURCES.map((r) => ({
    slug: r.slug,
  }));
}

export async function generateMetadata({
  params,
}: ResourceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = RESOURCES.find((r) => r.slug === slug);
  if (!resource) return { title: "Resource Not Found | DigiConnect Ghana" };

  return {
    title: `${resource.title} | DigiConnect Ghana`,
    description: resource.description,
  };
}

export default async function ResourceDetailPage({
  params,
}: ResourceDetailPageProps) {
  const { slug } = await params;
  const resource = RESOURCES.find((r) => r.slug === slug);

  if (!resource) {
    notFound();
  }

  const relatedResources = RESOURCES.filter((r) => r.slug !== slug).slice(0, 3);

  // Social share urls
  const shareText = encodeURIComponent(
    `Check out "${resource.title}" from DigiConnect Ghana!`
  );
  const shareUrl = encodeURIComponent(`https://digiconnectghana.org/resources/${resource.slug}`);

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-neutral-50 border-b border-neutral-200/60">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-medium">
            <Link href="/" className="hover:text-brand-blue">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/resources" className="hover:text-brand-blue">Resources</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-dark font-semibold truncate max-w-[200px]">
              {resource.title}
            </span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-blue/10 text-brand-blue">
              {resource.category}
            </span>
            <span className="text-xs text-neutral-500 capitalize">
              {resource.type}
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight mb-5 leading-tight">
            {resource.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-2 border-t border-neutral-200">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              <span>Published {resource.date}</span>
            </div>
            {resource.readTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{resource.readTime}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-brand-green font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Free Educational Resource</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          {/* Hero Media */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg mb-10 border border-neutral-200">
            <Image
              src={resource.image}
              alt={resource.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>

          {/* Social Share Bar */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-wrap items-center justify-between gap-4 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-brand-blue" />
              Share This Guide:
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
              >
                X / Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Content Body */}
          <article className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed space-y-6">
            <p className="text-lg text-neutral-800 font-medium leading-relaxed">
              {resource.description}
            </p>

            <div className="p-6 rounded-2xl bg-brand-blue/5 border border-brand-blue/20 my-8">
              <h3 className="text-base font-bold text-brand-blue mb-2 flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Key Takeaways
              </h3>
              <ul className="text-sm space-y-2 text-neutral-700 list-disc list-inside">
                <li>Digital skills empower youth to participate in global economic opportunities.</li>
                <li>Consistent hands-on practice builds authentic technical problem-solving capabilities.</li>
                <li>Digital safety, privacy, and cyber hygiene are fundamental across all tech pursuits.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-brand-dark pt-4">
              Building Practical Technology Competence
            </h2>
            <p>
              In today&apos;s fast-evolving landscape, understanding modern digital tools is no longer optional—it is an essential requirement for academic, personal, and professional progress. Through our modular curriculum and workshop sessions, learners develop the hands-on abilities required to navigate software applications, troubleshoot issues, and communicate effectively online.
            </p>
            <p>
              Whether you are preparing your first curriculum vitae, learning how to code your first web application, or discovering how artificial intelligence is transforming industries across Africa, adopting a growth mindset is key. Practical experience and mentorship shorten the learning curve significantly.
            </p>

            <h2 className="text-2xl font-bold text-brand-dark pt-4">
              Next Steps for Learners
            </h2>
            <p>
              If you found this resource helpful and want to dive deeper into practical technology training, consider applying for one of our free or subsidized training cohorts at DigiConnect Ghana. Our mentors provide live feedback, hands-on code reviews, and career guidance.
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-lg font-bold mb-1">Want Hands-On Mentorship?</h4>
                <p className="text-xs text-neutral-400">Join our upcoming youth cohort in Accra or Kumasi.</p>
              </div>
              <Link
                href="/join"
                className="px-5 py-2.5 rounded-full font-bold bg-brand-blue text-white hover:bg-brand-blue-dark text-xs whitespace-nowrap"
              >
                Apply to Program
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-200/60">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-brand-dark">Related Resources</h2>
            <Link
              href="/resources"
              className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
