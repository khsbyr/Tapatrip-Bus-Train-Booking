import React from 'react';
import Head from 'next/head';
import NavData from '@data/navData.json';
import Layout from '@components/Layout/Layout';
import Header from '@components/Header/Header';
import App from '@components/App/App';
import ContentWrapper from '@components/Search/style';
import style from '@components/Search/Search.module.scss';
import { Tabs, Image, Carousel } from 'antd';
import Search from '@components/Search/Search';
import TravelCard from '@components/Travel-Card/TravelCard';
import ServicesCard from '@components/Travel-Card/ServicesCard';
import Footer from '@components/Footer/Footer';
import Tips from '@components/Travel-Card/Tips';
const { TabPane } = Tabs;
const TYPE = 'TRAVEL';
function Travel({ NavData }) {
  return (
    <div>
      <Head>
        <title>Tapatrip - Online Travel Platform</title>
      </Head>
      <div className="bg-bg font-Roboto">
        <Header />

        {/* <Tabs defaultActiveKey="Автобус" centered tabBarGutter={160}>
            {NavData.generalList.map(z => (
              <TabPane
                tab={
                  <span>
                    <img className="w-8 h-8" src={z.icon} />
                    {z.text}
                  </span>
                }
                key={z.text}
              />
            ))}
          </Tabs> */}
        <Search navbarData={NavData} type={TYPE} />
        <TravelCard />
        <ServicesCard />
        <Tips />
        <Layout navbarData={NavData} />
        <App />
        <Footer navbarData={NavData} />
      </div>
    </div>
  );
}
export const getStaticProps = async () => {
  const res = NavData;
  // const gridList = GridList;
  // const commentList = CommentList;

  return {
    props: {
      NavData: res,
      // GridList: gridList,
      // CommentList: commentList,
    },
  };
};
export default Travel;
