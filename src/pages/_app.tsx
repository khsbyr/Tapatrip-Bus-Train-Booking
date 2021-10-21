import { FC, useEffect } from 'react';
import type { AppProps } from 'next/app';

import '@assets/chrome-bug.scss';
import '@assets/main.scss';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
