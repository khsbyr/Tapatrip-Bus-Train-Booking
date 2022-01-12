import { FC, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from '@lib/apollo';
import { ManagedGlobalContext } from '@context/globalStore';
import { appWithTranslation } from 'next-i18next';
import { ManagedUIContext } from '@context/uiContext';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import * as gtag from '@lib/gtag';
import Loader from '@components/common/loader';

import 'antd/dist/antd.css';
import '@assets/chrome-bug.scss';
import '@assets/main.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp: FC<AppProps> = ({ Component, router, pageProps }: AppProps) => {
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);
  return (
    <>
      {pageLoading && <Loader />}
      <ApolloProvider client={client}>
        <ManagedUIContext>
          <ManagedGlobalContext>
            <Component {...pageProps} />
          </ManagedGlobalContext>
        </ManagedUIContext>
      </ApolloProvider>
    </>
  );
};

export default appWithTranslation(MyApp);
