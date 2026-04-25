/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/build-qlik-sense-theme',
  assetPrefix: '/build-qlik-sense-theme',
  trailingSlash: true,
  images: { unoptimized: true },
}
module.exports = nextConfig
