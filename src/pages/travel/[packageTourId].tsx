import Layout from '@components/common/Layout';
import Navbar from '@components/common/Navbar';
import DaysDetail from '@components/Travel/Travel-Card/DaysDetail';
import PackageList from '@components/Travel/Travel-Card/PackageList';
import NavData from '@data/navData.json';
import { MapIcon } from '@heroicons/react/solid';
import { postRequest } from '@lib/api';
import { Carousel, Timeline } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
const breadcrumbRoutes = [
  {
    path: '/',
    breadcrumbName: 'Home',
  },
  {
    breadcrumbName: '',
  },
];

export default function packageDetail({ NavData, PackTour }) {
  const { t } = useTranslation();
  const [totalPrice, setTotalPrice] = useState(0);
  const [collectedPackages, setCollectedPackages] = useState([]);
  const [subPack, setSubPack] = useState('');
  let urlStr = '';

  const collectedPrices = subPrices => {
    let totPrice = 0;

    setCollectedPackages(subPrices);

    collectedPackages.forEach(ele => {
      urlStr =
        urlStr +
        `${ele.packageCode}a${ele.subPackageId}a${
          ele.name === 'Том хүн' ? 'D' : 'C'
        }a${ele.id}n`;
      setSubPack(urlStr);
      totPrice = totPrice + ele.price;
    });
    setTotalPrice(totPrice);
  };

  return (
    <Layout>
      <Navbar navbarData={NavData} />
      <div className="bg-bg font-Roboto mt-20">
        <div className="default-container pt-1">
          <div>
            <h1 className="font-bold text-2xl max-w-7xl mx-auto mt-6 px-6 mb-4">
              {PackTour.title}
            </h1>
            <Carousel className={`md:px-2 rounded-lg`} arrows dots>
              {PackTour.package_tour_images.map((img, index) => (
                <img
                  className="carouselImage object-cover h-80 w-full rounded-lg"
                  src={`${img.image}`}
                  key={index}
                />
              ))}
            </Carousel>
          </div>
          <div className="md:col-span-2 grid grid-cols-3 gap-2 my-4">
            <div className="mr-2 col-span-2 grid grid-cols-2 ">
              <div className="bg-white rounded-lg col-span-2 p-8">
                <div className="grid grid-cols-2 items-center px-16">
                  <div className="col-span-1 py-2 inline-flex">
                    <img className="mr-4 h-6" src="/assets/24-hours.png" />
                    <h2 className="font-bold">{`${PackTour.duration_days} өдөр ${PackTour.duration_nights} шөнө`}</h2>
                  </div>
                  <div className="col-span-1 py-2 inline-flex">
                    <img className="mr-4 h-6" src="/assets/24-hours.png" />
                    <h2 className="font-bold">{PackTour.total_stocks}</h2>
                  </div>
                  <div className="col-span-1 py-2 inline-flex">
                    <img className="mr-4 h-6" src="/assets/24-hours.png" />
                    {/* <h2 className="font-bold">4 {t('day')} 3 шөнө</h2> */}
                    <h2 className="font-bold">
                      {PackTour.trip_transport_name}
                    </h2>
                  </div>
                  <div className="col-span-1 py-2 grid">
                    <div className="inline-flex">
                      <img className="mr-4 h-6" src="/assets/24-hours.png" />
                      <h2 className="font-bold">Can be canceled</h2>
                    </div>
                    <h2 className="ml-10 mt-0.5">Cancellation Policy</h2>
                  </div>
                  <div className="col-span-1 py-2 grid">
                    <div className="inline-flex">
                      <img className="mr-4 h-6" src="/assets/24-hours.png" />
                      <h2 className="font-bold">Visa required'</h2>
                    </div>
                    <h2 className="ml-10 mt-0.5">Visa information</h2>
                  </div>
                </div>
                <div className="my-8 col-span-2">
                  <h2 className="font-bold text-lg">Travel information</h2>
                  <div className="my-2">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: PackTour.description,
                      }}
                    />
                  </div>
                </div>
                <div className="my-4 col-span-2">
                  <div className="inline-flex mb-4">
                    {/* <img className="mr-2 h-8" src="/assets/24-hours.png" />
                     */}
                    <MapIcon className="-ml-2 h-8 opacity-20" />
                    <h2 className="font-bold ml-2 mt-1 text-lg">
                      Аялалын хөтөлбөр
                    </h2>
                  </div>
                  <div className="my-4">
                    <Timeline>
                      {PackTour.package_tour_days.map((tourDay, index) => (
                        <DaysDetail
                          key={index}
                          isLast={
                            PackTour.package_tour_days.length - 1 === index
                              ? true
                              : false
                          }
                          title={tourDay.title}
                          image={tourDay.image}
                          description={tourDay.description}
                        />
                      ))}
                    </Timeline>
                  </div>
                </div>
              </div>
              <div className="gap-2 my-4 col-span-2 grid grid-cols-3 px-8 bg-white rounded-lg p-2">
                {PackTour.package_tour_additional.map((additional, index) => (
                  <div className="m-4 items-center">
                    <div key={index}>
                      <h2 className="font-bold ml-4 list-disc">
                        {additional.title}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative col-span-1 grid grid-cols-1">
              <div className=" col-span-1 w-98">
                <div className="bg-white rounded-lg mb-4 py-2 px-4 ">
                  <h1 className="font-bold text-2xl">Багц сонгох</h1>
                  {PackTour.package_tour_packages.map((subPackages, index) => (
                    <PackageList
                      key={index}
                      subPackageId={subPackages.id}
                      title={subPackages.title}
                      hotel_name={subPackages.hotel_name}
                      stocks={subPackages.stocks}
                      hotel_image={subPackages.hotel_image}
                      package_prices={subPackages.package_tour_package_prices}
                      package_code={subPackages.package_code}
                      collectPrices={collectedPrices}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 my-6">
                  <div className="col-span-1">
                    <p className="font-bold text-lg">Total:</p>
                  </div>
                  <div className="col-span-1 ">
                    <h1 className="font-bold text-right text-lg">
                      {`${totalPrice} ₮`}
                    </h1>
                  </div>
                </div>
                <Link
                  href={{
                    pathname: `[packageTourId]/register`,
                    query: {
                      packageTourId: PackTour.id,
                      totalPrice: totalPrice,
                      tripCode: PackTour.trip_code,
                      tourName: PackTour.title,
                      subPack,
                    },
                  }}
                >
                  <button className="col-span-1 w-full bg-button text-white font-bold py-2 px-4 rounded-lg">
                    Бүртгэх
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getServerSideProps = async ({ params }) => {
  const data = await postRequest('/activity/package_tour_view/', {
    id: params.packageTourId,
  });
  const res = NavData;
  return {
    props: {
      NavData: res,
      PackTour: data.result,
    },
  };
};
