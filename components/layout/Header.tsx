import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-red-500">lobstr.io</span>
          <span className="text-text-muted text-sm font-medium">API Docs</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/docs/authentication"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Documentation
          </Link>
          <a
            href="https://lobstr.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
          >
            Lobstr.io
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://app.lobstr.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-accent-red hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Dashboard
          </a>
        </div>
      </div>
    </header>
  );
}
