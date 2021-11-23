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
                <img
                  className="object-contain md:object-scale-down rounded-t-2xl"
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${tourpackage.image}`}
                />
                <div className="items-center grid grid-cols-2 md:block divide-y divide-gray-300">
                  <div className="flex justify-between">
                    <h2 className="text-left font-bold text-md md:text-md m-3 text-lg ">
                      {tourpackage.title}
                    </h2>
                    <h2>{!tourpackage.is_sell ? 'out of stock' : ''}</h2>
                  </div>
                  <div className="m-3 justify-between flex">
                    <div>
                      <span className="text-gray-400 text-sm">Хугацаа</span>
                      <p className="font-bold text-sm">{`${tourpackage.duration_days} өдөр, ${tourpackage.duration_nights} Шөнө`}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Эхлэх үнэ</span>
                      <p className="font-bold text-sm">
                        <CurrencyFormat
                          value={tourpackage.start_price}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix={` ₮`}
                        />
                      </p>
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
