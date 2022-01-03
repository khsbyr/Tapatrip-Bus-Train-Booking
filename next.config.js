const { i18n } = require('./next-i18next.config');
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = phase => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  // next.config.js object
  return {
    i18n,
    reactStrictMode: true,
    // async redirects() {
    //   return [
    //     {
    //       source: '/',
    //       destination: '/bus',
    //       permanent: true,
    //     },
    //   ];
    // },
    images: {
      loader: 'imgix',
      path: 'https://noop/',
    },
  };
};
