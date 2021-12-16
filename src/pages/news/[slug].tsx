import data from '@data/news.json';
import Head from 'next/head';
import HeaderBackground from '@components/common/headerBackground';
import NavData from '@data/navData.json';
import Navbar from '@components/common/navbar';
import Footer from '@components/common/footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '@components/common/layout';

export default function News({ info }) {
  const { t } = useTranslation(['common']);
  return (
    <Layout>
      {info &&
        data.map(post =>
          post.head === info.slug ? (
            <div key={post.id}>
              <Head>
                <title>{t(`${post.title}`)}</title>
              </Head>
              <HeaderBackground isBorderRadius={false} />
              <Navbar navbarData={NavData} />
              <div className="bg-bg py-5 px-7 lg:py-10 sm:px-20">
                <div className="relative max-w-7xl bg-white rounded-lg px-5 sm:px-20 py-8 mx-auto text-cardDate space-y-5">
                  <p className="text-center font-bold sm: text-lg">
                    {t(`${post.title}`)}
                  </p>
                  <div
                    className="text-base font-medium space-y-4"
                    dangerouslySetInnerHTML={{
                      __html: t(`${post.body}`),
                    }}
                  />
                </div>
              </div>
            </div>
          ) : null
        )}
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = data.map(post => ({
    params: { slug: post.head },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      info: params,
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  };
}
