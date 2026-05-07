/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.cloudflare.steamstatic.com',
            },
            {
                protocol: 'https',
                hostname: 'store.steampowered.com',
            },
        ],
    },
};

module.exports = nextConfig;
