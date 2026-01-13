import Link from 'next/link';
import { ArrowRight, BookOpen, Code2, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
            Lobstr.io API
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Complete API documentation for scraping and data extraction. Get started in minutes with our simple, powerful API.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-surface border border-border rounded-lg p-6 hover:border-accent-blue transition-colors">
            <div className="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-accent-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast & Reliable</h3>
            <p className="text-text-secondary text-sm">
              High-performance API with 99.9% uptime and lightning-fast response times.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6 hover:border-accent-green transition-colors">
            <div className="w-12 h-12 bg-accent-green/20 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-accent-green" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
            <p className="text-text-secondary text-sm">
              Simple REST API with comprehensive documentation and code examples.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6 hover:border-accent-yellow transition-colors">
            <div className="w-12 h-12 bg-accent-yellow/20 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-accent-yellow" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Code Examples</h3>
            <p className="text-text-secondary text-sm">
              cURL and Python examples for every endpoint to get you started quickly.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-surface border border-border rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Started</h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Jump right into the documentation and start building with Lobstr.io API. Learn how to authenticate, make requests, and handle responses.
          </p>
          <Link
            href="/docs/authentication"
            className="inline-flex items-center gap-2 bg-accent-blue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View Documentation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <Link href="/docs/user-me" className="block bg-surface border border-border rounded-lg p-6 hover:border-accent-blue transition-colors group">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent-blue transition-colors">
              Get User Profile
            </h3>
            <p className="text-text-secondary text-sm">
              Learn how to retrieve authenticated user profile data.
            </p>
          </Link>

          <Link href="/docs/get-balance" className="block bg-surface border border-border rounded-lg p-6 hover:border-accent-blue transition-colors group">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent-blue transition-colors">
              Check Balance
            </h3>
            <p className="text-text-secondary text-sm">
              Check your account balance before launching operations.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
