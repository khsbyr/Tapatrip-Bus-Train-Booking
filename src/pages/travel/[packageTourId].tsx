import StaticNavbar from '@components/Travel/StaticNavbar';
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
import { postRequest } from '@services/travel/travelServices';
import { Carousel, message, Timeline } from 'antd';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
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
  // const [PackTour, setPackTour] = useState({
  //   id: 0,
  //   totalPrice: 0,
  //   trip_code: 0,
  //   title: '',
  //   package_tour_dates: [],
  //   package_tour_images: [],
  //   trip_transport_name: '',
  //   duration_days: 0,
  //   total_stocks: 0,
  //   package_tour_packages: [],
  //   package_tour_days: [],
  //   description: '',
  //   duration_nights: 0,
  //   package_tour_additionals: {
  //     Highlight: [],
  //     Include: [],
  //     GoodToKnow: [],
  //     NotInclude: [],
  //   },
  //   cancelation_policy: '',
  //   visa_requirement: '',
  // });
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
  useEffect(() => {
    collectedPrices(collectedPackages);
  }, [collectedPrices]);

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
          cancelation_policy: '',
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
      <StaticNavbar navbarData={NavData} />
      <div className="default-container bg-bg font-Roboto px-6">
        <div className="w-full">
          <h1 className="font-bold text-xl mt-6 px-6 mb-4">{PackTour.title}</h1>
          <Carousel className={`rounded-lg w-full`} arrows dots>
            {PackTour.package_tour_images.map((img, index) => (
              <img
                className="carouselImage object-cover h-80 w-full rounded-lg"
                src={`${img.image}`}
                key={index}
              />
            ))}
          </Carousel>
        </div>
        <div className="my-4 grid grid-cols-1 sm:grid-cols-3">
          <div className="mr-2 col-span-2 grid grid-cols-2">
            <div className="bg-white rounded-lg col-span-2 p-8">
              <div className="grid grid-cols-1 items-center sm:grid-cols-3">
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
                  <h2 className="font-bold">{PackTour.trip_transport_name}</h2>
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

              {'   '}

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
                    {PackTour.package_tour_days &&
                      PackTour.package_tour_days.map((tourDay, index) => (
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
            <div className="gap-1 my-4 col-span-2 grid grid-cols-1 sm:grid-cols-2 bg-white rounded-lg p-1">
              <div className="m-4">
                <h2 className="font-bold ml-2 mt-1 text-lg">
                  {/* {PackTour.package_tour_additionals.Highlight[0].type_name} */}
                  Онцлох
                </h2>
                {PackTour.package_tour_additionals.Highlight &&
                  PackTour.package_tour_additionals.Highlight.map(
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
                  {/* {PackTour.package_tour_additionals.Include[0].type_name} */}
                  Аялалд багтсан
                </h2>
                {PackTour.package_tour_additionals.Include &&
                  PackTour.package_tour_additionals.Include.map(
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
                  {/* {PackTour.package_tour_additionals.NotInclude[0].type_name} */}
                  Аялалд багтаагүй
                </h2>
                {PackTour.package_tour_additionals.NotInclude &&
                  PackTour.package_tour_additionals.NotInclude.map(
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
                  {/* {PackTour.package_tour_additionals.GoodToKnow[0].type_name} */}
                  Мэдвэл зохих
                </h2>
                {PackTour.package_tour_additionals.GoodToKnow &&
                  PackTour.package_tour_additionals.GoodToKnow.map(
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
          <div className="">
            <div className="bg-white rounded-lg mb-4 py-2 px-4 ">
              <h1 className="font-bold text-2xl">Багц сонгох</h1>
              {PackTour.package_tour_packages &&
                PackTour.package_tour_packages.map((subPackages, index) => (
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
