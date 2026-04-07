import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function ExploreApiCta() {
  return (
    <div className="mt-15 rounded-xl bg-[#0A2540] px-7.5 py-10 text-center">
      <h3 className="text-[24px] font-bold text-white mb-4">Explore the full API documentation</h3>
      <p className="text-[#ffffffb3] mb-7.5 mx-auto">Reuse the same CTA treatment from the cleaner reference page to keep docs pages visually consistent.</p>
      <Link
        href="/docs/authentication"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] hover:bg-[#cc0000] text-white text-sm font-bold rounded-lg transition"
      >
        Open API docs <ExternalLink className="w-4 h-4" />
      </Link>
    </div>
  );
}
