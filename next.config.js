/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mars.nasa.gov',
                port: ''
            }
        ]
    }
}

module.exports = nextConfig
