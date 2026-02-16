/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['app', 'components', 'lib']
  },
  images: {
    domains: ['images.pexels.com', '127.0.0.1', 'riyhmpsxotvyophzhnyn.supabase.co', 'wswmhnlmgtytycjllxzt.supabase.co', 'eu2.contabostorage.com']
  }
};

module.exports = nextConfig;