import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="horizon px-4 py-32 text-center sm:px-6">
      <h1 className="text-display font-semibold">
        This page doesn&apos;t exist.
        <span className="block text-dim">The rest of the site does.</span>
      </h1>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-teal px-6 py-3 font-semibold text-ink hover:bg-paper">
          Go to the homepage
        </Link>
        <Link href="/contact" className="rounded-full border border-line px-6 py-3 font-semibold hover:border-paper/50">
          Contact us
        </Link>
      </div>
    </section>
  );
}
