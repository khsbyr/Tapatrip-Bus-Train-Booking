import { FC } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from '@lib/apollo';

import 'antd/dist/antd.css';
import '@assets/chrome-bug.scss';
import '@assets/main.scss';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
