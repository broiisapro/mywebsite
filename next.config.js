/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Uncomment and set basePath if deploying to a subdirectory repo on GitHub Pages:
  // basePath: '/portfolio',
  trailingSlash: true,
}

module.exports = nextConfig
