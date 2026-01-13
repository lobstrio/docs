import React from 'react';

interface ThreeColumnLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  codeColumn: React.ReactNode;
}

/**
 * Three-column layout component
 * - Left: Sticky sidebar navigation (280px)
 * - Center: Main content area (flexible width)
 * - Right: Sticky code examples column (480px)
 */
export default function ThreeColumnLayout({
  sidebar,
  children,
  codeColumn,
}: ThreeColumnLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex max-w-[1920px] mx-auto">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-[280px] flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto border-r border-border">
            {sidebar}
          </div>
        </aside>

        {/* Center Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-8 py-12">
            {children}
          </div>
        </main>

        {/* Right Code Column */}
        <aside className="hidden xl:block w-[480px] flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto border-l border-border bg-zinc-950">
            {codeColumn}
          </div>
        </aside>
      </div>
    </div>
  );
}
