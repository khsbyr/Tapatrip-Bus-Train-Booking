import { FC } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from '@lib/apollo';
import { ManagedGlobalContext } from '@context/globalStore';
import { appWithTranslation } from 'next-i18next';
import { ManagedUIContext } from '@context/uiContext';

import 'antd/dist/antd.css';
import '@assets/chrome-bug.scss';
import '@assets/main.scss';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <ManagedUIContext>
        <ManagedGlobalContext>
          <Component {...pageProps} />
        </ManagedGlobalContext>
      </ManagedUIContext>
    </ApolloProvider>
  );
};

export default appWithTranslation(MyApp);
