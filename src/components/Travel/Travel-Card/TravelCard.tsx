import React, { FC } from 'react';
import { Carousel } from 'antd';
import ContentWrapper from './style';
import Link from 'next/link';
import CurrencyFormat from 'react-currency-format';
interface Props {
  packages?: any;
  title: string;
  ClickHandler: () => void;
}
const TravelCard: FC<Props> = ({ packages, title, ClickHandler }) => {
  return (
    <div className="default-container">
      <h1
        className="font-bold text-2xl max-w-7xl mx-auto mt-6 px-6"
        style={{ color: '#0A3761' }}
      >
        {title}
      </h1>
      <div className="px-2">
        <div className="grid grid-cols-1 gap-3 my-6 md:grid-cols-2 md:gap-8 lg:grid-cols-2 max-w-7xl mx-auto md:my-6">
          {packages.map((tourpackage, index) => (
            <Link
              href="/travel/[packageTourId]"
              as={`travel/${tourpackage.id}`}
              key={index}
            >
              <div
                onClick={ClickHandler}
                className="hover:shadow-2xl cursor-pointer bg-white h-auto rounded-2xl shadow-xl"
              >
                <div className="w-full h-60 xs:h-96 sm:h-80 md:h-96">
                  <img
                    className="w-full h-full object-cover rounded-t-2xl"
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${tourpackage.image}`}
                  />
                </div>
                <div className="items-center">
                  <h2 className="text-left font-bold text-md md:text-md m-3 text-lg ">
                    {tourpackage.title}
                  </h2>
                  <div className="pl-4 pb-5">
                    <div className="flex">
                      <div className="text-gray-600 text-base w-1/3">
                        Хугацаа:
                      </div>
                      <div className="font-bold text-base">{`${tourpackage.duration_days} өдөр, ${tourpackage.duration_nights} Шөнө`}</div>
                    </div>
                    <div className="flex">
                      <div className="text-gray-600 text-base w-1/3">
                        Эхлэх үнэ:
                      </div>
                      <div className="font-bold text-base">
                        <CurrencyFormat
                          value={tourpackage.start_price}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix={` ₮`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
