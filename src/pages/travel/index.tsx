import React from 'react';
import Head from 'next/head';
import NavData from '@data/navData.json';
// import Layout from '@components/Layout/Layout';
import Header from '@components/Header/Header';
// import App from '@components/App/App';
import App from '@components/common/Subscribe';
import ContentWrapper from '@components/Search/style';
// import style from '@components/Search/Search.module.scss';
import { Tabs, Image, Carousel } from 'antd';
import Search from '@components/Search/Search';
import TravelCard from '@components/Travel-Card/TravelCard';
import ServicesCard from '@components/Travel-Card/ServicesCard';
import Footer from '@components/common/Footer';
import Tips from '@components/Travel-Card/Tips';
import Navbar from '@components/common/Navbar';

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
        <Navbar navbarData={NavData} />
        <Search navbarData={NavData} type={TYPE} />
        <TravelCard />
        <ServicesCard />
        <Tips />
        {/* <Layout navbarData={NavData} /> */}
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
