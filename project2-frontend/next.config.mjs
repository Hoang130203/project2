/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['s4.anilist.co', 'artworks.thetvdb.com', 'media.kitsu.io', 'image.tmdb.org'],
        unoptimized: true
    },
};

export default nextConfig;
