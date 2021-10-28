import React, { FC } from 'react';
import { Carousel } from 'antd';
import ContentWrapper from './style';
interface Props {
  data?: any;
}

const ServicesCard: FC<Props> = ({ data }) => {
  return (
    <div className="default-container">
      <h1
        className="font-bold text-2xl max-w-7xl mx-auto mt-6 px-6"
        style={{ color: '#0A3761' }}
      >
        Таны аялалд зориулав
      </h1>
      <div className="px-2">
        <div className="grid grid-cols-3 gap-3 my-6 md:grid-cols-5 md:gap-4 lg:grid-cols-7 max-w-7xl mx-auto md:my-6">
          <div className="bg-white h-auto shadow-2xl p-3">
            <div className="bg-gray-400 h-48"></div>
            <p className="text-center text-sm font-bold">
              24/7 онлайн үйлчилгээ
            </p>
          </div>
          <div className="bg-white h-auto shadow-2xl p-3">
            <div className="bg-gray-400 h-48"></div>
            <p className="mt-1 text-center text-sm font-bold">
              24/7 онлайн үйлчилгээ
            </p>
          </div>
          <div className="bg-white h-auto shadow-2xl p-3">
            <div className="bg-gray-400 h-48"></div>
            <p className="mt-1 text-center text-sm font-bold">
              24/7 онлайн үйлчилгээ
            </p>
          </div>
          <div className="bg-white h-auto shadow-2xl p-3">
            <div className="bg-gray-400 h-48"></div>
            <p className="mt-1 text-center text-sm font-bold">
              24/7 онлайн үйлчилгээ
            </p>
          </div>
          <div className="bg-white h-auto shadow-2xl p-3">
            <div className="bg-gray-400 h-48"></div>
            <p className="mt-1 text-center text-sm font-bold">
              24/7 онлайн үйлчилгээ
            </p>
          </div>
          <div className="bg-white h-auto shadow-2xl p-3">
            <div className="bg-gray-400 h-48"></div>
            <p className="mt-1 text-center text-sm font-bold">
              24/7 онлайн үйлчилгээ
            </p>
          </div>
          <div className="bg-white h-auto shadow-2xl p-3">
            <div className="bg-gray-400 h-48"></div>
            <p className="mt-1 text-center text-sm font-bold">
              24/7 онлайн үйлчилгээ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
