import Head from 'next/head';
import React from 'react';
import { useQuery } from '@apollo/client';
import { BUS_ALL_LOCATIONS_QUERY } from '@graphql/queries';
import NavData from '@data/navData.json';
import GridList from '@data/gridList.json';
import CommentList from '@data/commentList.json';
import Layout from '@components/common/Layout';
import Search from '@components/bus/Search';
import Grid from '@components/common/TapaService';
import Application from '@components/common/Application/Application';
import Comments from '@components/common/Comments/Comments';
import Email from '@components/common/Email/Email';
import Footer from '@components/common/Footer';
import App from '@components/common/Subscribe';
import AuthService from '@services/auth';
import cookie from 'js-cookie';
import AuthTokenStorageService from '@services/AuthTokenStorageService';

export default function Home({ NavData, GridList, CommentList, guestToken }) {
  const { data, loading, error } = useQuery(BUS_ALL_LOCATIONS_QUERY);
  console.log(data);
  AuthTokenStorageService.guestStore(guestToken);

  return (
    <div>
      <Head>
        <title>Tapatrip - Online Travel Platform</title>
      </Head>
      <div className="bg-bg font-Roboto">
        <div className="hidden  md:block ">
          <img
            src="../assets/Header.png"
            alt="Logo"
            className="h-96 object-cover mx-auto"
          />
          <div className="hidden md:block md:mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-60">
            <h1 className=" text-white text-4xl font-bold">
              Аяллын цогц шийдэл
            </h1>
            <p className=" text-white  font-light mt-2">
              Тийз захиалгын онлайн платформ
            </p>
          </div>
        </div>
        <Search navbarData={NavData} />
        <App />
        <Application />
        <Comments CommentList={CommentList} />
        <Email />
        <Footer navbarData={NavData} />
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = NavData;
  const gridList = GridList;
  const commentList = CommentList;
  const guestToken = await AuthService.guestToken();

  return {
    props: {
      NavData: res,
      GridList: gridList,
      CommentList: commentList,
      guestToken: guestToken,
    },
  };
};
