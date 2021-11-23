import SeatNav from '@components/bus/SeatNavbar';
import Layout from '@components/common/Layout';
import DaysDetail from '@components/Travel/Travel-Card/DaysDetail';
import PackageList from '@components/Travel/Travel-Card/PackageList';
import NavData from '@data/navData.json';
import {
  CalendarIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  MapIcon,
  OfficeBuildingIcon,
  PaperAirplaneIcon,
  UserIcon,
} from '@heroicons/react/solid';
import { postRequest } from '@lib/api';
import { Carousel, message, Timeline } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import TravelTipsModal from '@components/Travel/TravelTipsModal';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [collectedPackages, setCollectedPackages] = useState([]);
  const [subPack, setSubPack] = useState('');
  const [visible, setVisible] = useState(false);
  const [visibleVisa, setVisibleVisa] = useState(false);
  const [loading, setloading] = useState(false);
  let urlStr = '';
  const router = useRouter();
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
  const toRegister = () => {
    if (subPack.length <= 0) {
      message.warning('Багц сонгоно уу!');
    } else {
      setloading(true);
      router.push({
        pathname: `[packageTourId]/register`,
        query: {
          packageTourId: PackTour.id,
          totalPrice: totalPrice,
          tripCode: PackTour.trip_code,
          tourName: PackTour.title,
          subPack,
          tourDate: PackTour.package_tour_dates[0].date,
        },
      });
    }
  };

  const showModal = str => {
    if (str === 'visa') {
      setVisibleVisa(true);
    } else {
      setVisible(true);
    }
  };
  const closeModal = () => {
    setVisible(false);
    setVisibleVisa(false);
  };
  return (
    <Layout>
      <SeatNav navbarData={NavData} />
      <div className="bg-bg font-Roboto mt-2">
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
                    <CalendarIcon className="mr-4 h-6" />
                    <h2 className="font-bold">{`${PackTour.duration_days} өдөр ${PackTour.duration_nights} шөнө`}</h2>
                  </div>
                  <div className="col-span-1 py-2 inline-flex">
                    <UserIcon className="mr-4 h-6" />
                    <h2 className="font-bold">{`${PackTour.total_stocks} захиалах`}</h2>
                  </div>
                  <div className="col-span-1 py-2 inline-flex">
                    <PaperAirplaneIcon className="mr-4 h-6" />
                    <h2 className="font-bold">
                      {PackTour.trip_transport_name}
                    </h2>
                  </div>
                  <div className="col-span-1 py-2 inline-flex">
                    <OfficeBuildingIcon className="mr-4 h-6" />
                    <h2 className="font-bold">
                      {PackTour.package_tour_packages[0].hotel_name}
                    </h2>
                  </div>
                  <div className="col-span-1 py-2 grid">
                    <div className="inline-flex">
                      <InformationCircleIcon className="mr-4 h-6" />
                      <h2 className="font-bold">Can be canceled</h2>
                    </div>
                    <h2
                      className="ml-10 mt-0.5 cursor-pointer hover:scale-105"
                      onClick={() => showModal('cancel')}
                    >
                      Cancellation Policy
                    </h2>
                  </div>
                  <div className="col-span-1 py-2 grid">
                    <div className="inline-flex">
                      <DocumentTextIcon className="mr-4 h-6" />
                      <h2 className="font-bold">Visa required</h2>
                    </div>
                    <h2
                      className="ml-10 mt-0.5 cursor-pointer hover:scale-105"
                      onClick={() => showModal('visa')}
                    >
                      Visa information
                    </h2>
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
              <div className="gap-2 my-4 col-span-2 grid grid-cols-4 px-8 bg-white rounded-lg p-2">
                <div className="m-4">
                  <h2 className="font-bold ml-2 mt-1 text-lg">
                    {PackTour.package_tour_additionals.Highlight[0].type_name}
                  </h2>
                  {PackTour.package_tour_additionals.Highlight.map(
                    (additional, index) => (
                      <div className="m-2">
                        <ul key={index}>
                          <li className="ml-2 list-disc">{additional.name}</li>
                        </ul>
                      </div>
                    )
                  )}
                </div>
                <div className="m-4">
                  <h2 className="font-bold ml-2 mt-1 text-lg">
                    {PackTour.package_tour_additionals.Include[0].type_name}
                  </h2>
                  {PackTour.package_tour_additionals.Include.map(
                    (additional, index) => (
                      <div className="m-2">
                        <ul key={index}>
                          <li className="ml-2 list-disc">{additional.name}</li>
                        </ul>
                      </div>
                    )
                  )}
                </div>
                <div className="m-4">
                  <h2 className="font-bold ml-2 mt-1 text-lg">
                    {PackTour.package_tour_additionals.NotInclude[0].type_name}
                  </h2>
                  {PackTour.package_tour_additionals.NotInclude.map(
                    (additional, index) => (
                      <div className="m-2">
                        <ul key={index}>
                          <li className="ml-2 list-disc">{additional.name}</li>
                        </ul>
                      </div>
                    )
                  )}
                </div>
                <div className="m-4">
                  <h2 className="font-bold ml-2 mt-1 text-lg">
                    {PackTour.package_tour_additionals.GoodToKnow[0].type_name}
                  </h2>
                  {PackTour.package_tour_additionals.GoodToKnow.map(
                    (additional, index) => (
                      <div className="m-2">
                        <ul key={index}>
                          <li className="ml-2 list-disc">{additional.name}</li>
                        </ul>
                      </div>
                    )
                  )}
                </div>
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
                <button
                  className="col-span-1 w-full bg-button text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => toRegister()}
                  disabled={loading ? true : false}
                >
                  {loading ? <Spin indicator={antIcon} /> : 'Худалдаж авах'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {visible && (
        <TravelTipsModal
          title={'Цуглах нөхцөл'}
          description={PackTour.cancelation_policy}
          image={null}
          isModalVisible={visible}
          close={closeModal}
        />
      )}
      {visibleVisa && (
        <TravelTipsModal
          title={'Виза мэдээлэл'}
          description={PackTour.visa_requirement}
          image={null}
          isModalVisible={visibleVisa}
          close={closeModal}
        />
      )}
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
