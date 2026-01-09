import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ['@node-rs/argon2'],
  cacheComponents: true,
}

export default nextConfig
