import type { NextConfig } from 'next';

const isVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(!isVercel && { output: 'standalone' }),
};

export default nextConfig;
