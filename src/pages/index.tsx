import Head from 'next/head';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
//import { BUS_ALL_LOCATIONS_QUERY } from '@graphql/queries';
import NavData from '@data/navData.json';
import GridList from '@data/gridList.json';
import CommentList from '@data/commentList.json';
import Layout from '@components/Layout/Layout';
import Search from '@components/Search/Search';
import Grid from '@components/Grid/Grid';
import Application from '@components/Application/Application';
import Comments from '@components/Comments/Comments';
import Email from '@components/Email/Email';
import Footer from '@components/Footer/Footer';
import App from '@components/App/App';

// export const getStaticProps = async () => {
//   const res = NavData;
//   const gridList = GridList;
//   const commentList = CommentList;
//   console.log('aaa');
//   return {
//     props: {
//       NavData: res,
//       GridList: gridList,
//       CommentList: commentList,
//     },
//   };
// };

const BUS_ALL_LOCATIONS_QUERY = gql`
  {
    busAllLocations(region: "1") {
      edges {
        node {
          name
          id
          regionName
          region
          type
          typeName
          picture
        }
      }
    }
  }
`;

export default function Home({ NavData, GridList, CommentList }) {
  const { data, loading, error } = useQuery(BUS_ALL_LOCATIONS_QUERY);
  console.log(error);
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
        <Layout navbarData={NavData} />
        <Search navbarData={NavData} />
        <App />
        <Grid GridList={GridList} />
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
  console.log('asadasdadsaaa');
  return {
    props: {
      NavData: res,
      GridList: gridList,
      CommentList: commentList,
    },
  };
};
