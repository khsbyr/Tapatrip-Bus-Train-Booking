import Search from '@components/Travel/Search-Travel';
import Footer from '@components/common/Footer';
// import Layout from '@components/Layout/Layout';
import HeaderBackground from '@components/common/HeaderBackground';
import Navbar from '@components/common/Navbar';
// import App from '@components/App/App';
import App from '@components/common/Subscribe';
import TapaService from '@components/common/TapaService';
// import Search from '@components/Travel/Search/Search';
import ServicesCard from '@components/Travel/Travel-Card/ServicesCard';
import Tips from '@components/Travel/Travel-Card/Tips';
import TravelCard from '@components/Travel/Travel-Card/TravelCard';
import NavData from '@data/navData.json';
import TapaServiceList from '@data/tapaServiceList.json';
import { postRequest, getRequestNoToken } from '@lib/api';
// import style from '@components/Search/Search.module.scss';
import { Tabs } from 'antd';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import Company from '@data/company.json';
import Loader from '@components/common/Loader';

const { TabPane } = Tabs;
const TYPE = 'TRAVEL';

export default function Travel({ NavData, Packages, TipsFor, BannerItems }) {
  const [loader, setloader] = useState(false);
  function clickHandler() {
    setloader(true);
  }
  return (
    <div>
      <Head>
        <title>Tapatrip - Online Travel Platform</title>
      </Head>
      <div className="bg-bg font-Roboto">
        <HeaderBackground />
        <Navbar navbarData={NavData} />
        <Search navbarData={NavData} bannerItems={BannerItems} />
        {loader && <Loader />}
        {!loader &&
          Packages.map((packageFrom, index) => (
            <TravelCard
              key={index}
              title={packageFrom.package_tour_type_name}
              packages={packageFrom.package_tours}
              ClickHandler={clickHandler}
            />
          ))}

        <ServicesCard />
        <div className="default-container mb-10">
          <div className="px-2">
            <h1
              className="font-bold text-2xl max-w-7xl mx-auto mt-6 px-6"
              style={{ color: '#0A3761' }}
            >
              Аялалын зөвлөмж
            </h1>
            <div className="cursor-pointer grid grid-cols-1 gap-3 my-6 md:grid-cols-3 md:gap-8 lg:grid-cols-3 max-w-7xl mx-auto md:my-6 ">
              {TipsFor.map(tipFor => (
                <Tips
                  title={tipFor.title}
                  image={tipFor.image}
                  description={tipFor.description}
                />
              ))}
            </div>
          </div>
        </div>
        <App />
        <TapaService tapaServiceList={TapaServiceList} />
        <Footer companyInfo={Company} />
      </div>
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const navData = NavData;

  const tour = await postRequest('/activity/package_tour/', {});
  const tips = await postRequest('/activity/traveltips/', {});
  const bannerItems = await getRequestNoToken(
    '/gandan/air/banner/?banner_location=banner'
  );
  return {
    props: {
      NavData: navData,
      Packages: tour.result,
      TipsFor: tips.result,
      BannerItems: bannerItems,
      // Packages: packages,
      // GridList: gridList,
      // CommentList: commentList,
    },
  };
};
