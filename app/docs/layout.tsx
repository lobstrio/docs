import { loadNavigation } from '@/lib/content/content-loader';
import Sidebar from '@/components/layout/Sidebar';

/**
 * Layout for documentation pages
 * Loads navigation and passes it to the Sidebar
 */
export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = await loadNavigation();

  return <>{children}</>;
}
