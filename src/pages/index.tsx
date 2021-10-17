import Head from 'next/head';
import React from 'react';
import NavData from '@data/navData.json';
import GridList from '@data/gridList.json';
import CommentList from '@data/commentList.json';
import Layout from '@components/Layout/Layout';
import Search from '@components/Search/Search';
import Grid from '@components/Grid/Grid';
import Application from '@components/Application/Application';
import Comments from '@components/Comments/Comments';
import Email from '@components/Email/Email';

export const getStaticProps = async () => {
  const res = NavData;
  const gridList = GridList;
  const commentList = CommentList;
  return {
    props: {
      NavData: res,
      GridList: gridList,
      CommentList: commentList,
    },
  };
};

export default function Home({ NavData }) {
  return (
    <div>
      <Head>
        <title>Tapatrip - Online Travel Platform</title>
      </Head>

      <div className="bg-bg font-Roboto ">
        <Layout navbarData={NavData} />
        <Search navbarData={NavData} />
        <Grid GridList={GridList} />
        <Application />
        <Comments CommentList={CommentList} />
        <Email />
      </div>
    </div>
  );
}
