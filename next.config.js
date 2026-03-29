/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/mywebsite',
  trailingSlash: true,
}

module.exports = nextConfig
