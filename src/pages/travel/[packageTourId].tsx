import Layout from '@components/common/Layout';
import React from 'react';
import NavData from '@data/navData.json';
import Navbar from '@components/common/Navbar';
import { Carousel } from 'antd';
const breadcrumbRoutes = [
  {
    path: '/',
    breadcrumbName: 'Home',
  },
  {
    breadcrumbName: '',
  },
];

export default function packageDetail({ NavData }) {
  return (
    <Layout>
      <Navbar navbarData={NavData} fixed={true} />
      <div className="bg-bg font-Roboto mt-20">
        <div className="default-container pt-1">
          <div>
            <h1
              className="font-bold text-2xl max-w-7xl mx-auto mt-6 px-6 mb-4"
              style={{ color: '#0A3761' }}
            >
              Пукет аялал
            </h1>
            <Carousel className={`md:px-2 rounded-lg`} arrows dots>
              <img
                className="carouselImage object-cover h-80 w-full rounded-lg"
                src={'/assets/package_sample.png'}
              />
              <img
                className="carouselImage object-cover h-80 w-full rounded-lg"
                src="/assets/Travel1.png"
              />
            </Carousel>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 space-y-5">
            <div className="px-2">
              <h2>4 өдөр 3 шөнө</h2>
              <h2>4 өдөр 3 шөнө</h2>
              <h2>4 өдөр 3 шөнө</h2>
              <h2>4 өдөр 3 шөнө</h2>
            </div>
            <div className="px-2">
              <h2>how many tickets</h2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
}
export const getServerSideProps = async ({ params }) => {
  console.log(params);
  const res = NavData;
  //   const tapaServiceList = TapaServiceList;
  return {
    props: {
      NavData: res,
      //   tapaServiceList: tapaServiceList,
    },
  };
};
