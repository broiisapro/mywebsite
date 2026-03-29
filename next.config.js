/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? '/mywebsite' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/mywebsite' : '',
  },
  trailingSlash: true,
}

module.exports = nextConfig
