import React from 'react';

import { AppProps } from 'next/app';

import '@assets/chrome-bug.css';
import '@assets/tailwind.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
