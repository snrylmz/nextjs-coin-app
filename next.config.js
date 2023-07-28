/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/',
            headers: [
              {
                key: 'X-CMC_PRO_API_KEY',
                value: '07be9ded-0c97-43bc-89e0-1792a21ab5a0',
              },
            ],
          },
        ]
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**.coinranking.com',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
