import Head from 'next/head';
import HeaderBackground from '@components/common/headerBackground';
import NavData from '@data/navData.json';
import Navbar from '@components/common/navbar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Footer from '@components/common/footer';
import data from '@data/company.json';
import { useTranslation } from 'next-i18next';

export default function Considerations() {
  const { t } = useTranslation(['common']);
  return (
    <div>
      <Head>
        <title>{t('videoInstructions')}</title>
      </Head>
      <HeaderBackground isBorderRadius={false} />
      <Navbar navbarData={NavData} />
      <div className="bg-bg px-2  py-10 sm:px-20 z-50">
        <div className="max-w-7xl bg-white rounded-lg px-5 sm:px-20 py-8 mx-auto text-cardDate mt-20">
          <h1 className="text-cardDate text-lg sm:text-2xl font-medium py-7">
            {t('videoInstructions')}
          </h1>
          <div
            className="text-base space-y-2"
            dangerouslySetInnerHTML={{
              __html: t(`passengeСonsiderationsBody`),
            }}
          />
          <h1 className="text-cardDate text-lg sm:text-2xl font-medium py-7">
            {t('passengeСonsiderationsTitle2')}
          </h1>
          <div
            className="text-base space-y-2"
            dangerouslySetInnerHTML={{
              __html: t(`passengeСonsiderationsTitle2Body`),
            }}
          />
        </div>
      </div>
      <Footer companyInfo={data} />
    </div>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  };
}
