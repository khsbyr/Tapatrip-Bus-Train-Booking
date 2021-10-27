import Head from 'next/head';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { BUS_ALL_LOCATIONS_QUERY } from '@graphql/queries';
import NavData from '@data/navData.json';
import TapaServiceList from '@data/tapaServiceList.json';
import Layout from '@components/common/Layout';
import Search from '@components/bus/Search/Search';
import Navbar from '@components/common/Navbar/Navbar';
import TapaService from '@components/common/TapaService';
import Subscribe from '@components/common/Subscribe';

export default function Bus({ NavData, tapaServiceList }) {
  // const { data, loading, error } = useQuery(BUS_ALL_LOCATIONS_QUERY);
  // console.log(error);
  return (
    <Layout>
      <div className="hidden  md:block ">
        <img
          src="assets/Header.png"
          alt="Logo"
          className="h-96 object-cover mx-auto"
        />
        <div className="hidden md:block md:mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-60">
          <h1 className=" text-white text-4xl font-bold">Аяллын цогц шийдэл</h1>
          <p className=" text-white  font-light mt-2">
            Тийз захиалгын онлайн платформ
          </p>
        </div>
      </div>
      <Navbar navbarData={NavData} />
      <Search navbarData={NavData} />
      <Subscribe />
      <TapaService tapaServiceList={tapaServiceList} />
    </Layout>
    // {/* <Layout navbarData={NavData} /> */}
  );
}

export const getStaticProps = async () => {
  const res = NavData;
  const tapaServiceList = TapaServiceList;
  return {
    props: {
      NavData: res,
      tapaServiceList: tapaServiceList,
    },
  };
};
