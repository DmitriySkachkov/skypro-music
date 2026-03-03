// import { redirect } from 'next/dist/server/api-utils';

module.exports = {
  async redirect() {
    return [
      {
        source: '/',
        destination: '/music/main',
        permanent: true,
      },
    ];
  },
};

// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;
