/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['app', 'components', 'lib']
  },
  images: {
    domains: ['images.pexels.com','127.0.0.1','kiswahilisimplified.netlify.app','olojbovxqwqutrpgzbes.supabase.co','wswmhnlmgtytycjllxzt.supabase.co']
  }
};

module.exports = nextConfig;