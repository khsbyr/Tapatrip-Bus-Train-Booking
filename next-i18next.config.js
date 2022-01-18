const path = require('path');
module.exports = {
  i18n: {
    defaultLocale: 'mn',
    locales: ['mn', 'en', 'zh'],
    localeDetection: false,
  },
  react: { useSuspense: false },
  localePath: path.resolve('./public/locales'),
};
