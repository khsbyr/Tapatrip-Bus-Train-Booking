import React from 'react';

import { AppProps } from 'next/app';
import '@assets/chrome-bug.css';
import '@assets/main.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
