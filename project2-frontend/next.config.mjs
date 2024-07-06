import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['s4.anilist.co', 'artworks.thetvdb.com', 'media.kitsu.io', 'image.tmdb.org'],
        unoptimized: true,
    },
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.(mp3|wav|ogg)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '/_next/static/sounds/',
                    outputPath: 'static/sounds/',
                    name: '[name].[hash].[ext]',
                    esModule: false,
                },
            },
        });

        return config;
    },
};

const withPWANextConfig = withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
});

export default withPWANextConfig(nextConfig);
