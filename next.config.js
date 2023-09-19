/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
