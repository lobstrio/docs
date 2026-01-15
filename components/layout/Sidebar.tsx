'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Navigation } from '@/lib/types/content';

interface SidebarProps {
  navigation: Navigation;
}

/**
 * Sidebar navigation component with collapsible sections
 */
export default function Sidebar({ navigation }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    // Initialize all sections as expanded
    navigation.sections.reduce((acc, section) => {
      acc[section.title] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  return (
    <div className="p-6">
      {/* Logo/Header */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <span className="text-xl font-bold text-red-500">lobstr.io</span>
        <span className="text-text-muted text-sm font-medium">API Docs</span>
      </Link>

      {/* Navigation Sections */}
      <nav className="space-y-6">
        {navigation.sections.map((section) => (
          <div key={section.title}>
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between w-full text-sm font-semibold text-text-primary mb-2 hover:text-accent-red transition-colors"
            >
              <span>{section.title}</span>
              {expandedSections[section.title] ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {/* Section Items */}
            {expandedSections[section.title] && (
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === `/docs/${item.slug}`;
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`/docs/${item.slug}`}
                        className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                      >
                        {item.title}
                        {item.badge && (
                          <span className="ml-2 badge badge-get text-xs">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>

      {/* Footer Links */}
      <div className="mt-12 pt-6 border-t border-border">
        <div className="space-y-2 text-sm">
          <a
            href="https://lobstr.io"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-text-muted hover:text-text-primary transition-colors"
          >
            Main Website
          </a>
          <a
            href="https://app.lobstr.io"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-text-muted hover:text-text-primary transition-colors"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
