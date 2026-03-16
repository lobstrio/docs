'use client';

import Link from 'next/link';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  {
    label: 'API',
    links: [
      { label: 'Authentication', href: '#' },
      { label: 'Endpoints', href: '#' },
      { label: 'Rate Limits', href: '#' },
    ],
  },
  {
    label: 'SDK',
    links: [
      { label: 'Python', href: '#' },
      { label: 'Node.js', href: '#' },
      { label: 'Go', href: '#' },
    ],
  },
   {
    label: 'CLI',
  },
];

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className='flex items-center gap-28'>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[26px] text-[#ff0000] font-bold leading-[1.08]">lobstr.io</span>
            <span className="text-[22px] leading-[1.36]">docs</span>
          </Link>
          <ul className='flex gap-9'>
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="relative">
                {item.links ? (
                  <>
                    <button
                      onClick={() => setOpen(open === item.label ? null : item.label)}
                      className="flex items-center gap-1 font-semibold leading-[1.31] opacity-90 hover:opacity-100"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${open === item.label ? 'rotate-0' : '-rotate-90'}`}
                      />
                    </button>
                    {open === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-44 bg-background border border-border rounded-lg shadow-lg py-1 z-50">
                        {item.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setOpen(null)}
                            className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <span className="font-semibold leading-[1.31] opacity-90 hover:opacity-100 cursor-pointer">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/docs/authentication"
            className="font-semibold opacity-70 leading-[1.31]"
          >
            Documentation
          </Link>
          <a
            href="https://lobstr.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold opacity-70 leading-[1.31] flex items-center gap-1"
          >
            Lobstr.io
            <ExternalLink className="w-3 h-3 font-semibold opacity-70 leading-[1.31]" />
          </a>
          <a
            href="https://app.lobstr.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center leading-[1.31] gap-2 text-[#ff0000]  hover:text-[#fff] px-5 py-3 rounded-lg font-semibold border border-[#FF0000] hover:bg-[#ff0000]"
          >
            Dashboard
          </a>
        </div>
      </div>
    </header>
  );
}
