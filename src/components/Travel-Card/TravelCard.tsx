import React, { FC } from 'react';
import { Carousel } from 'antd';
import ContentWrapper from './style';
interface Props {
  data?: any;
}

const TravelCard: FC<Props> = ({ data }) => {
  return (
    <div className="default-container">
      <h1
        className="font-bold text-2xl max-w-7xl mx-auto mt-6 px-6"
        style={{ color: '#0A3761' }}
      >
        Багц аялал
      </h1>
      <div className="px-2">
        <div className="grid grid-cols-1 gap-3 my-6 md:grid-cols-2 md:gap-8 lg:grid-cols-2 max-w-7xl mx-auto md:my-6">
          <div className="bg-white h-auto rounded-2xl shadow-xl">
            <img
              className="object-contain md:object-scale-down rounded-t-2xl"
              src={`assets/Travel1.png`}
            />
            <div className="items-center grid grid-cols-2 md:block divide-y divide-gray-300">
              <h2 className="text-left font-bold text-md md:text-md m-3 text-lg">
                Багц-1
              </h2>
              <div className="m-3 justify-between flex">
                <div>
                  <span className="text-gray-400 text-sm">Хугацаа</span>
                  <p className="font-bold text-sm">7 өдөр 6 шөнө</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Эхлэх үнэ</span>
                  <p className="font-bold text-sm">600000₮</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white h-auto rounded-2xl shadow-xl">
            <img
              className="object-contain md:object-scale-down rounded-t-2xl"
              src={`assets/Travel1.png`}
            />
            <div className="items-center grid grid-cols-2 md:block divide-y divide-gray-300">
              <h2 className="text-left font-bold m-3 text-lg">Багц-2</h2>
              <div className="m-3 justify-between flex">
                <div>
                  <span className="text-gray-400 text-sm">Хугацаа</span>
                  <p className="font-bold text-sm">7 өдөр 6 шөнө</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Эхлэх үнэ</span>
                  <p className="font-bold text-sm">600000₮</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
