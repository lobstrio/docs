import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between ">
         <div>
           <h2 className="text-[40px] font-bold leading-[1.58] mb-4">Ready to get started?</h2>
          <p className="tetx-[17px] opacity-80 mb-8 max-w-xl mx-auto">
            Get your API key and start collecting data in minutes.
          </p>
         </div>
         <div>

          <Link
            href="/docs/authentication"
            className="inline-flex items-center gap-2 bg-accent-red hover:bg-red-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
          >
            Start Building
            <ArrowRight className="w-5 h-5" />
          </Link>
         </div>
        </div>
    </div>
  );
}
