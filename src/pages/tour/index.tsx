import SeatNav from '@components/bus/seatNavbar';
import Footer from '@components/common/footer';
import styles from './tour.module.scss';
import Company from '@data/company.json';
import NavData from '@data/navData.json';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React from 'react';
import TravelProgram from '@components/tour/travelProgram';
import ContactInfo from '@components/tour/contactInfo';
import Package from '@components/tour/package';
import Covid from '@components/tour/Covid';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import navData from '@data/navData.json';
import ContentWrapper from '@components/bus/searchPanel/style';

const { TabPane } = Tabs;

export default function Tour() {
  const { t } = useTranslation();
  const router = useRouter();
  const activePath =
    router.route == '/train'
      ? '5'
      : router.route == '/tour'
      ? '3'
      : router.route == '/bus'
      ? '4'
      : router.route == 'https://tapatrip.com/'
      ? '1'
      : router.route == 'https://tapatrip.com/'
      ? '2'
      : '3';

  const handleTabChange = key => {
    const route = key == 4 ? '/bus' : key == 3 ? '/tour' : '';
    key == 2 || key == 1
      ? window.open('https://tapatrip.com/', '_blank')
      : router.push(`/${route}`);
  };
  return (
    <div>
      <Head>
        <title>Tapatrip - Online Travel Platform</title>
      </Head>
      <ContentWrapper>
        <div className={styles.main}>
          <div className="relative">
            <div className="fixed z-20 w-screen top-0">
              <SeatNav />
            </div>
          </div>

          <div className="mt-20">
            <img
              src="/assets/tourImages/top-bg.jpg"
              alt="Logo"
              className="hidden md:block w-full"
            />
            <img
              src="/assets/tourImages/top-bg-mobile.jpg"
              alt="Logo"
              className="md:hidden"
            />
          </div>

          <div className="bg-white">
            <TravelProgram />
            <ContactInfo />
          </div>

          <Package />

          <div className="w-full border-dashed border border-red-200"></div>

          <div className="bg-white">
            <Covid />
            <ContactInfo />
          </div>
          <Footer companyInfo={Company} />

          <Tabs
            activeKey={activePath}
            centered
            onChange={handleTabChange}
            className="z-50 w-full fixed bottom-0 inset-x-0 bg-white text-sm text-secondary shadow-2xl h-20 lg:hidden"
          >
            {navData.generalList.map(menu => (
              <TabPane
                tab={
                  <div
                    key={menu.id}
                    className="tab-title -mx-1.5 xs:mx-2 sm:px-4 md:px-7"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8"
                      viewBox="-5 0 60 45"
                    >
                      <g>
                        {menu.path.map(value => (
                          <path key={value} d={value} />
                        ))}
                      </g>
                    </svg>
                    <span className="text-xs sm:text-sm">
                      {t(`${menu.text}`)}
                    </span>
                  </div>
                }
                disabled={menu.id === 3 || menu.id === 5 ? true : false}
                key={menu.id}
              />
            ))}
          </Tabs>
        </div>
      </ContentWrapper>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const res = NavData;
  return {
    props: {
      NavData: res,
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  };
}
