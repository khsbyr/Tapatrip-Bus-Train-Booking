const path = require('path');
module.exports = {
  i18n: {
    defaultLocale: 'mn',
    locales: ['mn', 'en', 'zh'],
    localeDetection: false,
  },
  localePath: path.resolve('./public/locales'),
};
